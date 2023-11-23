<script lang="ts">
    
	import { onDestroy, onMount } from "svelte";
    import HoverPopup from "./hover_popup.svelte";
	import { browser } from "$app/environment";

    export let style:string;
    export let hoverText:string;
    export let showMobile:boolean = false;
    export let width:number;
    export let isMobile:boolean = false;
    export function onResize(){
        width = window.innerWidth;
    }

    export let showPopup = false;

    onMount(() => {
        if(browser){
            width = window.innerWidth;
            window.addEventListener('resize', onResize);
        }
    })
    onDestroy(() => {
        if(browser){
            window.removeEventListener('resize', onResize);
        }
    })
    $:if(width >= 768){
        isMobile = false;
    }
    else{
        isMobile = true;
    }
</script>

<div {style} on:mouseenter={()=>{showPopup = true}} on:mouseleave={()=>{showPopup = false}} role="tooltip" class="hover-base">
    <slot/>
    {#if isMobile && showMobile}
        {hoverText}
    {/if}
    {#if showPopup && isMobile === false}
    <HoverPopup {hoverText}/>
    {/if}
</div>

<style>
    .hover-base{
        position: relative;
    }
</style>