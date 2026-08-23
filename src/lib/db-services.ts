import { WorshipSetlist, SetlistStatus, ServiceType } from '@/types/setlists';
import { supabase } from '@/integrations/supabase/client';

export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_items (*),
      service_assignments (*)
    `)
    .order('service_date', { ascending: false });
  
  if (error) throw error;
  
  return (data || []).map((service: any) => ({
    ...service,
    serviceDate: service.service_date,
    serviceTime: service.service_time,
    serviceType: service.service_type as ServiceType,
    worshipLeader: service.worship_leader_id,
    status: service.status as SetlistStatus,
    songs: (service.service_items || [])
      .filter((item: any) => item.item_type === 'Song')
      .map((item: any) => ({
        id: item.id,
        songId: item.song_id,
        order: item.sort_order,
        selectedKey: item.selected_key,
        category: item.category,
        duration: item.duration,
        leaderNote: item.leader_note,
        transitionNote: item.transition_note,
        musicianNotes: item.musician_notes
      })),
    items: (service.service_items || []).map((item: any) => ({
      id: item.id,
      order: item.sort_order,
      type: item.item_type,
      title: item.title,
      assignedPerson: item.assigned_person,
      duration: item.duration,
      notes: item.notes,
      songId: item.song_id
    })),
    assignments: (service.service_assignments || []).map((as: any) => ({
      id: as.id,
      serviceId: as.service_id,
      memberId: as.member_id,
      role: as.role,
      status: as.status,
      callTime: as.call_time,
      notes: as.notes
    })),
    rehearsalDate: service.rehearsal_date,
    rehearsalTime: service.rehearsal_time,
    rehearsalLocation: service.rehearsal_location,
    rehearsalNotes: service.rehearsal_notes,
    estimatedDuration: service.estimated_duration,
    createdAt: service.created_at,
    updatedAt: service.updated_at
  })) as WorshipSetlist[];
};
