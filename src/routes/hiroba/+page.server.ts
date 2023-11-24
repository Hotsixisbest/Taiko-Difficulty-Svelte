import {checkLogin, getCardList, getSessionToken} from 'hiroba';
import axios from 'axios';
import { redirect } from '@sveltejs/kit';

export async function load({cookies, locals}){
    let hirobaToken = cookies.get('hiroba_token');

    let id = locals.id;
    if(!id){
        throw redirect(302, '/auth/login');
    }

    if(hirobaToken){
        try{
            let response = await axios({
                method:'get',
                url:'https://donderhiroba.jp',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                    cookie: '_token_v2='+hirobaToken
                }
            });
            if(checkLogin(response)){
                let cardList = await getCardList(hirobaToken);
                return {
                    status: 'cardLogin',
                    cardList
                }
            }
        }catch{}
    }
    
    return {
        status: 'login'
    }
    
}