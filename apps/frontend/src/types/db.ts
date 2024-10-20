export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      children: {
        Row: {
          age: number
          date_of_death: string | null
          gender: string
          id: string
          martyr_id: string | null
          name: string
          status: string
        }
        Insert: {
          age: number
          date_of_death?: string | null
          gender: string
          id?: string
          martyr_id?: string | null
          name: string
          status: string
        }
        Update: {
          age?: number
          date_of_death?: string | null
          gender?: string
          id?: string
          martyr_id?: string | null
          name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_martyr_id_fkey"
            columns: ["martyr_id"]
            isOneToOne: false
            referencedRelation: "martyrs"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          description: string | null
          event_date: string
          id: string
          martyr_id: string | null
          title: string
        }
        Insert: {
          description?: string | null
          event_date: string
          id?: string
          martyr_id?: string | null
          title: string
        }
        Update: {
          description?: string | null
          event_date?: string
          id?: string
          martyr_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_martyr_id_fkey"
            columns: ["martyr_id"]
            isOneToOne: false
            referencedRelation: "martyrs"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          martyr_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          martyr_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          martyr_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_martyr_id_fkey"
            columns: ["martyr_id"]
            isOneToOne: false
            referencedRelation: "martyrs"
            referencedColumns: ["id"]
          },
        ]
      }
      interests_and_hobbies: {
        Row: {
          category: string
          id: string
          martyr_id: string | null
          tags: string[]
        }
        Insert: {
          category: string
          id?: string
          martyr_id?: string | null
          tags?: string[]
        }
        Update: {
          category?: string
          id?: string
          martyr_id?: string | null
          tags?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "interests_and_hobbies_martyr_id_fkey"
            columns: ["martyr_id"]
            isOneToOne: false
            referencedRelation: "martyrs"
            referencedColumns: ["id"]
          },
        ]
      }
      martyrs: {
        Row: {
          cause_of_death: string | null
          city: string
          created_at: string | null
          creator_id: string
          date_of_birth: string
          date_of_death: string | null
          first_name: string
          gender: string
          guided_story: Json | null
          id: string
          last_name: string
          married: boolean | null
          middle_name: string | null
          profile_image_url: string | null
          social_media: Json | null
          spouse_first_name: string | null
          spouse_last_name: string | null
          status: string
          story: Json | null
          story_type: string
          updated_at: string | null
        }
        Insert: {
          cause_of_death?: string | null
          city: string
          created_at?: string | null
          creator_id?: string
          date_of_birth: string
          date_of_death?: string | null
          first_name: string
          gender: string
          guided_story?: Json | null
          id?: string
          last_name: string
          married?: boolean | null
          middle_name?: string | null
          profile_image_url?: string | null
          social_media?: Json | null
          spouse_first_name?: string | null
          spouse_last_name?: string | null
          status: string
          story?: Json | null
          story_type: string
          updated_at?: string | null
        }
        Update: {
          cause_of_death?: string | null
          city?: string
          created_at?: string | null
          creator_id?: string
          date_of_birth?: string
          date_of_death?: string | null
          first_name?: string
          gender?: string
          guided_story?: Json | null
          id?: string
          last_name?: string
          married?: boolean | null
          middle_name?: string | null
          profile_image_url?: string | null
          social_media?: Json | null
          spouse_first_name?: string | null
          spouse_last_name?: string | null
          status?: string
          story?: Json | null
          story_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          id: number
          name: string
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_id: string | null
          author_name: string | null
          content: string[]
          created_at: string | null
          id: string
          martyr_id: string | null
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          content?: string[]
          created_at?: string | null
          id?: string
          martyr_id?: string | null
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          content?: string[]
          created_at?: string | null
          id?: string
          martyr_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_martyr_id_fkey"
            columns: ["martyr_id"]
            isOneToOne: false
            referencedRelation: "martyrs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

