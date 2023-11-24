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
            throw new Error();
        }

        token = await getSessionToken(email, password);
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({
            status:'login',
            code: 'UNEXPECTED_ERROR'
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