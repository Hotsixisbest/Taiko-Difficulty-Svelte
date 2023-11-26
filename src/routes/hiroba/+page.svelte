<script>
	import { browser } from '$app/environment';
	import Cookies from 'js-cookie';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	export let data;
	let status = data.status;
	let error;

	$: if (status === 'imported') {
		goto('/');
	}

	let logindata = {
		email: '',
		password: ''
	};

	let cardList = [];
	if (data.cardList) {
		cardList = data.cardList;
	}

	async function hirobaLogin() {
		error = undefined;

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
				headers: { 'Content-Type': 'multipart/form-data' }
			});
		} catch {
			error = 'UNEXPECTED_ERROR';
		}

		result = result.data;
		status = result.status;

		if (result.status === 'cardLogin') {
			status = result.status;
			cardList = result.cardList;
			if (browser) {
				Cookies.set('hiroba_token', result.token, { path: '/' });
			}
		} else {
			error = result.code;
		}
	}

	async function cardLogin(taikoNumber) {
		error = undefined;

		let result;

		let formData = new FormData();
		formData.append('taikoNumber', taikoNumber);
		try {
			status = 'importing';
			result = await axios({
				method: 'post',
				url: 'hiroba/api/cardlogin',
				data: formData,
				headers: { 'Content-Type': 'multipart/form-data' }
			});
		} catch {
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

{#if error}
	<div class="alert-wrapper">
		<div class="alert">
			{#if error === 'NO_ID_PASSWORD'}
				이메일과 비밀번호를 입력해주세요.
			{:else if error === 'CHECK_ID_PASSWORD'}
				이메일과 비밀번호를 확인해주세요.
			{:else}
				알 수 없는 에러가 발생했습니다.
			{/if}
		</div>
	</div>
{/if}
{#if status === 'login'}
	<div class="login-wrapper">
		<input type="text" bind:value={logindata.email} placeholder="동더히로바 이메일" />
		<input type="password" bind:value={logindata.password} placeholder="동더히로바 비밀번호" />
		<button
			on:click={() => {
				hirobaLogin();
			}}>로그인</button
		>
	</div>
{:else if status === 'cardLogin'}
	<div class="card-wrapper">
		{#each cardList as cardData}
			<div class="card">
				<div>북 번호: {cardData.taikoNumber}</div>
				<div>닉네임: {cardData.nickname}</div>
				<img src={cardData.myDon} alt="mydon" />
				<button
					on:click={() => {
						cardLogin(cardData.taikoNumber);
					}}>선택</button
				>
			</div>
		{/each}
	</div>
{:else if status === 'logining'}
	<div class="loading-wrapper">
		로그인 중...
		<img src="/assets/logo/loading.svg" alt="loading" />
	</div>
{:else if status === 'importing'}
	<div class="loading-wrapper">
		클리어 데이터를 불러오는 중...
		<img src="/assets/logo/loading.svg" alt="loading" />
	</div>
{/if}

<style>
	.login-wrapper {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-wrapper input {
		width: 300px;
		height: 40px;
	}

	.alert-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.alert {
		width: 400px;
		height: 50px;

		border-radius: 5px;

		margin-top: 10px;
		margin-bottom: 15px;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: rgb(252, 147, 147);
	}

	.card-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card {
		width: 300px;
		height: 300px;

		background-color: rgb(255, 211, 211);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.card img {
		width: 150px;
		height: 150px;
	}

	.card button {
		width: 200px;
		height: 40px;

		border: 0;
		outline: 0;

		border-radius: 5px;

		cursor: pointer;
	}

	.loading-wrapper {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
