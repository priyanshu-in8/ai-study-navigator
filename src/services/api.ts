import { supabase } from "@/integrations/supabase/client";

// ============ AUTH ============
export const authApi = {
  signUp: (email: string, password: string) =>
    supabase.auth.signUp({ email, password }),

  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),

  signOut: () => supabase.auth.signOut(),

  getSession: () => supabase.auth.getSession(),

  resetPassword: (email: string) =>
    supabase.auth.resetPasswordForEmail(email),

  updatePassword: (password: string) =>
    supabase.auth.updateUser({ password }),
};

// ============ PROFILES ============
export const profilesApi = {
  get: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("profiles").select("*").eq("user_id", user.id).single();
  },

  update: async (updates: { display_name?: string; avatar_url?: string; bio?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("profiles").update(updates).eq("user_id", user.id).select().single();
  },
};

// ============ STUDY PLANS ============
export const studyPlansApi = {
  list: () =>
    supabase.from("study_plans").select("*, study_tasks(*)").order("created_at", { ascending: false }),

  get: (id: string) =>
    supabase.from("study_plans").select("*, study_tasks(*)").eq("id", id).single(),

  create: async (plan: { title: string; description?: string; subject?: string; scheduled_date?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("study_plans").insert({ ...plan, user_id: user.id }).select().single();
  },

  update: (id: string, updates: { title?: string; description?: string; subject?: string; status?: string; scheduled_date?: string }) =>
    supabase.from("study_plans").update(updates).eq("id", id).select().single(),

  delete: (id: string) =>
    supabase.from("study_plans").delete().eq("id", id),
};

// ============ STUDY TASKS ============
export const studyTasksApi = {
  list: () =>
    supabase.from("study_tasks").select("*").order("created_at", { ascending: false }),

  create: async (task: { title: string; subject?: string; duration_minutes?: number; plan_id?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("study_tasks").insert({ ...task, user_id: user.id }).select().single();
  },

  update: (id: string, updates: { title?: string; is_completed?: boolean; completed_at?: string | null }) =>
    supabase.from("study_tasks").update(updates).eq("id", id).select().single(),

  toggleComplete: async (id: string, completed: boolean) =>
    supabase.from("study_tasks").update({
      is_completed: completed,
      completed_at: completed ? new Date().toISOString() : null,
    }).eq("id", id).select().single(),

  delete: (id: string) =>
    supabase.from("study_tasks").delete().eq("id", id),
};

// ============ QUIZ ATTEMPTS ============
export const quizApi = {
  list: () =>
    supabase.from("quiz_attempts").select("*").order("created_at", { ascending: false }),

  getBySubject: (subject: string) =>
    supabase.from("quiz_attempts").select("*").eq("subject", subject).order("created_at", { ascending: false }),

  submit: async (attempt: { subject: string; score: number; total_questions: number; time_taken_seconds?: number }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("quiz_attempts").insert({ ...attempt, user_id: user.id }).select().single();
  },
};

// ============ FLASHCARDS ============
export const flashcardsApi = {
  list: () =>
    supabase.from("flashcards").select("*").order("next_review_at", { ascending: true }),

  getDue: () =>
    supabase.from("flashcards").select("*").lte("next_review_at", new Date().toISOString()).order("mastery", { ascending: true }),

  create: async (card: { front: string; back: string; subject?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("flashcards").insert({ ...card, user_id: user.id }).select().single();
  },

  updateMastery: (id: string, mastery: number) => {
    const hours = mastery < 30 ? 1 : mastery < 60 ? 24 : mastery < 80 ? 72 : 168;
    const nextReview = new Date(Date.now() + hours * 3600000).toISOString();
    return supabase.from("flashcards").update({ mastery, next_review_at: nextReview }).eq("id", id).select().single();
  },

  delete: (id: string) =>
    supabase.from("flashcards").delete().eq("id", id),
};

// ============ MOOD ENTRIES ============
export const moodApi = {
  list: (limit = 30) =>
    supabase.from("mood_entries").select("*").order("created_at", { ascending: false }).limit(limit),

  create: async (entry: { mood: number; energy_level?: number; notes?: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("mood_entries").insert({ ...entry, user_id: user.id }).select().single();
  },
};

// ============ ACHIEVEMENTS ============
export const achievementsApi = {
  list: () =>
    supabase.from("user_achievements").select("*").order("unlocked_at", { ascending: false }),

  unlock: async (achievementKey: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    return supabase.from("user_achievements").insert({ user_id: user.id, achievement_key: achievementKey }).select().single();
  },
};

// ============ AI CHAT ============
export const aiChatApi = {
  getMessages: (sessionId: string) =>
    supabase.from("ai_chat_messages").select("*").eq("session_id", sessionId).order("created_at", { ascending: true }),

  getSessions: () =>
    supabase.from("ai_chat_messages").select("session_id, created_at").order("created_at", { ascending: false }),

  sendMessage: async (content: string, sessionId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Save user message
    await supabase.from("ai_chat_messages").insert({
      user_id: user.id,
      session_id: sessionId,
      role: "user",
      content,
    });

    // Call AI edge function
    const { data, error } = await supabase.functions.invoke("ai-chat", {
      body: { message: content, sessionId },
    });

    if (error) throw error;

    // Save assistant response
    await supabase.from("ai_chat_messages").insert({
      user_id: user.id,
      session_id: sessionId,
      role: "assistant",
      content: data.reply,
    });

    return data.reply as string;
  },
};

// ============ ANALYTICS HELPERS ============
export const analyticsApi = {
  getStudyStats: async () => {
    const [tasks, quizzes, moods] = await Promise.all([
      supabase.from("study_tasks").select("*").eq("is_completed", true),
      supabase.from("quiz_attempts").select("*"),
      supabase.from("mood_entries").select("*").order("created_at", { ascending: false }).limit(7),
    ]);
    return { tasks: tasks.data, quizzes: quizzes.data, moods: moods.data };
  },
};
