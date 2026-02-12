import { NextResponse } from "next/server";
import { supabase } from "../_libs/supabaseclient";
import bcrypt from "bcrypt";
import { generateGroupCode } from "../../../helpers/generateGroupCode";


//gets all created groups for a user
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


//makes a new group
export async function POST(request: Request) {
  const saltRounds = 10
    const {
      groupname,
      creator,
      password
    } = await request.json();
    const groupcode = generateGroupCode()
    if (!groupname || !creator || !password || !groupcode) {
      return NextResponse.json({ error: "groupname / creator / password /groupcode are missing" }, { status: 400})
    }
    const grouphashedpassword = await bcrypt.hash(password, saltRounds);
    const { error } = await supabase.from("groups").insert({
      groupname,
      creator,
      grouphashedpassword,
      groupcode
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  }