/**
 * Hand-written skeleton of the database types.
 *
 * Replace this file with generated types once the Supabase project exists:
 *   npx supabase gen types typescript --project-id <id> --schema public > src/lib/supabase/types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'member' | 'admin';
          membership_expires_at: string | null;
          xp: number;
          streak: number;
          weight_kg: number | null;
          body_fat_pct: number | null;
          muscle_mass_kg: number | null;
          height_m: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'member' | 'admin';
          membership_expires_at?: string | null;
          xp?: number;
          streak?: number;
          weight_kg?: number | null;
          body_fat_pct?: number | null;
          muscle_mass_kg?: number | null;
          height_m?: number | null;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [];
      };
      exercises: {
        Row: {
          id: number;
          name: string;
          sets: string | null;
          rest: string | null;
          muscle: string | null;
          image_url: string | null;
          video_url: string | null;
          color: string | null;
          muscles: string[] | null;
          description: string | null;
          benefits: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['exercises']['Row'],
          'id' | 'created_at'
        > & { id?: number };
        Update: Partial<Database['public']['Tables']['exercises']['Insert']>;
        Relationships: [];
      };
      routines: {
        Row: {
          id: number;
          user_id: string;
          day_of_week: number;
          title: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['routines']['Row'],
          'id' | 'created_at'
        > & { id?: number };
        Update: Partial<Database['public']['Tables']['routines']['Insert']>;
        Relationships: [];
      };
      routine_exercises: {
        Row: {
          id: number;
          routine_id: number;
          exercise_id: number;
          position: number;
        };
        Insert: Omit<
          Database['public']['Tables']['routine_exercises']['Row'],
          'id'
        > & { id?: number };
        Update: Partial<
          Database['public']['Tables']['routine_exercises']['Insert']
        >;
        Relationships: [];
      };
      workout_logs: {
        Row: {
          id: number;
          user_id: string;
          exercise_id: number;
          performed_at: string;
          weight: string | null;
          reps: string | null;
          completed: boolean;
          xp_awarded: number;
        };
        Insert: Omit<
          Database['public']['Tables']['workout_logs']['Row'],
          'id' | 'performed_at'
        > & { id?: number; performed_at?: string };
        Update: Partial<
          Database['public']['Tables']['workout_logs']['Insert']
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
