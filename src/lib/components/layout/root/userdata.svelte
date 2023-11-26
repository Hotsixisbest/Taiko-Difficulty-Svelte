<script>
	import { getContext } from "svelte";

    let user = getContext('user')

    let show = false;

    function toggle(){
        if(show === true){
            show = false;
        }
        else{
            show = true;
        }
    }
</script>

<div class="wrapper">
    <button on:click={toggle}>
        <img src="/assets/logo/user.svg" alt="회원"/>
    </button>
    {#if show}
        <div class="data-wrapper">
            <div class="data-id">
                {$user.id}
            </div>
            <form action="/auth/logout" method="post">
                <input type="submit" value="로그아웃"/>
            </form>
            <!--<a href="/auth/withdraw">회원 탈퇴</a>-->
        </div>
    {/if}
</div>

<style>
    .wrapper{
        width:30px;
        height:30px;
        
        position: relative;
    }

    button{
        width:100%;
        height:100%;
        background: none;
        outline: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    img{
        width:100%;
        height:100%;
    }

    .data-wrapper{
        min-width:120px;

        background-color: white;
        border:1px solid black;

        position: absolute;
        left:50%;
        top:100%;
        transform: translateX(-50%);
        z-index: 2;

        display:flex;
        flex-direction: column;
        align-items: center;
    }

    @media only screen and (max-width:767px){
        .data-wrapper{
            left:100%;
            transform: translateX(-100%);
        }
    }

    input[type="submit"]{
        background-color: white;
        cursor: pointer;
        border:0;
        outline:0;

        font-size: 16px;
    }
</style>