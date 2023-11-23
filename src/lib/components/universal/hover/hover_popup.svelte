<script lang="ts">
    export let hoverText:string;
</script>

<div class="hover-popup">
    <div class="text">{hoverText}</div>
    <div class="speech-triangle"/>
</div>

<style>
    .hover-popup{
        background-color: white;
        width:max-content;

        display:flex;
        flex-direction: row;
        
        position: absolute;
        top:calc(100% + 5px);
        left:50%;
        transform: translateX(-50%);
        z-index: 100;

        font-size: 14px;
    }

    .text{
        position:relative;
        z-index: 2;

    }

    .speech-triangle{
        width:10px;
        height: 10px;

        position:absolute;
        top:-4px;
        left:50%;
        transform-origin: center;
        transform: translateX(-50%) rotate(45deg);
        z-index: 1;

        background-color: white;
    }
</style>