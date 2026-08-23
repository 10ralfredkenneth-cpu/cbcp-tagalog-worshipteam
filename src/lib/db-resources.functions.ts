import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getResources = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("worship_resources" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  });

export const getMedia = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("media_items" as any)
      .select(`
        *,
        media_albums (
          title
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  });
