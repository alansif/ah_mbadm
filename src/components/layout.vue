<template>
    <div>
        <el-form ref="form1" :model="form1" label-width="60px" @submit.native.prevent class="layout1f1">
            <el-form-item label="证件号">
                <el-input v-model="form1.idnumber" @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="60px" class="layout1f2">
            <el-form-item label="姓名">
                <el-input v-model="form1.name" readonly="true" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form1.sex" readonly="true" style="width: 60px"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form1.mobile" readonly="true" style="width: 195px"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form1.address" readonly="true" style="width: 525px"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true"  label-width="80px" class="layout1f3">
            <el-form-item label="会员期限">
                <el-input readonly="true" style="width: 60px" value="3年"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
                <el-date-picker
                        v-model="period"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        :unlink-panels="true"
                        :clearable="false"
                        :editable="false"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最优价格">
                <el-input
                        placeholder="每年价格"
                        style="width: 90px"
                        onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <el-form-item label="健康顾问">
                <el-input style="width: 90px"></el-input>
            </el-form-item>
            <el-form-item label="定制电话">
                <el-input style="width: 135px"></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input style="width: 505px"></el-input>
            </el-form-item>
        </el-form>
        <div style="width:640px;text-align: center;">
            <el-button type="primary">开卡</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form1: {
                    idnumber: '',
                    name: '',
                    sex: '',
                    mobile: '',
                    address: ''
                },
                period:['','']
            }
        },
        mounted() {
            let d0 = moment().format('YYYY-MM-DD');
            let d1 = moment().add('3','years').format('YYYY-MM-DD');
            this.period = [d0, d1];
        },
        methods: {
            dosearch0() {
                console.log(this.form1.idnumber);
            }
        }
    }
</script>

<style>
    .layout1f1 {
        width: 590px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .layout1f2 {
        width: 600px;
        height: 108px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
    .layout1f2 .el-input__inner {
        background-color: #eee;
    }
    .layout1f3 {
        width: 600px;
        height: 172px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
</style>