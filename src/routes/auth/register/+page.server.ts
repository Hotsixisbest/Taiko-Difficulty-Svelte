import { register, checkSession } from "$lib/module/auth/auth.server";
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
    async default({request}){
        let formData = await request.formData();

        let id = formData.get('id')?.toString();
        let password = formData.get('password')?.toString();

        try{
            if(id && password){
                let reg = await register(id, password);
                if(reg.result === 'success'){
                    return {
                        result: true
                    }
                }
                else{
                    return {
                        result:false,
                        code:"UNEXPECTED_ERROR"
                    }
                }
            }
            else{
                return {
                    result:false,
                    code:"NO_ID_PASSWORD"
                }
            }
        }
        catch(err:any){
            return {
                result:false,
                code:err.code
            }
        }
    }
}