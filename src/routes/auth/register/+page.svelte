<script>
    export let form;
</script>

{form?.result}
{form?.code}
<form method="post">
    <input type="text" name="id">
    <input type="password" name="password">
    <input type="submit">
</form>