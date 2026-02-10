import { NextResponse } from "next/server";
import { supabase } from "./_libs/supabaseclient";

export async function GET(request: Request) {
    const [sprint, workProgress, capacity, groupMember, account] =
      await Promise.all([
        supabase.from("sprint").select("*"),
        supabase.from("workprogress").select("*"),
        supabase.from("capacity").select("*"),
        supabase.from("groupmember").select("*"),
        supabase.from("account").select("*"),
      ]);

    const errors = [
      sprint.error,
      workProgress.error,
      capacity.error,
      groupMember.error,
      account.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      return new Response(JSON.stringify(errors), {
        status: 500,
      })
    }

    return NextResponse.json({
      sprint: sprint.data,
      workProgress: workProgress.data,
      capacity: capacity.data,
      groupMember: groupMember.data,
      account: account.data,
    });

  }