<script lang="ts">
    import LevelGrade from "$lib/components/routes/levelGrade.svelte";
    export let data;

    export let level:any = "10";
</script>

<main>
    <select bind:value={level}>
        <option value="10">10레벨</option>
        <option value="9">9레벨</option>
        <option value="8">8레벨</option>
        <option value="7">7레벨</option>
        <option value="6">6레벨</option>
    </select>
    <LevelGrade setting={{type:'clear', level:level}} levelGradeData={data.levelGradeClearData} songs={data.songs}/>
</main>

<style>
    main{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
</style>