import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "../../../_libs/supabaseclient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupcode = searchParams.get("groupcode");
  if (!groupcode) {
    return NextResponse.json({ error: "groupCode is missing" }, { status: 400})
  }
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("groupcode", groupcode)
      .order("groupname", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
};