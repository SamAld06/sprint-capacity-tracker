import { NextResponse } from "next/server";
import { supabase } from "../_libs/supabaseclient";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const creator = 'samgaldred@gmail.com'
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("creator", creator)
      .order("groupname", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
};

export async function POST(request: Request) {
  const saltRounds = 10
    const {
      groupname,
      creator,
      password
    } = await request.json();
    if (!groupname || !creator || !password) {
      return NextResponse.json({ error: "groupname / creator / password are missing" }, { status: 400})
    }
    const grouphashedpassword = await bcrypt.hash(password, saltRounds);
    const { error } = await supabase.from("groups").insert({
      groupname,
      creator,
      grouphashedpassword
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }