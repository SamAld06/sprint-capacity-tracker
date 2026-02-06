import { createBrowserClient } from "@supabase/ssr";

if(!process.env.NEXT_PUBLIC_SUPABASE_LINK || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Missing supabase env variables")
}

export function CreateSuperbaseBrowserClient() {
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_LINK as string, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string)
}