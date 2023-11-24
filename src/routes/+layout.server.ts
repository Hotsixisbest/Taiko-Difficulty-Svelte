import { setId } from '$lib/module/auth/auth.server.js'

export async function load({locals}){
    return{
        id: await setId(locals)
    }   
}