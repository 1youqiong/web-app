<template>
    <div class="matchground">
        <div class="row">
            <div class="col-6">
                <div class="user-photo">
                    <img :src="$store.state.user.photo" alt="">
                </div>
                <div class="user-username">{{ $store.state.user.username }}</div>
            </div>
            <div class="col-6">
                <div class="user-photo">
                    <img :src="$store.state.pk.opponent_photo" alt="">
                </div>
                <div class="user-username">{{ $store.state.pk.opponent_username }}</div>
            </div>
            <div class="col-12" style="padding-top: 15vh;text-align: center;">
                <button @click="click_match_btn" type="button" class="btn btn-warning btn-lg">{{ match_btn_info }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default{
    name:"PlayGround",
    components:{
    },
    setup(){
        let match_btn_info=ref("开始匹配");
        const store=useStore();

        const click_match_btn=()=>{
            if(match_btn_info.value==="开始匹配"){
                match_btn_info.value="取消匹配";
                store.state.pk.socket.send(JSON.stringify({
                    event:"start-matching",
                }));
            }else{
                match_btn_info.value="开始匹配";
                store.state.pk.socket.send(JSON.stringify({
                    event:"stop-matching",
                }));
            }
        }

        return {
            match_btn_info,
            click_match_btn,
        }
    }
}
</script>

<style scoped>
div.matchground{
    border-radius: 5px;
    background-color: rgba(50,50,50,0.5);
    width: 60vw;
    height: 70vh;
    margin:40px auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.user-photo{
    text-align: center;
}

div.user-photo>img{
    border-radius: 50%;
    width: 15vw;
}
div.user-username{
    text-align: center;
    font-size:24px;
    font-weight: bold;
    padding-top: 4vh;
}
</style>