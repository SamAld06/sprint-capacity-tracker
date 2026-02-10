import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const groupcode = searchParams.get("groupcode");
  const groupcode = 't3stGr0up1';
    const { data, error } = await supabase
      .from("workprogress")
      .select("*")
      .eq("groupcode", groupcode)
      .order("groupcode", { ascending: true })
      .order("name", { ascending: true })
      .order("sprintid", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
};

export async function POST(request: Request) {
    const {
      groupcode,
      sprintid,
      name,
      workassigned,
      workcompleted,
      averagepermd,
    } = await request.json();
    if (!groupcode || !sprintid) {
      return NextResponse.json({ error: "groupCode / sprintId are missing" }, { status: 400})
    }
    const { error } = await supabase.from("workprogress").insert({
      groupcode,
      sprintid,
      name,
      workassigned: workassigned,
      workcompleted: workcompleted,
      averagepermd: averagepermd,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }