<template>
    <div class="login-wrap">
        <div class="admin_box">
            <div class="ms-title">后台管理系统</div>
            <div class="ms-login">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                console.log(this.ruleForm.username);
                console.log(this.ruleForm.password);   
                let params={
                    userName:this.ruleForm.username,
                    userPassword:this.ruleForm.password
                }
                // sessionStorage.setItem('ms_username',this.ruleForm.username);
                // this.$router.replace('/')
                this.$http.post("/race/login",qs.stringify(params)).then((res) => {
                     console.log(res);
                     if(res.data.code==200){
                        sessionStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.replace('/')
                     }else{
                         alert(res.data.msg)
                     }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url(../../static/images/login_xlm.png) no-repeat;
        background-size: 100% 100%;
    }
    .admin_box{
        width: 29%;
        height: 427px;
        position: absolute;
        top: 30.2%;
        right: 18.75%;
    }
    .ms-title{
        /* position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px; */
        height: 15.6%;
        line-height: 15.6%;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        /* position: absolute;
        left:50%;
        top:50%; */
        width:100%;
        height:84.3%;
        /* margin:-150px 0 0 -190px;
        padding:40px; */
        padding: 19.6% 19.6%;
        box-sizing: border-box;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
        margin-top: 20%;
        background: linear-gradient(0deg, 
		#2da7b7 0%, 
		#70cac2 100%);
	    border-radius: 4px;
    }
    .login-btn button{
        width:100%;
        height:36px;
        background: linear-gradient(0deg, 
		#2da7b7 0%, 
        #70cac2 100%);
        border-color:#70cac2;
    }
</style>
