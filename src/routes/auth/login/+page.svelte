<script>
    export let form;
</script>

{#if !form?.result }
    {form?.code}
{/if}
<form method="post">
    <input type="text" name="id" placeholder="아이디">
    <input type="password" name="password" placeholder="비밀번호">
    <input type="submit">
</form>

<a href="/auth/register">회원가입하기</a>