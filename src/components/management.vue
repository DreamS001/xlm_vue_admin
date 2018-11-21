<template>
    <div class="management_box">
        <div class="management_title">
            <div class="left_box">信息管理</div>
            <div class="right_box">
                <div style="padding:0 16px;" @click="centerDialogVisible = true"><span>清空数据</span></div>
                <div class="export" @click="getExport()">
                    <img src="../../static/images/export.png">
                    <span>导出</span>
                </div>
                <!-- <input type="file" @change="importFile(this)" id="imFile" style="display: none"
     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/> -->
                <div class="import" style="background:#d2f4f9;">
                    <img src="../../static/images/import.png">
                    <span>导入</span>
                    <input type="file"  value="" id="file" @change="uploadConfig"/>

                </div>
            </div>
        </div>
        <div class="search_box">
            <el-select v-model="ite1" placeholder="省份" style="width:100px;" class="item">
                <el-option
                v-for="item in citiesP"
                :key="item.value"
                :value="item.value">
                <span style="float: left">{{ item.value }}</span>
                 <!-- @click="getCity();" -->
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                </el-option>
            </el-select>
            <el-select v-model="ite2" placeholder="城市" style="width:100px;" class="item">
                <el-option
                v-for="item in citiesC"
                :key="item.value"
                :value="item.value">
                <span style="float: left">{{ item.value }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                </el-option>
            </el-select>
            <el-input
                placeholder="输入搜索姓名或手机号"
                v-model="ite3" style="width:200px;margin-left:30px;" @keyup.enter.native="searchEnterFun">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div class="table_box">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="tableHeaderColor" :cell-style="tableRow">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <!-- <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small" style="color:#333333;font-size:14px;">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>

        <div class="block pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="10" layout="slot, prev, pager, next, jumper" :total="total">
            <span>第{{start}} / {{total}}页</span>
            </el-pagination>
        </div>

        <el-dialog  style="text-align:center;"
        title="警告"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
            <span>是否清空全部数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false;delect()">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
import qs from 'qs'
// 引入xlsx
var XLSX = require('xlsx')
export default {
    data() {
      return {
        tableData: [],
        citiesP: [],
        citiesC: [],
        value1: '',
        value2: '',
        value3:'',
        currentPage1: 4,
        ite1:'',
        ite2:'',
        ite3:'',
        imFile: '', // 导入文件el
        start:1,//当前页数
        total:0,//总页数
        centerDialogVisible: false
      }
    },
    watch: {
      ite1: function (val) {
        this.value1 = val
        console.log(this.value1)
        this.getCity();
      },
      ite2: function (val) {
        this.value2 = val
        console.log(this.value2)
        // this.getL()
      },
      ite3: function (val) {
        this.value3 = val
        console.log(this.value3)
       // this.getL()
      }
    },
    created() {
        this.ifLogin();
        this.getProvince();
        this.getData();
    },
    mounted () {
        this.imFile = document.getElementById('imFile')
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
        //获取省份
        getProvince(){
            this.$http.post("/race/draw/selectByProvince").then((res) => {
                    console.log(res);

                    if(res.status==200){
                        this.citiesP=res.data.data
                    }else{
                        alert(res.data.msg)
                    }
            }).catch((err)=>{
                console.log(err)
            })
        },
        //获取城市
        getCity(){
            var _this=this;
            console.log(this.value1)
            let params={
                province:_this.value1
            }
            console.log(params)
            this.$http.post("/race/draw/selectByCity",qs.stringify(params)).then((res) => {
                    console.log(res);

                    if(res.status==200){
                        this.citiesC=res.data.data
                    }else{
                        alert(res.data.msg)
                    }
            }).catch((err)=>{
                console.log(err)
            })
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
            this.start = val;
            console.log(`当前页: ${val}`);
            this.getData();
        },
        //回车搜索
        searchEnterFun:function(e){
            console.log(this.value1)
            console.log(this.value2)
            console.log(this.value3)
            this.getData();
        },
        //获取信息
        getData(){
            let params={
                start:this.start,
                tatol:10,
                province:this.value1,
                city:this.value2,
                query:this.value3
            }
            console.log(params)
            this.$http.post("/race/draw/findListByDrawUser",qs.stringify(params)).then((res) => {
                    console.log(res);

                    if(res.data.code==200){
                        this.tableData=res.data.data;
                        this.total=Math.ceil(res.data.page/10);
                    }else{
                        alert(res.data.msg)
                    }
            }).catch((err)=>{
                console.log(err)
            })
        },
        //一键清空数据
        delect(){
            var _this=this;
            this.$http.get("/race/draw/deleteByAll").then((res) => {
                    console.log(res);

                    if(res.data.code==200){
                        _this.getData()
                    }else{
                        alert(res.data.msg)
                    }
            }).catch((err)=>{
                console.log(err)
            })
        },
        //删除当前行
        deleteRow(index, rows) {
            console.log(index)
            rows.splice(index, 1);
        },
        uploadFile: function () { // 点击导入按钮
            this.imFile.click()
        },
        //导入
        uploadConfig(e) {
            var _this=this;
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            // let url = this.$store.state.path + "api/tools/handle_upload_file";
            let config = {
            headers:{'Content-Type':'multipart/form-data'}
            };
            _this.$http.post("/race/excel/imports",formData, config).then(function (response) {
                console.log(response)
                if(response.data.code=='SUCCESS'){
                    _this.getData();
                }
            })

        },
        //导出
        getExport(){
            window.location.href="http://s.chinabed.com:8081/race/excel/export"
        }
        // importFile: function () { // 导入excel
        //     let obj = this.imFile
        //     if (!obj.files) {
        //         // this.fullscreenLoading = false
        //         return
        //     }
        //     var f = obj.files[0]
        //     var reader = new FileReader()
        //     let $t = this
        //     reader.onload = function (e) {
        //         var data = e.target.result
        //         if ($t.rABS) {
        //         $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
        //             type: 'base64'
        //         })
        //         } else {
        //         $t.wb = XLSX.read(data, {
        //             type: 'binary'
        //         })
        //         }
        //         let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        //         console.log(typeof json)
        //         $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
        //     }
        //     if (this.rABS) {
        //         reader.readAsArrayBuffer(f)
        //     } else {
        //         reader.readAsBinaryString(f)
        //     }
        // },
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
        width: 330px;
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
        cursor: pointer;
    }
    .right_box > div > span{
        font-size: 16px;
        color: #2da7b7;
    }
    .import {
        position: relative;
    }
    .import input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 34px;
        opacity: 0;
        -ms-filter: 'alpha(opacity=0)';
    }

    .search_box{
        width: 100%;
        height: 93px;
        display: flex;
        align-items: center;
    }
    .search_box .item{
        margin-left: 30px;
    }
    .search_box input::-webkit-input-placeholder{
        color: #3f3f3f;
    }




    .table_box{
        width: 100%;
        padding: 0 30px;
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
    .el-dialog--center .el-dialog__body{
        text-align: center;
    }
    .el-dialog--center .el-dialog__body span{
        display: inline-block;
        width: 100%;
        text-align: center;
    }
</style>

