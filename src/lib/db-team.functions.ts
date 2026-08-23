import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

// Team Management
export const getTeamMembers = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");
    
    if (error) throw error;
    return data || [];
  });

export const updateMemberStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string, status: any }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("profiles")
      .update({ status: data.status })
      .eq("id", data.id);
    
    if (error) throw error;
    return { success: true };
  });

export const createMember = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("profiles")
      .insert(data);
    
    if (error) throw error;
    return { success: true };
  });

export const updateMember = createServerFn({ method: "POST" })
  .validator((data: { id: string, updates: any }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("profiles")
      .update(data.updates)
      .eq("id", data.id);
    
    if (error) throw error;
    return { success: true };
  });

// Scheduling
export const getAssignments = createServerFn({ method: "GET" })
  .validator((data: { serviceId?: string } = {}) => data)
  .handler(async ({ data }) => {
    let query = supabase
      .from("service_assignments")
      .select(`
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `);
    
    if (data.serviceId) {
      query = query.eq("service_id", data.serviceId);
    }
    
    const { data: assignments, error } = await query;
    if (error) throw error;
    return assignments || [];
  });

export const createAssignment = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("service_assignments")
      .insert(data);
    
    if (error) throw error;
    return { success: true };
  });

export const updateAssignmentStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string, status: any }) => data)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("service_assignments")
      .update({ status: data.status })
      .eq("id", data.id);
    
    if (error) throw error;
    return { success: true };
  });
