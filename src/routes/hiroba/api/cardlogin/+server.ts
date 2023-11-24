import { getSessionToken, getCardList, getClearData, cardLogin } from 'hiroba';
import { db } from '$lib/module/db/db.server.js';
import { error, redirect } from '@sveltejs/kit';

export async function POST({request, cookies, locals}){
    let formData = await request.formData();
    let taikoNumber = formData.get('taikoNumber');
    let id = locals.id;
    if(!id){
        throw error(403)
    }

    let token = cookies.get('hiroba_token')?.toString();
    let clearData:any;
    try{
        if(!token || !taikoNumber){
            throw new Error();
        }
        await cardLogin(token, Number(taikoNumber));
        clearData = await getClearData(token);
    }
    catch(err:any){
        console.log(err);
        return new Response(JSON.stringify({
            status:'login',
            code: err.code
        }))
    }

    try{
        await new Promise<void>((res, rej) => {
            db.run("INSERT INTO `clearData` (`id`, `taikoNumber`, `nickname`, `data`, `importedTime`) VALUES (?, ?, ?, ?, ?)", [id, clearData.card.taikoNumber, clearData.card.nickname, JSON.stringify(clearData.clearData), new Date().getTime()], (err) => {
                if(err){
                    rej(err);
                }
                else{
                    res();
                }
            })
        })
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({
            status:'login',
            code: 'DATABASE_ERROR'
        }))
    }

    return new Response(JSON.stringify({
        status:'imported'
    }))
}