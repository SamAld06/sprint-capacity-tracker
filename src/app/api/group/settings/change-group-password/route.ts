import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { supabase } from "../../../_libs/supabaseclient";

export async function PATCH(request: Request) {
    const saltRounds = 10
  const { currentPassword, groupcode, userEmail, newPassword } = await request.json();
  if (!groupcode || !currentPassword|| !userEmail || !newPassword) {
    return NextResponse.json(
      { error: "groupcode / new name / user email is missing" },
      { status: 400 },
    );
  }

  const { data, error: fetchError } = await supabase
  .from("groups")
  .select("grouphashedpassword")
  .eq("groupcode", groupcode)
  .eq("creator", userEmail)
  .single();

  if (fetchError || !data) {
    return NextResponse.json(
        { error: "Group not found"},
        { status: 404}
    );
  }

  const storedHashedPassword = data?.grouphashedpassword
  const doPasswordsMatch = await bcrypt.compare(currentPassword, storedHashedPassword)

  if (!doPasswordsMatch) {
    return NextResponse.json(
        { error: "Current password is incorrect"},
        { status: 401 }
    );
  }
  const newPasswordHashed = await bcrypt.hash(newPassword, saltRounds);
  const { error } = await supabase
    .from("groups")
    .update({
      grouphashedpassword: newPasswordHashed,
    })
    .eq("groupcode", groupcode)
    .eq("creator", userEmail);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
