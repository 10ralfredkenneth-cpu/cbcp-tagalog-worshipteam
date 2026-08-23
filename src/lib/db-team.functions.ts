import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const getProfiles = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");
    
    if (error) throw error;
    return data || [];
  });

export const createMember = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    full_name: z.string().min(1),
    email: z.string().email(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar_url: z.string().optional(),
    member_status: z.string().optional(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const { data: member, error } = await supabase
      .from("profiles")
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return member;
  });

export const updateMemberStatus = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    id: z.string().uuid(),
    member_status: z.string(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const { data: member, error } = await supabase
      .from("profiles")
      .update({ member_status: data.member_status })
      .eq("id", data.id)
      .select()
      .single();
    
    if (error) throw error;
    return member;
  });
