<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.loser==='all'">
            Draw
        </div>
        <div class="result-board-text" v-else-if="$store.state.pk.loser==='a' && $store.state.pk.a_id===parseInt($store.state.user.id)">
            Lose
        </div>
        <div class="result-board-text" v-else-if="$store.state.pk.loser==='b' && $store.state.pk.b_id===parseInt($store.state.user.id)">
            Lose
        </div>
        <div class="result-board-text" v-else>
            Win
        </div>
        <button @click="restart" type="button" class="btn btn-warning btn-lg result-board-btn">确定</button>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default{
    name:"ResultBoard",
    setup(){
        const store=useStore();
        const restart=()=>{
            store.commit("updateStatus","matching");
            store.commit("updateLoser","none");
            store.commit("updateOpponent",{
                username:"我的对手",
                photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            });
        }

        return {
            restart,
        }
    }
}
</script>

<style scoped>
div.result-board{
    width: 30vw;
    height: 30vh;
    background-color: rgba(50,50,50,0.5);
    position: absolute;
    top:30vh;
    left: 35vw;
    border-radius: 5px;
}
div.result-board-text{
    text-align: center;
    padding-top: 5vh;
    font-size: 40px;
    font-weight: bold;
    font-family: initial;
    color: white;
}

.result-board-btn{
    text-align: center;
    margin-top:5vh;
}
</style>