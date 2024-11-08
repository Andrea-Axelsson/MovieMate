import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

/** OpenAI config */
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
if (!openaiApiKey) throw new Error("OpenAI API key is missing or invalid.");
export const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
if (!supabaseApiKey || !supabaseUrl) throw new Error("Supabase configuration is missing.");
export const supabase = createClient(supabaseUrl, supabaseApiKey);

/** TMDB config */
const tmdbApiKeyEnv = import.meta.env.VITE_TMDB_API_KEY;
if (!tmdbApiKeyEnv) throw new Error("TMDB API key is missing or invalid.");
export const tmdbApiKey = tmdbApiKeyEnv;

