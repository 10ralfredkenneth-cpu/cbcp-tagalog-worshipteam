export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
          summary: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
          summary?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
          summary?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ministry_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          auth_provider: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          date_joined: string | null
          email: string
          emergency_contact: string | null
          full_name: string
          groups: string[] | null
          id: string
          instrument: string | null
          internal_notes: string | null
          phone: string | null
          primary_role: string | null
          skills: string[] | null
          status: string | null
          team_member_id: string | null
          updated_at: string | null
          vocal_range: string | null
        }
        Insert: {
          auth_provider?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_joined?: string | null
          email: string
          emergency_contact?: string | null
          full_name: string
          groups?: string[] | null
          id: string
          instrument?: string | null
          internal_notes?: string | null
          phone?: string | null
          primary_role?: string | null
          skills?: string[] | null
          status?: string | null
          team_member_id?: string | null
          updated_at?: string | null
          vocal_range?: string | null
        }
        Update: {
          auth_provider?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_joined?: string | null
          email?: string
          emergency_contact?: string | null
          full_name?: string
          groups?: string[] | null
          id?: string
          instrument?: string | null
          internal_notes?: string | null
          phone?: string | null
          primary_role?: string | null
          skills?: string[] | null
          status?: string | null
          team_member_id?: string | null
          updated_at?: string | null
          vocal_range?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          role: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      songs: {
        Row: {
          id: string
          title: string
          artist: string | null
          default_key: string | null
          bpm: number | null
          time_signature: string | null
          language: string
          song_type: string
          status: string
          themes: string[] | null
          scripture_references: Json | null
          lyrics: string | null
          chord_chart: string | null
          sections: Json | null
          flow: string[] | null
          worship_leader_notes: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          artist?: string | null
          default_key?: string | null
          bpm?: number | null
          time_signature?: string | null
          language: string
          song_type: string
          status: string
          themes?: string[] | null
          scripture_references?: Json | null
          lyrics?: string | null
          chord_chart?: string | null
          sections?: Json | null
          flow?: string[] | null
          worship_leader_notes?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          artist?: string | null
          default_key?: string | null
          bpm?: number | null
          time_signature?: string | null
          language?: string
          song_type?: string
          status?: string
          themes?: string[] | null
          scripture_references?: Json | null
          lyrics?: string | null
          chord_chart?: string | null
          sections?: Json | null
          flow?: string[] | null
          worship_leader_notes?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          title: string
          service_date: string
          service_time: string | null
          service_type: string
          status: string
          theme: string | null
          scripture_focus: string | null
          worship_leader_id: string | null
          rehearsal_date: string | null
          rehearsal_time: string | null
          rehearsal_location: string | null
          rehearsal_notes: string | null
          notes: string | null
          estimated_duration: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          service_date: string
          service_time?: string | null
          service_type: string
          status: string
          theme?: string | null
          scripture_focus?: string | null
          worship_leader_id?: string | null
          rehearsal_date?: string | null
          rehearsal_time?: string | null
          rehearsal_location?: string | null
          rehearsal_notes?: string | null
          notes?: string | null
          estimated_duration?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          service_date?: string
          service_time?: string | null
          service_type?: string
          status?: string
          theme?: string | null
          scripture_focus?: string | null
          worship_leader_id?: string | null
          rehearsal_date?: string | null
          rehearsal_time?: string | null
          rehearsal_location?: string | null
          rehearsal_notes?: string | null
          notes?: string | null
          estimated_duration?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_items: {
        Row: {
          id: string
          service_id: string
          song_id: string | null
          item_type: string
          title: string
          sort_order: number
          selected_key: string | null
          category: string | null
          assigned_person: string | null
          duration: number | null
          leader_note: string | null
          transition_note: string | null
          musician_notes: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          service_id: string
          song_id?: string | null
          item_type: string
          title: string
          sort_order: number
          selected_key?: string | null
          category?: string | null
          assigned_person?: string | null
          duration?: number | null
          leader_note?: string | null
          transition_note?: string | null
          musician_notes?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          song_id?: string | null
          item_type?: string
          title?: string
          sort_order?: number
          selected_key?: string | null
          category?: string | null
          assigned_person?: string | null
          duration?: number | null
          leader_note?: string | null
          transition_note?: string | null
          musician_notes?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      service_assignments: {
        Row: {
          id: string
          service_id: string
          member_id: string
          role: string
          status: string
          call_time: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id: string
          member_id: string
          role: string
          status: string
          call_time?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          member_id?: string
          role?: string
          status?: string
          call_time?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      worship_resources: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          content: string | null
          category: string
          resource_type: string
          ministry_roles: string[] | null
          tags: string[] | null
          scripture_references: Json | null
          cover_image: string | null
          author: string | null
          reading_time: number | null
          featured: boolean
          status: string
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          content?: string | null
          category: string
          resource_type: string
          ministry_roles?: string[] | null
          tags?: string[] | null
          scripture_references?: Json | null
          cover_image?: string | null
          author?: string | null
          reading_time?: number | null
          featured?: boolean
          status: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          content?: string | null
          category?: string
          resource_type?: string
          ministry_roles?: string[] | null
          tags?: string[] | null
          scripture_references?: Json | null
          cover_image?: string | null
          author?: string | null
          reading_time?: number | null
          featured?: boolean
          status?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_albums: {
        Row: {
          id: string
          title: string
          description: string | null
          cover_image_url: string | null
          category: string | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          cover_image_url?: string | null
          category?: string | null
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          cover_image_url?: string | null
          category?: string | null
          featured?: boolean
          created_at?: string
        }
        Relationships: []
      }
      media_items: {
        Row: {
          id: string
          album_id: string | null
          title: string
          description: string | null
          file_url: string
          media_type: string
          category: string | null
          tags: string[] | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          album_id?: string | null
          title: string
          description?: string | null
          file_url: string
          media_type: string
          category?: string | null
          tags?: string[] | null
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          album_id?: string | null
          title?: string
          description?: string | null
          file_url?: string
          media_type?: string
          category?: string | null
          tags?: string[] | null
          featured?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof Database["public"]["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof Database["public"]["CompositeTypes"]
    ? Database["public"]["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
