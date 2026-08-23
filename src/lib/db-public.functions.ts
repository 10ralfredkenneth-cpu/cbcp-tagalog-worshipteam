import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getSongsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("status", "Active")
      .order("title");

    if (error) throw error;
    return data || [];
  });
