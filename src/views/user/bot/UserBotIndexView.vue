<template>
    <div class="container">
        <div class="row" style="margin-top: 20px;">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" style="width: 100%;"></img>
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card">
                    <div class="card-header">
                        <span style="font-size: 130%;">我的bot</span>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                            data-bs-target="#add-bot-btn">创建bot</button>

                        <!-- Modal -->
                        <div class="modal fade modal-dialog modal-xl" id="add-bot-btn" data-bs-backdrop="static"
                            data-bs-keyboard="false" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">创建bot</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label for="title" class="form-label">名称</label>
                                            <input v-model="botadd.title" type="text" class="form-control" id="title"
                                                placeholder="请输入名称">
                                        </div>
                                        <div class="mb-3">
                                            <label for="description" class="form-label">描述</label>
                                            <textarea v-model="botadd.description" class="form-control" id="description"
                                                rows="3" placeholder="请输入描述"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="content" class="form-label">代码</label>
                                            <VAceEditor v-model:value="botadd.content" @init="editorInit" lang="c_cpp"
                                                theme="textmate" style="height: 150px" />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="error-message">{{ botadd.error_message }}</div>
                                        <button @click="add_bot" type="button" class="btn btn-primary">创建</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in bots" :key="bot.id">
                                    <th>{{ bot.title }}</th>
                                    <th>{{ bot.createtime }}</th>
                                    <th>
                                        <button type="button" class="btn btn-secondary" style="margin-right: 15px;"
                                            data-bs-toggle="modal" :data-bs-target="'#update-bot-' + bot.id">修改</button>
                                        <button @click="remove_bot(bot)" type="button"
                                            class="btn btn-danger">删除</button>

                                        <!-- Modal -->
                                        <div class="modal fade modal-dialog modal-xl" :id="'update-bot-' + bot.id"
                                            data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">修改bot</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-3">
                                                            <label for="title" class="form-label">名称</label>
                                                            <input v-model="bot.title" type="text" class="form-control"
                                                                id="title" placeholder="请输入名称">
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="description" class="form-label">描述</label>
                                                            <textarea v-model="bot.description" class="form-control"
                                                                id="description" rows="3"
                                                                placeholder="请输入描述"></textarea>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label for="content" class="form-label">代码</label>
                                                            <VAceEditor v-model:value="bot.content"
                                                                @init="editorInit" lang="c_cpp" theme="textmate"
                                                                style="height: 150px" />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="error-message">{{ botadd.error_message }}</div>
                                                        <button type="button" class="btn btn-primary"
                                                            @click="update_bot(bot)">保存修改</button>
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">取消</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap';
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

export default {
    name: "UserBotIndexView",
    components: {
        Card,
        VAceEditor,
    },
    setup() {
        ace.config.set(
            "basePath",
            "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/");


        const store = useStore();
        let bots = ref([]);
        const botadd = reactive({
            title: "",
            description: "",
            content: "",
            error_message: "",
        });

        const refresh_bots = () => {
            $.ajax({
                url: "http://192.168.217.136:8080/user/bot/getlist/",
                type: "GET",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    bots.value = resp;
                },
                error(resp) {
                    console.log(resp);
                }
            });
        };

        refresh_bots();

        const add_bot = () => {
            botadd.error_message = "";
            $.ajax({
                url: "http://192.168.217.136:8080/user/bot/add/",
                type: "POST",
                data: {
                    title: botadd.title,
                    description: botadd.description,
                    content: botadd.content,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        botadd.title = "";
                        botadd.description = "";
                        botadd.content = "";
                        refresh_bots();
                        Modal.getInstance("#add-bot-btn").hide();
                        console.log(resp);
                    } else {
                        botadd.error_message = resp.error_message;
                    }
                },
                error(resp) {
                    botadd.error_message = resp.error_message;
                }
            });

        }

        const remove_bot = (bot) => {
            $.ajax({
                url: "http://192.168.217.136:8080/user/bot/remove/",
                type: "POST",
                data: {
                    id: bot.id,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        refresh_bots();
                    }
                },
            });
        }

        const update_bot = (bot) => {
            botadd.error_message = "";
            $.ajax({
                url: "http://192.168.217.136:8080/user/bot/update/",
                type: "POST",
                data: {
                    id: bot.id,
                    title: bot.title,
                    description: bot.description,
                    content: bot.content,
                },
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        Modal.getInstance("#update-bot-" + bot.id).hide();
                        refresh_bots();
                    } else {
                        botadd.error_message = resp.error_message;
                    }
                },
                error(resp) {
                    botadd.error_message = resp.error_message;
                }
            });
        }

        return {
            bots,
            botadd,
            add_bot,
            remove_bot,
            update_bot,
        }

    }
}
</script>

<style scoped>
div.error-message {
    color: red;
}
</style>