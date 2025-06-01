import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// })

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })

// Temporary mock supabase object to prevent crashes
export const supabase = {
  auth: {
    signUp: async () => ({ data: null, error: 'Supabase is disabled' }),
    signIn: async () => ({ data: null, error: 'Supabase is disabled' }),
  },
  from: () => ({
    insert: async () => ({ data: null, error: 'Supabase is disabled' }),
    select: async () => ({ data: null, error: 'Supabase is disabled' }),
  }),
};