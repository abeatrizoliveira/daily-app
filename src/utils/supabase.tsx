import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://bvgdtwueehnnaoigibna.supabase.co";
const supabasePublishableKey = "sb_publishable_elhyLABPng7fQRYPWubDkA_MPN_ptyx";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
