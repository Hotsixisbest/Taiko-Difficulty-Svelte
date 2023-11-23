<script lang="ts">
    export let setting:LevelGradeSetting;
    export let backgroundColor:string = 'silver';

    $:if(setting.type === 'clear'){
        backgroundColor = 'linear-gradient(90deg, rgba(192,224,224,1) 0%, rgba(154,195,195,1) 50%, rgba(192,224,224,1) 100%);';
    }
    else if(setting.type === 'full'){
        backgroundColor = 'linear-gradient(90deg, rgba(255,242,175,1) 0%, rgba(255,229,119,1) 50%, rgba(255,186,0,1) 100%);';
    }
    else{
        backgroundColor = `linear-gradient(90deg, rgba(255,67,118,1) 0%, rgba(255,244,86,1) 34%, rgba(103,221,255,1) 73%, rgba(179,114,255,1) 100%);`
    };

    interface LevelGradeSetting {
		type: 'donderfull' | 'clear' | 'full';
		level: number;
	}
</script>

<div class="head" style={`background:${backgroundColor};`}>
    {#if setting.type === 'clear'}
        클리어 서열표
    {:else if setting.type === 'full'}
        풀콤보 서열표
    {:else if setting.type === 'donderfull'}
        전량 서열표
    {/if}
    ★{setting.level}
</div>

<style>
    

	.head {
		width: 100%;
		height: 80px;

		background-color: #cf4844;

		display: flex;
		flex-direction: row;
		align-items: center;

		border-radius: 15px;
		box-sizing: border-box;

		font-family: 'SDKukDeTopokki';
		font-size: 30px;
		font-weight: bold;

		padding-top: 8px;
	}

	@media only screen and (max-width: 767px) {
		.head {
			justify-content: center;
		}
	}
	@media only screen and (min-width: 768px) {
		.head {
			justify-content: left;
			padding-left: 40px;
		}
	}
</style>