<template>
    <el-form :inline="true" :model="form1" label-width="80px" class="bif1">
        <el-form-item label="卡号">
            <el-input v-model="form1.cardnumber" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model="form1.idnumber" readonly="true" style="width: 205px"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="form1.name" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-input v-model="form1.sex" readonly="true" style="width: 60px"></el-input>
        </el-form-item>
        <el-form-item label="套餐次数">
            <el-input v-model="form1.times" readonly="true" style="width: 50px"></el-input>
        </el-form-item>
        <el-form-item label="签发日期">
            <el-input v-model="form1.issuedate" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
            <el-date-picker
                    v-model="form1.period"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    :readonly="true"
                    :unlink-panels="true"
                    :clearable="false"
                    :editable="false"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="卡余额">
            <el-input v-model="form1.balance" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="赠券余额">
            <el-input v-model="form1.coupon" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form1.mobile" readonly="true" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="定制电话">
            <el-input v-model="form1.altphone" readonly="true" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="form1.address" readonly="true" style="width: 550px"></el-input>
        </el-form-item>
        <el-form-item label="健康顾问">
            <el-input v-model="form1.advisor" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="开卡门店">
            <el-input v-model="form1.branch" readonly="true" style="width: 110px"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                form1: {
                    cardnumber: '123456',
                    idnumber: '110101190010105678',
                    name: '哈哈哈哈',
                    sex: '男',
                    mobile: '13800138000',
                    address: '',
                    issuedate: '2099-10-10',
                    period:['2022-02-22','2033-01-11'],
                    times: 3,
                    balance: 9999,
                    coupon: 6666,
                    advisor: '健康顾问',
                    branch: '开卡门店',
                    altphone: '13800138999'
                }
            }
        }
    }
</script>

<style>
    .bif1 {
        width: 650px;
        height: 420px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
    .bif1 .el-input__inner {
        background-color: #eee;
    }
    .bif1 .el-range-input {
        background-color: #eee;
    }
</style>
