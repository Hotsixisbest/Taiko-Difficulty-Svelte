import { error, redirect } from '@sveltejs/kit';
import { getSessionToken, getCardList } from 'hiroba';

export async function POST({request, locals}){
    let formData = await request.formData();

    let id = locals.id;
    if(!id){
        throw error(403)
    }

    let token;
    try{
        let email = formData.get('email')?.toString();
        let password = formData.get('password')?.toString();
        
        if(!email || !password){
            return new Response(JSON.stringify({
                status: 'login',
                code: "NO_ID_PASSWORD"
            }))
        }

        token = await getSessionToken(email, password);
    }
    catch(err:any){
        console.log(err);
        return new Response(JSON.stringify({
            status: 'login',
            code: err.code
        }))
    }

    let cardList;
    try{
        cardList = await getCardList(token);
    }
    catch(err:any){
        console.log(err);
        return new Response(JSON.stringify({
            status:'login', 
            code: err.code
        }))
    }

    return new Response(JSON.stringify({
        status:'cardLogin',
        cardList,
        token
    }))
}