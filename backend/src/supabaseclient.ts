import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_LINK, process.env.SUPABASE_KEY)