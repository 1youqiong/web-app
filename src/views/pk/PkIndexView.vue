<template>
    <PlayGround v-if="$store.state.pk.status==='playing'" />
    <MatchGround v-if="$store.state.pk.status==='matching'" />
    <ResultBoard v-if="$store.state.pk.loser!=='none'"/>
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import { onMounted,onUnmounted } from 'vue';
import { useStore } from 'vuex';
import MatchGround from '@/components/MatchGround.vue';
import ResultBoard from '@/components/ResultBoard.vue';

export default{
    name:"PkIndexView",
    components:{
        PlayGround,
        MatchGround,
        ResultBoard,
    },
    setup(){
        const store=useStore();
        const socketUrl=`ws://192.168.217.136:8080/websocket/${store.state.user.token}/`;
        let socket=null;

        store.commit("updateOpponent",{
                username:"我的对手",
                photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            });
    
        //组件被挂载时被执行
        onMounted(()=>{
            socket=new WebSocket(socketUrl);

            socket.onopen=()=>{
                console.log("connected!");
                store.commit("updateSocket",socket); //别忘了连接成功后将该socket存下来
            }

            socket.onmessage= msg =>{
                const data=JSON.parse(msg.data);
                console.log(data);
                if(data.event==="matched"){
                    store.commit("updateOpponent",{
                        username:data.opponent_username,
                        photo:data.opponent_photo,
                    });

                    setTimeout(()=>{
                        store.commit("updateStatus","playing");
                    },2000);

                    store.commit("updateGame",data.game);
                }else if(data.event==="move"){
                    const GameMap=store.state.pk.GameMap;
                    const [snake0,snake1]=GameMap.snakes;
                    snake0.set_direction(data.a_direction);
                    snake1.set_direction(data.b_direction);
                }else if(data.event==="result"){
                    const GameMap=store.state.pk.GameMap;
                    const [snake0,snake1]=GameMap.snakes;
                    if(data.loser==="all" || data.loser==="a"){
                        snake0.status="die";
                    }
                    if(data.loser==="all" || data.loser==="b"){
                        snake1.status="die";
                    }
                    store.commit("updateLoser",data.loser);
                }
            }

            socket.onclose=()=>{
                console.log("disconnected!");
                store.commit("updateStatus","matching");
            }
        });

        onUnmounted(()=>{
            socket.close();
        });
    }
}
</script>

<style scoped>
</style>