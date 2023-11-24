import { setId } from '$lib/module/auth/auth.server.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function load({locals}){
    let levelGradeClearData = await getClearGradeData();
    let songs = await getSongs();

    return {
        levelGradeClearData,
        songs,
        id: await setId(locals)
    }
}

async function getClearGradeData(){
    let response;
    try{
        response = await axios({
            method:'post',
            data: {
                'api_key': process.env.api_key
            },
            url:'http://taikowiki.com/api/levelgrade.php'
        })
    }
    catch{}
    return response?.data
}

async function getSongs(){
    let response;
    try{
        response = await axios({
            method:'post',
            data: {
                'api_key': process.env.api_key
            },
            url:'http://taikowiki.com/api/songs.php'
        })
    }
    catch{}
    return response?.data
}