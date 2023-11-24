<script lang="ts">
	import LevelGradeHead from "./levelGrade-head.svelte";
    import LevelGradeClearBody from "./levelGrade-clear-body.svelte";

	export let setting:LevelGradeSetting;
	export let levelGradeData:any;
	export let songs:any;
	export let clearData:any;

    interface LevelGradeSetting {
		type: 'donderfull' | 'clear' | 'full';
		level: number;
	}
</script>

<div class="levelgrade">
	<LevelGradeHead {setting}/>
	{#if setting.type === 'clear'}
		<LevelGradeClearBody {levelGradeData} {songs} level={Number(setting.level)} {clearData}/>
	{/if}
</div>

<style>
	.levelgrade {
		width: 1300px;
		max-width: 100%;

		box-sizing: content-box;

		display:flex;
		flex-direction: column;
		align-items: center;
	}
</style>
