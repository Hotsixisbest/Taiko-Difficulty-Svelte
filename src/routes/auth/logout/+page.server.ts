import { removeSession, setId } from '$lib/module/auth/auth.server.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, locals }) {

}

export const actions = {
    async default({ cookies }) {
        let key = cookies.get('session_key')?.toString();

        if (key) {
            try {
                await removeSession(key);
            } catch { }
        }

        throw redirect(302, '/')
    }
}