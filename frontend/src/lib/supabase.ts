import { supabase } from "@/integrations/supabase/client";

export { supabase };

export type UserRole = "candidate" | "recruiter";

export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data.role as UserRole;
};

export const createUserRole = async (userId: string, role: UserRole) => {
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role });

  if (error) throw error;
};
