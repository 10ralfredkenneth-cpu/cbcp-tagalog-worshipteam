import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getSettings = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("ministry_settings")
      .select("*");
    
    if (error) throw error;
    return data || [];
  });

export const updateSetting = createServerFn({ method: "POST" })
  .validator((data: { key: string, value: any }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("ministry_settings")
      .upsert({ 
        key: data.key, 
        value: data.value,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });
    
    if (error) throw error;
    return { success: true };
  });

export const getSettingByKey = createServerFn({ method: "GET" })
  .validator((key: string) => key)
  .handler(async ({ data: key }) => {
    const { data, error } = await supabase
      .from("ministry_settings")
      .select("*")
      .eq("key", key)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  });
