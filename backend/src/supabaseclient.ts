import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://wcyxqkhptsacqfcscwgt.supabase.co', process.env.SUPABASE_KEY)