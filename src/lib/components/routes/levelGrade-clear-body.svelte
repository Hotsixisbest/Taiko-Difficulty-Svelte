<script>
	import LevelGradeBodyGrade from './levelGrade-body-grade.svelte';

	export let songs;
	export let level;
	export let levelGradeData;
    let allGradeData = parseGradeData(levelGradeData);

	let grades = [];
	let gradeData = [];
	$: {
		gradeData = allGradeData.filter((e) => e.level === level);
		gradeData.sort((a, b) => {return b.order - a.order})
		if (level === 10) {
			grades = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9];
		} else {
			grades = [6, 5, 4, 3, 2, 1, 0, 9];
		}
	}

	function parseGradeData(levelGradeData) {
		let allGradeData = [];
		levelGradeData.forEach((e) => {
			if (!/(.*?)(裏)/.test(e.jpnName)) {
				let genre = e.genre
					.split('|')
					.map((e) => {
						return Number(e);
					})
					.filter((e) => e !== 0);
				e.grade.split('|').forEach((el, i) => {
					if (el) {
						if (i === 0) {
							var isUra = false;
						} else {
							var isUra = true;
						}

						let level = Number(e.level.split('|')[i + 3]);
						let realName = e.jpnName.replace(/【..】/, '').trim();
						let korName = songs.find((e) => e.jpnName === realName)?.alias;
						if (korName == e.jpnName) {
							korName == '';
						}
						let parsed = parseSongData(el, e.jpnName, korName, genre, isUra, level, realName);

						allGradeData.push(parsed);
					}
				});
			}
		});

		function parseSongData(code, jpnName, korName, genre, isUra, level, realName) {
			let grade = Number(code.substring(0, 2));
			let order = code.substring(2, 6);
			let options = code.substring(6, 10);

			let option = [];
			if (/1../.test(options)) {
				option.push('gaeincha');
			}
			if (/.1./.test(options)) {
				option.push('firstlook');
			}
			if (/..1/.test(options)) {
				option.push('fullHard');
			}

			return {
				level,
				grade,
				order: Number(order),
				songData: {
					realName,
					jpnName,
					korName,
					genre,
					isUra,
					option
				}
			};
		}
		return allGradeData;
	}

	function getGradeNameClear(grade) {
		switch (grade) {
			case 9: {
				return '개인차';
			}
			case 8: {
				return '졸업+';
			}
			case 7: {
				return '졸업';
			}
			case 6: {
				return '최상';
			}
			case 5: {
				return '상';
			}
			case 4: {
				return '중상';
			}
			case 3: {
				return '중';
			}
			case 2: {
				return '중하';
			}
			case 1: {
				return '하';
			}
			case 0: {
				return '최하';
			}
		}
	}

	function getGradeColor(grade){
		switch(grade){
			case 8:{
				return '#B93FEA';
			}
			case 7:{
				return '#E8348F';
			}
			case 6:{
				return '#EF3059';
			}
			case 5:{
				return '#EB7535';
			}
			case 4:{
				return '#E6B439';
			}
			case 3:{
				return '#60CE37';
			}
			case 2:{
				return '#37B0CB';
			}
			case 1:{
				return '#4161D8';
			}
			case 0:{
				return '#7F7F7F';
			}
			case 9:{
				return '#C9C9C9';
			}
		}
	}
</script>

<div class="body">
	{#each grades as grade}
		<LevelGradeBodyGrade
			gradeName={getGradeNameClear(grade)}
			songDatas={gradeData
				.filter((e) => e.grade === grade)
				.map((e) => {
					return e.songData;
				})}
			color={getGradeColor(grade)}
		/>
	{/each}
</div>

<style>
	.body{
		width: calc(100% - 50px);
	}

	@media only screen and (max-width: 767px) {
		.body {
			width:100%;
		}
	}
</style>
