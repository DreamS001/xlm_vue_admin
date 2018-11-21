<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#3f3f3f"
            text-color="#ffffff" active-text-color="##fff"   unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" style="padding-left:60px;">
                        <template slot="title">
                            <!-- <i :class="item.icon"></i> -->
                            <img :src="item.img" />
                            <span slot="title" style=" font-size:18px;margin-left:20px;">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" style="padding-left:60px;">
                        <!-- <i :class="item.icon"></i> -->
                        <img :src="item.img" />
                        <span slot="title" style=" font-size:18px;margin-left:20px;">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        img: 'static/images/xxgl.png',
                        index: 'management',
                        title: '信息管理'
                    },
                    {
                        img: 'static/images/zjyh.png',
                        index: 'winuser',
                        title: '中奖用户'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 88px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 270px;
        padding-top: 60px;
        box-sizing: border-box;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-item.is-active {
        background-color: rgba(237,237,237,.1) !important;
        color: #fff !important;
    }
</style>