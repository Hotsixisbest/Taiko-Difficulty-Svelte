import { login, checkSession } from "$lib/module/auth/auth.server";
import { redirect } from "@sveltejs/kit";

export async function load({cookies}){
    let sessionKey = cookies.get('session_key')?.toString();

    if(sessionKey){
        let valid;
        try{
            valid = await checkSession(sessionKey);
        }
        catch{
            valid = null;
        }
        
        if(valid){
            throw redirect(302, '/');
        }
    }
}

export const actions = {
    async default({request, cookies}){
        let formData = await request.formData();

        let id = formData.get('id')?.toString();
        let password = formData.get('password')?.toString();

        if(!id || !password){
            return {
                result:false,
                code: 'NO_ID_PASSWORD'
            }
        }

        let sessionKey;
        try{
            sessionKey = await login(id, password);
        }
        catch(err:any){
            console.log(err);
            return {
                result:false,
                code: err.code
            }
        }

        cookies.set('session_key', sessionKey, {path:'/'});
        throw redirect(302, '/');
    }
}