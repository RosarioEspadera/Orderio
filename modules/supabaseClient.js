import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://ivbjlarqgmungywotsqu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YmpsYXJxZ211bmd5d290c3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MzExODgsImV4cCI6MjA2OTIwNzE4OH0.3sc6vlUycYfdIyg7sqmXDC9PCg8Ds8BIaZiCz4x0Ehs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
