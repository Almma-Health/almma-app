import { supabase } from './supabase';

export default async function signin(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    return { error }
}

export async function signup(email, password, username) {
    const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) {
        console.log('Error:', error);
        return { data: { session }, error }
    } else {
        const userId = await fetchUserID();
        const { error: insertError } = await supabase.from('user_info').insert({
            user_id: userId,
            email: email,
            username: username,
        });
        if (insertError) {
            console.log('Insert error:', insertError);
            return { data: { session }, error: insertError }
        }
        return { data: { session }, error }
    }
    
}

export async function fetchUserID() {
    const { data: { session } } = await supabase.auth.getSession();
    return session.user.id;
}