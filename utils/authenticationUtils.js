import { supabase } from './supabase';

export default async function signin() {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw error;
    }
    return true;
}

export async function signup(email, password) {
    const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        throw error;
    }
    if(!session) {
        Alert.alert('Please check your inbox for email verification!');
    }
    return true;
}

export async function fetchUserID() {
    const session = supabase.auth.getSession();
    return session.user.id;
}