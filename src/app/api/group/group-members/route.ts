import { NextResponse } from "next/server";
import { supabase } from "../../_libs/supabaseclient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupcode = searchParams.get("groupcode");

  if (!groupcode) {
    return NextResponse.json({ error: "No groupcode in req" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("groupmember")
    .select("*")
    .eq("groupcode", groupcode)
    .order("groupcode", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const { searchParams } = new URL(request.url);
  const groupcode = searchParams.get("groupcode");

  if (!groupcode) {
    return NextResponse.json({ error: "No groupcode in req" }, { status: 400 });
  }
  if (!groupcode || !name) {
    return NextResponse.json(
      { error: "groupcode and name are required" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("groupmember").insert({
    groupcode,
    name: name,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupcode = searchParams.get("groupcode");
  const { currentName, newName } = await request.json();

  if (!groupcode || !currentName || !newName) {
    return NextResponse.json(
      { error: "groupcode, currentName and newName are required" },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("groupmember")
    .update({
      name: newName,
    })
    .eq("groupcode", groupcode)
    .eq("name", currentName);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupcode = searchParams.get("groupcode");
  const { name } = await request.json();

  if (!groupcode || !name) {
    return NextResponse.json(
      { error: "groupcode / name are missing" },
      { status: 400 },
    );
  }
  const { error } = await supabase
    .from("groupmember")
    .delete()
    .eq("groupcode", groupcode)
    .eq("name", name);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
