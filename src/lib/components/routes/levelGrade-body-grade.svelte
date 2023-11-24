<script lang="ts">
    import LevelGradeBodyCell from "./levelGrade-body-cell.svelte";

    export let gradeName:string;
    export let songDatas:any;
    export let color:string;
    export let clearData:any[];

    function getClearData(songData:any){
        if(songData.isUra){
            return clearData?.find(e => e.title === songData.realName)?.difficulty?.find((e:any) => e.difficulty === 'ura') || clearData?.find(e => e.title === songData.realName.replace("'", '’'))?.difficulty?.find((e:any) => e.difficulty === 'ura')
        }
        else{
            return clearData?.find(e => e.title === songData.realName)?.difficulty?.find((e:any) => e.difficulty === 'oni') || clearData?.find(e => e.title === songData.realName.replace("'", '’'))?.difficulty?.find((e:any) => e.difficulty === 'oni')
        }
    }
</script>

<div class="grade">
    <div class="grade-head" style={`background-color:${color};`}>
        <span>{gradeName}</span>
    </div>
    <div class="grade-body">
        {#each songDatas as songData}
        <LevelGradeBodyCell {songData} clearData={getClearData(songData)}/>
        {/each}
    </div>
</div>

<style>
    .grade{
        width:100%;

        display:flex;
        flex-direction: column;
        align-items: center;
    }

    .grade-head{
        width:100%;
        height:72px;

        font-family: 'SDKukDeTopokki';
        font-weight: bold;
        font-size: 30px;
        color:white;

        background-color: purple;

        border-radius: 10px;

        display:flex;
        justify-content: center;
        align-items: center;
    }

    .grade-head span{
        transform: translateY(-5px);
    }

    .grade-body{
        width:calc(100% - 10px);

        display:grid;
        grid-template-columns: repeat(auto-fill, 225px);
        grid-auto-flow: row;
        justify-content: center;
        row-gap: 8px;
        column-gap: 12px;

        transform: translateY(-20px);
    }

    @media only screen and (max-width: 767px) {
		.grade-body {
			display:flex;
            flex-direction: column;
            align-items: center;
		}
	}
</style>