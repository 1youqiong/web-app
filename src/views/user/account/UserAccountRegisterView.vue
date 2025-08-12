<template>
    <Card>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="confirm_password" class="form-label">确认密码</label>
                        <input v-model="confirm_password" type="password" class="form-control" id="confirm_password"
                            placeholder="请确认密码">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
            </div>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import router from '@/router';
import $ from 'jquery';

export default {
    name: "UserAccountRegisterView",
    components: {
        Card,
    },
    setup() {
        const store = useStore();
        let username = ref("");
        let password = ref("");
        let confirm_password = ref("");
        let error_message = ref("");

        const register = () => {
            $.ajax({
                url: "http://192.168.217.136:8080/user/account/register/",
                type: "POST",
                data: {
                    username:username.value,
                    password:password.value,
                    confirm_password:confirm_password.value,
                },
                success(resp) {
                    if(resp.error_message==="success"){
                        router.push({name:'user_account_login'});
                    }else{
                        error_message.value=resp.error_message;
                    }
                },
                error(resp) {
                    error_message.value=resp.error_message;
                }
            });
        }


        return {
            username,
            password,
            confirm_password,
            error_message,
            register,
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
}

div.error-message {
    display: flex;
    justify-content: left;
    font-size: 12px;
    color: red;
}
</style>