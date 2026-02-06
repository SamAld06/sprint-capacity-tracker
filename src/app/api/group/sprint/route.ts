import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const groupcode = searchParams.get("groupcode");
  const groupcode = 't3stGr0up1'
    const { data, error } = await supabase
      .from("sprint")
      .select("*")
      .eq("groupcode", groupcode)
      .order("groupcode", { ascending: true })
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
      planned,
      added,
      removed,
      totalcompleted,
      totalmd,
      plannedcompleteddifference,
    } = await request.json();
    if (!groupcode || !sprintid) {
      return NextResponse.json({ error: "groupCode / sprintId are missing" }, { status: 400})
    }
    const { error } = await supabase.from("sprint").insert({
      groupcode,
      sprintid,
      planned: planned,
      added: added,
      removed: removed,
      totalcompleted: totalcompleted,
      totalmd: totalmd,
      plannedcompleteddifference: plannedcompleteddifference,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }