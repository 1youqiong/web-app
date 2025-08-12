import NotFoundView from '@/views/error/NotFoundView.vue';
import PkIndexView from '@/views/pk/PkIndexView.vue';
import RankListIndexView from '@/views/ranklist/RankListIndexView.vue';
import RecordIndexView from '@/views/record/RecordIndexView.vue';
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView.vue';
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView.vue';
import UserBotIndexView from '@/views/user/bot/UserBotIndexView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path:'/',
    name:"home",
    redirect:"/pk/",
  },
  {
    path:'/pk/',
    name:"pk_index",
    component:PkIndexView,
    meta:{
      requestAuth:true,
    }
  },
  {
    path:'/ranklist/',
    name:"ranklist_index",
    component:RankListIndexView,
    meta:{
      requestAuth:true,
    }
  },
  {
    path:'/record/',
    name:"record_index",
    component:RecordIndexView,
    meta:{
      requestAuth:true,
    }
  },
  {
    path:'/userbot/',
    name:"userbot_index",
    component:UserBotIndexView,
    meta:{
      requestAuth:true,
    }
  },
  {
    path:'/user/account/login/',
    name:"user_account_login",
    component:UserAccountLoginView,
    meta:{
      requestAuth:false,
    }
  },
  {
    path:'/user/account/register/',
    name:"user_account_register",
    component:UserAccountRegisterView,
    meta:{
      requestAuth:false,
    }
  },
  {
    path:'/404/',
    name:"404",
    component:NotFoundView,
    meta:{
      requestAuth:false,
    }
  },
  {
    path:'/:catchAll(.*)',
    redirect:"/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{  //to是要转到页面路由，from是从哪个页面路由来的，next是下一步的操作
  if(to.meta.requestAuth && !store.state.user.is_login){
    next({name:'user_account_login'});
  }else{
    next();
  }
})

export default router
