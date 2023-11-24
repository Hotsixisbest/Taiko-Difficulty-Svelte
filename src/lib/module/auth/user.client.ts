import { getContext } from "svelte";
import type { Writable } from "svelte/store";

export function setUser(userData:any){
    let user:Writable<any> = getContext('user');

    user?.set(userData)
}