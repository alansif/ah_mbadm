<template>
    <div>
        <el-form ref="form1" label-width="80px" @submit.native.prevent class="layout2f1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber" @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" label-width="80px" class="layout2f2">
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
                        v-model="price"
                        style="width: 90px"
                        onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary">续卡</el-button>
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
                idnumber: '110101190010104567',
                period:['',''],
                price: 9988,
                showbaseinfo: false
            }
        },
        mounted() {
            let d0 = moment().format('YYYY-MM-DD');
            let d1 = moment().add('3','years').format('YYYY-MM-DD');
            this.period = [d0, d1];
        },
        methods: {
            dosearch0() {
                console.log(this.idnumber);
                this.showbaseinfo = !this.showbaseinfo;
            }
        },
        components:{
            baseinfo
        }
    }
</script>

<style>
    .layout2f1 {
        width: 640px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .layout2f2 {
        width: 650px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
</style>