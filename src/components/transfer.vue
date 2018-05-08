<template>
    <div>
        <el-form ref="form1" label-width="80px" @submit.native.prevent class="tff1">
            <el-form-item label="出证件号">
                <el-input :maxlength="18" placeholder="请输入转出者证件号码" v-model="idnumber0" @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="80px" @submit.native.prevent class="tff2">
            <el-form-item label="入证件号">
                <el-input id="tfidinput" :maxlength="18" placeholder="请输入转入者证件号码" v-model="form1.idnumber" @keyup.enter.native="dosearch1" style="width: 550px">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch1"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form1.name" readonly="true" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form1.sex" readonly="true" style="width: 60px"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form1.mobile" readonly="true" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form1.address" readonly="true" style="width: 550px"></el-input>
            </el-form-item>
            <el-form-item label="手续费">
                <el-input id="tffee" v-model="form1.fee" style="width: 120px" onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)"></el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary">转卡</el-button>
            </div>
        </el-form>
        <baseinfo :showme="showbaseinfo"></baseinfo>
    </div>
</template>

<script>
    import baseinfo from './baseinfo.vue';
    export default {
        data() {
            return {
                idnumber0: '',
                form1: {
                    idnumber: '',
                    name: '',
                    sex: '',
                    mobile: '',
                    address: '',
                    fee: 0
                },
                showbaseinfo: false
            }
        },
        methods: {
            dosearch0() {
                console.log(this.idnumber0);
                this.showbaseinfo = !this.showbaseinfo;
            },
            dosearch1() {
                console.log(this.form1.idnumber);
            }
        },
        components:{
            baseinfo
        }
    }
</script>

<style>
    .tff1 {
        width: 630px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .tff2 {
        width: 640px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
    #tfidinput {
        background-color: inherit;
    }
    #tffee {
        background-color: inherit;
    }
    .tff2 .el-input__inner {
        background-color: #eee;
    }
</style>