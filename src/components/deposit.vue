<template>
    <div>
        <el-form ref="form1" label-width="80px" @submit.native.prevent class="dpf1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber" @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <baseinfo></baseinfo>
        <el-form label-width="80px" @submit.native.prevent class="dpf2">
            <el-form-item label="充值金额">
                <el-input v-model="amount" style="width: 140px" onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)"></el-input>
            </el-form-item>
            <el-form-item label="预存类型">
                <el-radio v-model="dptype" label="1">现金</el-radio>
                <el-radio v-model="dptype" label="2">赠券</el-radio>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="comment1" style="width: 560px"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import baseinfo from './baseinfo.vue';
    export default {
        data() {
            return {
                idnumber: '110101190010104567',
                amount: 0,
                dptype: '1',
                comment1: ''
            }
        },
        methods: {
            dosearch0() {
                console.log(this.idnumber);
            }
        },
        components:{
            baseinfo
        }
    }
</script>

<style>
    .dpf1 {
        width: 640px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .dpf2 {
        width: 650px;
        height: 168px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
</style>