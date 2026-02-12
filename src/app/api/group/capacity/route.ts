import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupcode = searchParams.get("groupcode");
    const { data, error } = await supabase
      .from("capacity")
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
      workingdays,
      outofoffice,
      releases,
      fridayProjects,
      maintenance,
      md,
    } = await request.json();
    if (!groupcode || !sprintid || !name) {
      return NextResponse.json({ error: "groupCode / sprintId / name are missing" }, { status: 400})
    }
    const { error } = await supabase.from("capacity").update({
      workingDays: workingdays,
      outOfOffice: outofoffice,
      releases: releases,
      fridayProjects: fridayProjects,
      maintenance: maintenance,
      md: md,
    })
    .eq("groupcode", groupcode)
    .eq("sprintid", sprintid)
    .eq("name", name)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }