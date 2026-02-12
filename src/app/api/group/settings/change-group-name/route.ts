import { NextResponse } from "next/server";
import { supabase } from "../../../_libs/supabaseclient";

export async function PATCH(request: Request) {
  const { name, groupcode, userEmail } = await request.json();
  if (!groupcode || !name || !userEmail) {
    return NextResponse.json(
      { error: "groupcode / new name / user email is missing" },
      { status: 400 },
    );
  }
  const { error } = await supabase
    .from("groups")
    .update({
      groupname: name,
    })
    .eq("groupcode", groupcode)
    .eq("creator", userEmail);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
