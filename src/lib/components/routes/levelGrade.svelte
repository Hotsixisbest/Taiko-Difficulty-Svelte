<script lang="ts">
	import LevelGradeHead from "./levelGrade-head.svelte";
    import LevelGradeBody from "./levelGrade-body.svelte";

	export let setting:LevelGradeSetting;

    interface LevelGradeSetting {
		type: 'donderfull' | 'clear' | 'full';
		level: number;
	}
</script>

<div class="levelgrade">
	<LevelGradeHead {setting}/>
	<LevelGradeBody/>
</div>

<style>
	.levelgrade {
		width: 1300px;
		max-width: 100%;

		box-sizing: content-box;
		border: 1px solid black;
	}
</style>
