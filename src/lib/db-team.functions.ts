import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Database } from "@/integrations/supabase/types";

type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type AssignmentInsert = Database["public"]["Tables"]["service_assignments"]["Insert"];
type AssignmentUpdate = Database["public"]["Tables"]["service_assignments"]["Update"];

export const getProfiles = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");
    
    if (error) throw error;
    return data || [];
  });

export const getTeamMembers = createServerFn({ method: "GET" })
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
    id: z.string().uuid(),
    full_name: z.string().min(1),
    email: z.string().email(),
    primary_role: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    avatar_url: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const insertData: ProfileInsert = {
      id: data.id,
      full_name: data.full_name,
      email: data.email,
      primary_role: data.primary_role ?? null,
      bio: data.bio ?? null,
      avatar_url: data.avatar_url ?? null,
      status: (data.status as any) ?? null,
    };

    const { data: member, error } = await supabase
      .from("profiles")
      .insert([insertData])
      .select()
      .single();
    
    if (error) throw error;
    return member;
  });

export const updateMember = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    id: z.string().uuid(),
    updates: z.any()
  }).parse(data.data))
  .handler(async ({ data }) => {
    const { data: member, error } = await supabase
      .from("profiles")
      .update(data.updates)
      .eq("id", data.id)
      .select()
      .single();
    
    if (error) throw error;
    return member;
  });

export const getAssignments = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("service_assignments")
      .select("*");
    
    if (error) throw error;
    return data || [];
  });

export const createAssignment = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    service_id: z.string().uuid(),
    member_id: z.string().uuid(),
    role: z.string().nullable().optional(),
    status: z.string().optional(),
    notes: z.string().nullable().optional(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const insertData: AssignmentInsert = {
      service_id: data.service_id,
      member_id: data.member_id,
      role: (data.role as any) ?? null,
      status: (data.status as any) ?? 'Pending',
      notes: data.notes ?? null,
    };

    const { data: assignment, error } = await supabase
      .from("service_assignments")
      .insert([insertData])
      .select()
      .single();
    
    if (error) throw error;
    return assignment;
  });

export const updateAssignmentStatus = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    id: z.string().uuid(),
    status: z.string(),
  }).parse(data.data))
  .handler(async ({ data }) => {
    const updateData: AssignmentUpdate = {
      status: data.status as any
    };

    const { data: assignment, error } = await supabase
      .from("service_assignments")
      .update(updateData)
      .eq("id", data.id)
      .select()
      .single();
    
    if (error) throw error;
    return assignment;
  });
