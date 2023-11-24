<script>
	import Header from '$lib/components/layout/root/header.svelte';
	import Hover from '$lib/components/universal/hover/hover.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

    export let data;

    let user = writable({logined:false});
    setContext('user', user);
    $:if(data?.id){
        $user.logined = true;
        $user.id = data.id;
    }
</script>

<Header>
    <!--right-->
    <div slot="left" class="left">

    </div>
    <!--left-->
	<div slot="right" class="right">
        {#if $user.logined}
            <img src="/assets/logo/user.svg" style="width:30px;height:30px;" alt="로그인" />
            {$user.id}
        {:else}
		<Hover hoverText="로그인" style="width:30px;height:30px;">
			<a href="/auth/login" class="header-link">
                <img src="/assets/logo/user.svg" style="width:30px;height:30px;" alt="로그인" />
            </a>
		</Hover>

        {/if}
        <a href="/hiroba" style="padding-right:20px" class="header-link">동더히로바 데이터 가져오기</a>
	</div>
</Header>
<slot />

<style>
    a.header-link{
        font-weight: bold;
    }

    .left{
        width:50%;
        
        flex-direction: row;
    }

    .right{
        width:50%;
        flex-direction: row-reverse;
    }

    @media only screen and (min-width:768px){
        .left{
            padding-left:100px;
        }
        .right{
            padding-right: 100px;
        }
    }

    .left,.right{
        height:100%;
        display: flex;
        align-items: center;
    }
</style>
