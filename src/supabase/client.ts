import {createClient} from "@supabase/supabase-js";



const supabaseUrl = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_ANON_KEY;


var customOptions = {
    // Otras opciones aquí, como url y apiKey
    auth: {
        persistSession:false
    },
};

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Las variables de entorno de Supabase no están definidas.");
}
export const clientSupabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    customOptions
);