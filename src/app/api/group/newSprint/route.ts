import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function POST(request: Request, response: Response) {
  const groupCode = "t3stGr0up1"; // retrieve group code

  if (!groupCode) {
    return NextResponse.json(
      {
        error: "No group code could be found",
      },
      { status: 400 },
    );
  }

  const { data: latestSprint, error: sprintErr } = await supabase
    .from("sprint")
    .select("sprintId")
    .eq("groupCode", groupCode)
    .order("sprintId", { ascending: false })
    .limit(1)
    .single();

  if (sprintErr) {
    return NextResponse.json({ error: sprintErr.message }, { status: 500});
  }

  const nextSprintId = (latestSprint?.sprintId ?? 0) + 1;

  const { error: insertSprintErr } = await supabase.from("sprint").insert({
    groupCode,
    sprintId: nextSprintId,
    planned: 0,
    added: 0,
    removed: 0,
    totalCompleted: 0,
    totalMd: 0,
    plannedCompletedDifference: 0,
  });

  if (insertSprintErr) {
    return NextResponse.json({ error: insertSprintErr.message }, { status: 500});
  }
  const { data: members, error: membersErr } = await supabase
    .from("groupMember")
    .select("name")
    .eq("groupCode", groupCode);

  if (membersErr) {
    return NextResponse.json({ error: membersErr.message }, { status: 500});
  }

  if (!members || members.length === 0) {
    return NextResponse.json({
      error: "Could not find any users in group",
    }, { status: 400 });
  }

  const capacityRows = members.map((user) => ({
    groupCode,
    sprintId: nextSprintId,
    name: user.name,
    workingDays: 0,
    outOfOffice: 0,
    releases: 0,
    fridayProjects: 0,
    maintenance: 0,
    md: 0,
  }));

  const { error: capacityErr } = await supabase
    .from("capacity")
    .insert(capacityRows);

  if (capacityErr) {
    return NextResponse.json({ error: capacityErr.message }, { status: 500});
  }

  const workProgressRows = members.map((user) => ({
    groupCode,
    sprintId: nextSprintId,
    name: user.name,
    workAssigned: 0,
    workCompleted: 0,
    averagePerMd: 0,
  }));

  const { error: workProgressErr } = await supabase
    .from("workProgress")
    .insert(workProgressRows);

  if (workProgressErr) {
    return NextResponse.json({ error: workProgressErr.message }, { status: 500});
  }

  return NextResponse.json({
    success: true,
    sprintId: nextSprintId,
    capacityTableRowsCreated: capacityRows.length,
    workProgressTableRowsCreated: workProgressRows.length,
  });
}
