<template>
    <div class="headr_box">
        <div class="logo_box">
            <img src="static/images/logo.png">
        </div>
        <div class="logout" @click="logout()">
            <img src="static/images/logout.png">
            <span>退出</span>
        </div>
    </div>
</template>
<script>
export default {
    data:function(){
        return {

        }
    },
    methods:{
        logout(){
            sessionStorage.removeItem('ms_username')
            this.$router.push('/login');
        }
    }
}
</script>
<style scoped>
    .headr_box{
        width: 100%;
        height: 88px;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
    }
    .logo_box{
        width: 270px;
        height: 88px;
        padding: 19px 0 0 60px;
        box-sizing: border-box;
    }
    .logout{
        padding-right: 60px;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .logout span{
        font-size: 18px;
        color: #3f3f3f;
        margin-left: 10px;
    }
</style>


