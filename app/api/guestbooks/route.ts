import { createClient } from "@/lib/supabase/server";
import { Guestbook } from "@/types/guestbook";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from<"guestbooks", Guestbook>("guestbooks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Failed to fetch guestbooks", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbooks" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { message, name, avatarUrl } = body as {
      message?: string;
      name?: string;
      avatarUrl?: string;
    };

    if (!message || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("guestbooks")
      .insert({
        message,
        name,
        avatar_url: avatarUrl ?? "",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create guestbook entry", error);
    return NextResponse.json(
      { error: "Failed to create guestbook entry" },
      { status: 500 },
    );
  }
}
