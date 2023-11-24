<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { tick } from 'svelte';

	export let songData: LevelGradeSongData;
	let jpnName: any;

	export let clearData: any;

	//글씨 크기 조절
	onMount(() => {
		if (browser) {
			window.addEventListener('resize', resizeFont);
		}
	});

	$: if (songData && browser && jpnName?.innerText !== songData.jpnName) {
		tick().then(() => {
			jpnName.style.fontSize = '16px';
			resizeFont();
		});
	}

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', resizeFont);
		}
	});

	function resizeFont() {
		if (window.innerWidth >= 767) {
			if (
				Number(getComputedStyle(jpnName).height.replace('px', '')) > 23.3 &&
				jpnName.style.fontSize !== '13px'
			) {
				jpnName.style.fontSize = '13px';
			}
		} else {
			jpnName.style.fontSize = '16px';
		}
	}
	//글씨 크기 조절

	let url: URL;
	$: {
		url = new URL('http://taikowiki.com/song_detail.php');
		url.searchParams.set('title', songData.realName);
	}

	function getGenreColor(genre: number) {
		switch (genre) {
			case 1: {
				return '#58BEC7';
			}
			case 2: {
				return '#E3B850';
			}
			case 3: {
				return '#E28EC7';
			}
			case 4: {
				return '#A5D1DA';
			}
			case 5: {
				return '#B798D3';
			}
			case 6: {
				return '#41CB76';
			}
			case 7: {
				return '#CBBB4A';
			}
			case 8: {
				return '#EA6C68';
			}
		}
	}

	function getOptionColor(option: string) {
		switch (option) {
			case 'firstlook': {
				return '#32D652';
			}
			case 'gaeincha': {
				return '#EE313C';
			}
			case 'fullHard': {
				return '#B531EF';
			}
		}
	}

	function getCrownImg(clear: string | null) {
		switch (clear) {
			case 'played': {
				return 'https://donderhiroba.jp/image/sp/640/crown_large_0_640.png';
			}
			case 'silver': {
				return 'https://donderhiroba.jp/image/sp/640/crown_large_1_640.png';
			}
			case 'gold': {
				return 'https://donderhiroba.jp/image/sp/640/crown_large_2_640.png';
			}
			case 'donderfull': {
				return 'https://donderhiroba.jp/image/sp/640/crown_large_3_640.png';
			}
		}
	}

	function getBadgeImg(badge: string | null) {
		switch (badge) {
			case 'rainbow': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_8_640.png';
			}
			case 'purple': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_7_640.png';
			}
			case 'pink': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_6_640.png';
			}
			case 'gold': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_5_640.png';
			}
			case 'silver': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_4_640.png';
			}
			case 'bronze': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_3_640.png';
			}
			case 'white': {
				return 'https://donderhiroba.jp/image/sp/640/best_score_rank_2_640.png';
			}
		}
	}

	interface LevelGradeSongData {
		realName: string;
		jpnName: string;
		korName: string;
		genre: number[];
		isUra: boolean;
		option: ('gaeincha' | 'firstlook' | 'fullHard')[];
	}
</script>

<a class="cell" href={url.href}>
	<div class="genre-wrapper">
		{#each songData.genre as genre}
			<div
				class="genre"
				style={`background-color:${getGenreColor(genre)};height:calc( 100% / ${
					songData.genre.length
				} )`}
			/>
		{/each}
	</div>
	<div class="name-wrapper">
		<div class="name-jpn" bind:this={jpnName}>
			{#if songData.isUra}
				<span style="color:#502AD7;">{songData.jpnName}</span>
			{:else}
				<span style="color:#CE0E88;">{songData.jpnName}</span>
			{/if}
		</div>
		<div class="name-kor">
			{songData.korName}
		</div>
	</div>
	<div class="crown-wrapper">
		{#if clearData}
			{#if clearData?.clear?.crown}
				<img style="width:100%;" src={getCrownImg(clearData.clear.crown)} alt="" />
			{/if}
			{#if clearData?.clear?.badge}
				<img style="width:100%;" src={getBadgeImg(clearData.clear.badge)} alt="" />
			{/if}
		{/if}
	</div>
	<div class="option-wrapper">
		{#each songData.option as option}
			<div
				class="option"
				style={`width:calc( 100% / ${songData.option.length}); background-color:${getOptionColor(
					option
				)};`}
			/>
		{/each}
	</div>
</a>

<style>
	.cell {
		width: 225px;
		min-height: 60px;

		background-color: #ededed;

		border-radius: 10px;

		overflow: hidden;

		padding-top: 6px;

		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;

		position: relative;
	}
	@media only screen and (max-width: 767px) {
		.cell {
			width: 100%;
		}
	}

	.genre-wrapper {
		width: 6px;
		height: calc(100% - 20px);

		display: flex;
		flex-direction: column;

		border-radius: 3px;
		overflow: hidden;

		margin-left: 3px;
	}

	@media only screen and (max-width: 767px) {
		.genre-wrapper {
			height: 40px;
		}
	}

	.genre {
		width: 100%;
	}

	.name-wrapper {
		width: calc(100% - 49px);
		height: calc(100% - 6px);

		display: flex;
		flex-direction: column;
		justify-content: center;

		box-sizing: border-box;

		padding-left: 10px;
		padding-right: 2px;
		padding-top: 3px;
		padding-bottom: 5px;
	}

	.name-jpn {
		min-height: 23.2px;
		font-weight: 900;
		font-size: 16px;
	}

	.name-kor {
		font-size: 12px;
		font-family: 'SDKukDeTopokki';
		font-weight: bold;
		margin-top: 4px;
	}

	.crown-wrapper {
		width: 35px;
		height: calc(100% - 6px);

		box-sizing: border-box;
		padding-right: 5px;
	}

	.option-wrapper {
		width: 100%;
		height: 6px;

		display: flex;
		flex-direction: row;
	}

	.option {
		height: 100%;
	}
</style>
