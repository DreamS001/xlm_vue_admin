<template>
    <div class="management_box">
        <div class="management_title">
            <div class="left_box">中奖用户</div>
        </div>
        
        <div class="table_box">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="tableHeaderColor" :cell-style="tableRow">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <!-- <el-table-column fixed="right" label="操作" style="display:none;">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small" style="color:#333333;font-size:14px;">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>

        <!-- <div class="block pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="10" layout="slot, prev, pager, next, jumper"
            :small="true" :total="40">
                <span>第{{start}} / {{total}}页</span>
            </el-pagination>
        </div> -->
        
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [],
        // currentPage1: 4,
        // start:1,//当前页数
        // total:0,//总页数
      }
    },
    created(){
        this.ifLogin();
        this.getData();
    },
    methods: {
        //判断是否登录
        ifLogin(){
            let username = sessionStorage.getItem('ms_username');
            console.log(username)
            if(username==null){
                this.$router.replace('/login')
            }
        },
        // 修改table header的背景色
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color: #d2f4f9;font-weight: 500;text-align:center;'
            }else{
                return 'text-align:center;'
            }
        },
        tableRow({ row, column, rowIndex, columnIndex }) {
            return 'text-align:center;'
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //获取信息
        getData(){
            this.$http.get("/race/prize/find").then((res) => {
                    console.log(res);

                    if(res.data.code==200){
                        this.tableData=res.data.data;
                    }else{
                        alert(res.data.msg)
                    }
            }).catch((err)=>{
                console.log(err)
            })
        },
    }
}
</script>

<style scoped>
    .management_box{
        width: 100%;
        height: 100%;
        background: #FFF;
    }
    .management_title{
        width: 100%;
        height: 58px;
        border-bottom: 1px solid #dce0e2;
        display: flex;
        justify-content: space-between;
    }
    .left_box{
        width: 130px;
        height: 100%;
        text-align: center;
        line-height: 58px;
        font-size: 16px;
        color: #353535;
    }
    .right_box{
        width: 220px;
        height: 100%;
        padding-right: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right_box > div{
        width: 100px;
        height: 34px;
        border-radius: 17px;
        border: solid 1px #2da7b7;
        padding: 0 22px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .right_box > div > span{
        font-size: 16px;
        color: #2da7b7;
    }




    .table_box{
        width: 100%;
        padding: 30px 30px 0 30px;
        box-sizing: border-box;
    }
    .el-table thead{
        background-color: #d2f4f9;
    }
    .el-table th, .el-table tr{
        background-color: #d2f4f9;
    }


    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .block{
        padding: 40px 30px 40px 0;
        box-sizing: border-box;
    }
</style>

