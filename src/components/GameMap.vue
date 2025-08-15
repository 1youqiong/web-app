<template>
    <div ref="parent" class="gamemap">
        <canvas ref="ctx" tabindex="0"></canvas>
    </div>
</template>

<script>
import { GameMap } from '@/assets/script/GameMap';
import { ref,onMounted } from 'vue';
import { useStore } from 'vuex';


export default{
    name:"GameMap",
    setup(){
        const store=useStore();
        let ctx=ref(null);
        let parent=ref(null);

        onMounted(()=>{
            store.commit("updateGameMap",new GameMap(ctx.value.getContext('2d'),parent.value,store));
        });

        return {
            ctx,
            parent,
        }
    }
}
</script>

<style scoped>
div.gamemap{
    width: 100%;
    height: 100%;
}
</style>