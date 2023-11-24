import { setId } from '$lib/module/auth/auth.server.js';
import axios from 'axios';
import dotenv from 'dotenv';
import { db } from '$lib/module/db/db.server.js';

dotenv.config();

export async function load({ locals }) {
    let levelGradeClearData = await getClearGradeData();
    let songs = await getSongs();

    let id = locals.id;

    let clearData: any;
    try {
        if (id) {
            let clearDataJSON: any = await new Promise((res, rej) => {
                db.all("SELECT `data` FROM `clearData` WHERE `id` = ? ORDER BY importedTime DESC LIMIT 1", [id], (err, row) => {
                    if (err) {
                        rej(err);
                    }
                    else {
                        res(row[0]);
                    }
                })
            })
            clearData = JSON.parse(clearDataJSON.data);
        }
    }
    catch (err) {
        console.log(err);
    }

    return {
        levelGradeClearData,
        songs,
        id: await setId(locals),
        clearData
    }
}

async function getClearGradeData() {
    let response;
    try {
        response = await axios({
            method: 'post',
            data: {
                'api_key': process.env.api_key
            },
            url: 'http://taikowiki.com/api/levelgrade.php'
        })
    }
    catch { }
    return response?.data
}

async function getSongs() {
    let response;
    try {
        response = await axios({
            method: 'post',
            data: {
                'api_key': process.env.api_key
            },
            url: 'http://taikowiki.com/api/songs.php'
        })
    }
    catch { }
    return response?.data
}