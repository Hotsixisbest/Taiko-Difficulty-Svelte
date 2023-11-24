<script>
	import { browser } from '$app/environment';
    import Cookies from 'js-cookie';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	export let data;
	let status = data.status;
	let error;

    $:if(status === 'imported'){
        goto('/');
    }

	let logindata = {
		email: '',
		password: ''
	};

	let cardList = [];
    if(data.cardList){
        cardList = data.cardList;
    }

	async function hirobaLogin() {
		let result;

        let formData = new FormData();
        formData.append('email', logindata.email);
        formData.append('password', logindata.password);
        logindata.password = '';
		try {
            status = 'logining';
			result = await axios({
				method: 'post',
				url: '/hiroba/api/login',
				data: formData,
                headers: { "Content-Type": "multipart/form-data" }
			});
		} catch {
			error = 'UNEXPECTED_ERROR';
		}

        result = result.data;

		if (result.status === 'cardLogin') {
			status = result.status;
			cardList = result.cardList;
            if(browser){
                Cookies.set('hiroba_token', result.token, {path:'/'})
            }
		} else {
			error = result.code;
		}
	}

    async function cardLogin(taikoNumber){
        let result;

        let formData = new FormData();
        formData.append('taikoNumber', taikoNumber);
        try{
            status = 'importing';
            result = await axios({
                method:'post',
                url:'hiroba/api/cardlogin',
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            })
        }
        catch {
			error = 'UNEXPECTED_ERROR';
		}

        result = result.data;
        if (result.status === 'imported') {
			status = result.status;
			cardList = [];
		} else {
			error = result.code;
		}
    }
</script>

{status}
{#if status === 'login'}
	<input type="text" bind:value={logindata.email} />
	<input type="password" bind:value={logindata.password} />
	<button
		on:click={() => {
			hirobaLogin();
		}}>로그인</button
	>
{:else if status === 'cardLogin'}
	{#each cardList as cardData}
		<div>
            <div>{cardData.taikoNumber}</div>
            <div>{cardData.nickname}</div>
            <button on:click={() => {cardLogin(cardData.taikoNumber)}}>선택</button>
        </div>
	{/each}
{/if}
{error}