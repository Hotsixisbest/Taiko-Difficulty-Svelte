import { checkSession } from '$lib/module/auth/auth.server';

export async function handle({event, resolve}){
    let cookies = event.cookies;
    
    let sessionKey = cookies.get('session_key')?.toString();
    if(sessionKey){
        let id;
        try{
            id = await checkSession(sessionKey);
            if(id){
                event.locals.id = id;
            }
        }
        catch{}
    }

    return await resolve(event);
}