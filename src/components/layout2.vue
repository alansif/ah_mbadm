<template>
    <div>
        <el-form :inline="true" class="layout2f1">
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
        </el-form>
        <baseinfo></baseinfo>
    </div>
</template>

<script>
    import baseinfo from './baseinfo.vue';
    export default {
        data() {
            return {
                period:['',''],
                price: 9988
            }
        },
        mounted() {
            let d0 = moment().format('YYYY-MM-DD');
            let d1 = moment().add('3','years').format('YYYY-MM-DD');
            this.period = [d0, d1];
        },
        components:{
            baseinfo
        }
    }
</script>

<style>
    .layout2f1 {
        width: 650px;
        height: 40px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
</style>