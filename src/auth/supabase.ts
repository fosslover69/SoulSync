import { createClient, type Provider } from '@supabase/supabase-js';
import { goto } from '$app/navigation';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? '';
const supabase = createClient('https://rlrcvfdjunzgjdvioyxf.supabase.co', supabaseKey);

export const createUser = async (email: string, password: string) => {
	await supabase.auth
		.signUp({
			email: email,
			password: password
		})
		.then((response) => {
			console.log(response);
			goto('/');
		})
		.catch((error) => {
			console.log(error);
		});
};

export const signIn = async (email: string, password: string) => {
	await supabase.auth
		.signInWithPassword({
			email: email,
			password: password
		})
		.then((response) => {
			console.log(response);
			goto('/');
		})
		.catch((error) => {
			console.log(error);
		});
};

export const signUserOut = async () => {
	await supabase.auth
		.signOut()
		.then((response) => {
			console.log(response);
			goto('/');
		})
		.catch((error) => {
			console.log(error);
		});
};

export const resetPassword = (email: string) => {
	supabase.auth
		.resetPasswordForEmail(email)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const getUser = async () => {
	const user = supabase.auth.getUser();
	return user;
};

export const OAuthLogin = async (provider: Provider) => {
	await supabase.auth.signInWithOAuth({
		provider: provider
	});
};
