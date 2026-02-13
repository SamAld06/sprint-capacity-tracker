import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function POST(request: Request) {
  const { password, groupcode } = await request.json();
  if (!groupcode || !password) {
    return NextResponse.json(
      { error: "groupcode / password is missing" },
      { status: 400 },
    );
  }

  const { data, error: fetchError } = await supabase
  .from("groups")
  .select("grouphashedpassword")
  .eq("groupcode", groupcode)
  .single();

  if (fetchError || !data) {
    return NextResponse.json(
        { error: "Group not found"},
        { status: 404}
    );
  }

  const storedHashedPassword = data?.grouphashedpassword
  const doPasswordsMatch = await bcrypt.compare(password, storedHashedPassword)

  if (!doPasswordsMatch) {
    return NextResponse.json(
        { error: "Current password is incorrect"},
        { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
