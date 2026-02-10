import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { account } from "../../../../types/account";

export async function POST(request: Request) {
    const { username, password } = await request.json();
    const JWT_SECRET = "thisisreallysecret";

    const { data, error } = await supabase
      .from<account>("account")
      .select("*")
      .eq("username", username);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Invalid login details" }, { status: 401 });
    }
    const user = data[0];
    const validatePassword = await bcrypt.compare(
      password,
      user.passwordHashed,
    );
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid login details" }, { status: 401 });
    }
    const webToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    NextResponse.json({ webToken });
};