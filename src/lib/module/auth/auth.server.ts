import { db } from "../db/db.server";
import sqlite3 from 'sqlite3';
import crypto from 'node:crypto';

const sessionDB = new sqlite3.Database(':memory:');
sessionDB.run(`CREATE TABLE "session" (
	"key"	TEXT NOT NULL UNIQUE,
	"id"	TEXT NOT NULL,
	"expiration"	INTEGER NOT NULL,
	PRIMARY KEY("key")
)`);

class AuthError extends Error{
    code:string;

    constructor(message:string, code:string){
        super(message);
        this.code = code;
    }
}

async function checkUser(id:string){
    let user:unknown[] = await new Promise((res, rej) => {
        db.all("SELECT * FROM `user` WHERE `id` = ?", [id], (err, row) => {
            if(err){
                rej(err);
            }
            else{
                res(row);
            }
        })
    })

    if(user.length === 0){
        return {
            result: false
        }
    }
    else{
        return {
            result:true,
            user: user[0]
        }
    }
}

function hash(password:string){
    const hashed = crypto.createHash('sha-512').update(password).digest('base64');
    return hashed;
}

export async function register(id:string, password:string){
    let isUser;
    try{
        isUser = await checkUser(id);
    }
    catch(err:any){
        throw new AuthError(err.message, 'DATABASE_ERROR');
    }

    if(isUser.result){
        throw new AuthError('', 'DUPLICATED_ID');
    }

    const hashed = hash(password);
    try{
        await new Promise<void>((res, rej) => {
            db.run("INSERT INTO `user` (`id`, `password`) VALUES (?, ?)", [id, hashed], (err) => {
                if(err){
                    rej(err);
                }
                else{
                    res();
                }
            })
        })
    }
    catch(err:any){
        console.log(err);
        throw new AuthError(err.message, 'DATABASE_ERROR')
    }

    return {
        result: 'success'
    }
}

export async function login(id:string, password:string){
    let user:unknown[];
    try{
        user = await new Promise((res, rej) => {
            db.all("SELECT * FROM `user` WHERE `id` = ? AND `password` = ?", [id, hash(password)], (err, row) => {
                if(err){
                    rej(err);
                }
                else{
                    res(row);
                }
            })
        })
    }
    catch(err:any){
        throw new AuthError(err.message, 'DATABASE_ERROR')
    }

    if(user.length === 0){
        throw new AuthError('', 'INVALID_ID_PASSWORD')
    }

    return await createSession(id);
}

async function createSession(id:string):Promise<string>{
    try{
        await deleteSessionExpired();
    }
    catch{}
    let key = randomString();

    let isDuplicate:boolean;
    try{
        isDuplicate = await new Promise<boolean>((res, rej) => {
            sessionDB.all("SELECT * FROM `session` WHERE `key` = ?", [key], (err, row) => {
                if(err){
                    rej(err);
                }
                else{
                    if(row.length !== 0){
                        res(true);
                    }
                    else{
                        res(false);
                    }
                }
            })
        })
    }
    catch(err:any){
        throw new AuthError(err.message, 'DATABASE_ERROR')
    }

    if(isDuplicate){
        return await createSession(id);
    }
    else{
        try{
            let currentTime = new Date();
            currentTime.setDate(currentTime.getDate() + 30);
            await new Promise<void>((res, rej) => {
                sessionDB.run("INSERT INTO `session` (`key`, `id`, `expiration`) VALUES (?, ?, ?)", [key, id, currentTime.getTime()], (err) => {
                    if(err){
                        rej(err);
                    }
                    else{
                        res();
                    }
                })
            })
        }catch(err:any){
            throw new AuthError(err.message, 'DATABASE_ERROR')
        }
        
        return key;
    }
}

export async function checkSession(key:string){
    try{
        await deleteSessionExpired();
    }
    catch{}
    let sessionData;
    try{
        sessionData = await new Promise<SessionData>((res, rej) => {
            sessionDB.all("SELECT * FROM `session` WHERE `key` = ?", [key], (err, row:any) => {
                if(err){
                    rej(err);
                }
                else{
                    if(row.length === 0){
                        res({
                            result: false
                        });
                    }
                    else{
                        if(row[0].expiration > new Date().getTime()){
                            res({
                                result:true,
                                id: row[0].id
                            });
                        }
                        else{
                            res({
                                result:false
                            })
                        }
                    }
                }
            })
        })
    }catch(err:any){
        throw new AuthError(err.message, 'DATABASE_ERROR')
    }

    if(sessionData.result){
        try{//세션 연장
            await new Promise<void>((res, rej) => {
                let currentTime = new Date();
                currentTime.setDate(currentTime.getDate() + 30);
                db.run("UPDATE `session` SET `expiration` = ? WHERE `key` = ?", [currentTime.getTime(), key], (err) => {
                    if(err){
                        rej(err);
                    }
                    else{
                        res();
                    }
                })
            })
        }
        catch{}
        return sessionData.id;
    }
    else{
        return null;
    }
}

interface SessionData{
    result:boolean;
    id?:string
}

async function deleteSessionExpired(){
    try{
        await new Promise<void>((res, rej) => {
            db.run("DELETE FROM `session` WHERE `expiration` < ?", [new Date().getTime()], (err) => {
                if(err){
                    rej();
                }
                else{
                    res();
                }
            })
        })
    }
    catch(err:any){
        throw new AuthError(err.message, 'DATABASE_ERROR');
    }
}

function randomString():string{
    return Math.random().toString(32).substring(2, 10) + Math.random().toString(32).substring(2, 10);
}

export async function setId(locals:any){
    let id;
    if(locals.id){
        id = locals.id;
    }
    return id;
}