import { removeSession } from '$lib/module/auth/auth.server.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    let key = cookies.get('session_key')?.toString();

    if(key){
        try{
            await removeSession(key);
        }catch{}
    }
}