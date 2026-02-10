import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const { username, password } = await request.json();
    const saltRounds = 10;
    if (!username || !password) {
      return NextResponse.json({
        error: "A username AND password are required",
        status: 400,
        username: username,
        password: password,
      });
    }
    const passwordHashed = await bcrypt.hash(password, saltRounds);
    const { error } = await supabase.from("account").insert({
      username: username,
      passwordHashed: passwordHashed,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500});
    }
    NextResponse.json({ success: true });

};