import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Database } from "@/integrations/supabase/types";

type ResourceInsert = Database["public"]["Tables"]["worship_resources"]["Insert"];
type MediaInsert = Database["public"]["Tables"]["media_items"]["Insert"];

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
  .inputValidator((data: any) => z.object({
    title: z.string().min(1),
    description: z.string().nullable().optional(),
    category: z.string(),
    type: z.string(),
    content_url: z.string().nullable().optional(),
    is_public: z.boolean().optional(),
    featured: z.boolean().optional(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const insertData: ResourceInsert = {
      title: data.title,
      description: data.description ?? null,
      category: data.category as any,
      resource_type: data.type as any,
      content_url: data.content_url ?? null,
      is_public: data.is_public ?? false,
      featured: data.featured ?? false,
      status: 'Published'
    };

    const { data: resource, error } = await supabase
      .from("worship_resources")
      .insert([insertData])
      .select()
      .single();
    
    if (error) throw error;
    return resource;
  });

export const getMediaItems = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("media_items")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  });

export const createMediaItem = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    title: z.string().min(1),
    file_url: z.string().url(),
    media_type: z.string(),
    category: z.string(),
    description: z.string().nullable().optional(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const insertData: MediaInsert = {
      title: data.title,
      file_url: data.file_url,
      media_type: data.media_type as any,
      category: data.category as any,
      description: data.description ?? null,
    };

    const { data: media, error } = await supabase
      .from("media_items")
      .insert([insertData])
      .select()
      .single();
    
    if (error) throw error;
    return media;
  });
