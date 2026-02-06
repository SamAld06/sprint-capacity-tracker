import { NextResponse } from "next/server";
import { supabase } from "../_libs/supabaseclient";

export async function GET(request: Request) {
    const { data, error } = await supabase.from("account").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500});
    }
    NextResponse.json(data);

};
