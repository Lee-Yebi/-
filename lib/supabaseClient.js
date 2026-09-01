import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// .env.local에 값이 채워지기 전까지는 null — 페이지에서 이 값을 확인해서
// 안내 메시지를 보여주고, createClient가 던지는 에러로 화면 전체가
// 깨지지 않도록 합니다.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
