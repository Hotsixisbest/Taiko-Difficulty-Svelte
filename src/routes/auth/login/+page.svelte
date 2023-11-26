<script>
	export let form;
</script>

<div class="form-wrapper">
	<!--경고-->
	{#if form?.code}
		<div class="alert">
			{#if form.code === 'NO_ID_PASSWORD'}
				아이디와 비밀번호를 입력해주세요.
			{:else if form.code === 'INVALID_ID_PASSWORD'}
				아이디와 비밀번호를 확인해주세요.
			{:else if form.code === 'DATABASE_ERROR'}
				알 수 없는 오류가 발생했습니다.
			{:else}
				{form.code}
			{/if}
		</div>
	{/if}
	<!--로그인-->
	<span class="not-hiroba">※동더히로바가 아닌 본 사이트의 아이디와 비밀번호를 입력해주세요.</span>
	<form method="post">
		<input type="text" name="id" placeholder="아이디" />
		<input type="password" name="password" placeholder="비밀번호" />
		<input type="submit" value="로그인" />
		<span class="register">회원이 아니신가요? <a href="/auth/register">회원가입하기</a></span>
	</form>
</div>

<style>
	:global(body) {
		background-color: #e4e4e4;
	}

	.form-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		width: 400px;
		max-width: 100%;
		height: 300px;

		background-color: white;

		border-radius: 5px;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	input {
		width: 300px;
		max-width: 100%;
		height: 40px;

		outline: 0;
		border: 0;

		border-radius: 5px;

		color: black;
		font-weight: bold;

		background-color: #e4e4e4;
	}

	input[type='text'] {
		margin-top: 40px;
	}

	input[type='password'] {
		margin-top: 20px;
	}

	input[type='submit'] {
		margin-top: 20px;
		cursor: pointer;

		font-weight: bold;
		color: white;

		background-color: #586e83;
	}

	span.not-hiroba {
		margin-top: 15px;
		margin-bottom: 15px;
	}

	span.register {
		margin-top: 30px;
	}

	a {
		color: #3b71ca;
	}

	.alert {
		width: 400px;
		height: 50px;

		border-radius: 5px;

		margin-top: 10px;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: rgb(252, 147, 147);
	}
</style>
