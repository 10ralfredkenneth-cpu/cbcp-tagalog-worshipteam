import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getResources = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("worship_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  });

export const createResource = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("worship_resources")
      .insert(data);
    
    if (error) throw error;
    return { success: true };
  });

export const updateResource = createServerFn({ method: "POST" })
  .validator((data: { id: string, updates: any }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("worship_resources")
      .update(data.updates)
      .eq("id", data.id);
    
    if (error) throw error;
    return { success: true };
  });

export const getMedia = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("media_items")
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

export const createMediaItem = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("media_items")
      .insert(data);
    
    if (error) throw error;
    return { success: true };
  });

export const getMediaAlbums = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("media_albums")
      .select("*")
      .order("title");
    
    if (error) throw error;
    return data || [];
  });

