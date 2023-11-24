<script>
    export let form;
</script>

{#if !form?.result }
    {form?.code}
{/if}
<form method="post">
    <input type="text" name="id">
    <input type="password" name="password">
    <input type="submit">
</form>

<a href="/auth/register">회원가입하기</a>