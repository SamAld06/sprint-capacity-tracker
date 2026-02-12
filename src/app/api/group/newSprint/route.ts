import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function POST(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const groupcode = searchParams.get("groupcode");
  if (!groupcode) {
    return NextResponse.json(
      {
        error: "No group code could be found",
      },
      { status: 400 },
    );
  }

  const { data: latestSprint, error: sprintErr } = await supabase
    .from("sprint")
    .select("sprintid")
    .eq("groupcode", groupcode)
    .order("sprintid", { ascending: false })
    .limit(1)
    .single();

  if (sprintErr) {
    console.error(sprintErr)
    return NextResponse.json({ error: sprintErr.message }, { status: 500});
  }

  const nextSprintId = (latestSprint?.sprintid ?? 0) + 1;

  const { error: insertSprintErr } = await supabase.from("sprint").insert({
    groupcode,
    sprintid: nextSprintId,
    planned: 0,
    added: 0,
    removed: 0,
    totalcompleted: 0,
    totalmd: 0,
    plannedcompleteddifference: 0,
  });

  if (insertSprintErr) {
    return NextResponse.json({ error: insertSprintErr.message }, { status: 500});
  }
  const { data: members, error: membersErr } = await supabase
    .from("groupmember")
    .select("name")
    .eq("groupcode", groupcode);

  if (membersErr) {
    return NextResponse.json({ error: membersErr.message }, { status: 500});
  }

  if (!members || members.length === 0) {
    return NextResponse.json({
      error: "Could not find any users in group",
    }, { status: 400 });
  }

  const capacityRows = members.map((user) => ({
    groupcode,
    sprintid: nextSprintId,
    name: user.name,
    workingdays: 0,
    outofoffice: 0,
    releases: 0,
    fridayprojects: 0,
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
    groupcode,
    sprintid: nextSprintId,
    name: user.name,
    workassigned: 0,
    workcompleted: 0,
    averagepermd: 0,
  }));

  const { error: workProgressErr } = await supabase
    .from("workprogress")
    .insert(workProgressRows);

  if (workProgressErr) {
    return NextResponse.json({ error: workProgressErr.message }, { status: 500});
  }

  return NextResponse.json({
    success: true,
    sprintid: nextSprintId,
    capacityTableRowsCreated: capacityRows.length,
    workProgressTableRowsCreated: workProgressRows.length,
  });
}
