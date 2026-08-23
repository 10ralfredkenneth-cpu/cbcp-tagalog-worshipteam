import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

export const logAuditAction = async (
  action: string,
  entityType: string,
  entityId?: string,
  summary?: string,
  metadata?: any
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: user?.id,
        action,
        entity_type: entityType,
        entity_id: entityId,
        summary,
        metadata
      });

    if (error) throw error;
  } catch (err) {
    console.error('Failed to log audit action:', err);
  }
};
