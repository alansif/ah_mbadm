<template>
    <div>
        <el-form :inline="true" label-width="80px" @submit.native.prevent class="r2f1">
            <el-form-item label="时间段起">
                <el-date-picker
                        v-model="fromdate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="todate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber" style="width:180px"></el-input>
            </el-form-item>
            <el-form-item label="操作人员">
                <el-input v-model="operator" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-select v-model="itemname" style="width:110px">
                    <el-option value="*"></el-option>
                    <el-option value="益生套餐"></el-option>
                    <el-option value="加项费"></el-option>
                    <el-option value="定制费"></el-option>
                    <el-option value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="体检门店">
                <el-select v-model="branch" style="width:110px">
                    <el-option value="*"></el-option>
                    <el-option value="东直门"></el-option>
                    <el-option value="西直门"></el-option>
                    <el-option value="总部"></el-option>
                    <el-option value="总店"></el-option>
                </el-select>
            </el-form-item>
            <div style="text-align: center">
                <el-button type="primary" :loading="loading" @click="doquery" style="width: 160px">查询</el-button>
                <el-button @click="exportfile" :disabled="restbl.length === 0" style="width: 160px">导出{{restbl.length}}项</el-button>
            </div>
        </el-form>
        <qtable ref="qt"></qtable>
    </div>
</template>

<script>
    import qtable from './qtable.vue';
    import {restbase,reserr} from '../restapi.js';
    import {JSONToCSVConvertor} from '../csv.js';

    export default {
        data() {
            return {
                fromdate: '',
                todate: '',
                idnumber: '',
                operator: '',
                itemname: '*',
                branch: '*',
                loading: false,
                restbl: []
            }
        },
        methods: {
            doquery() {
                this.restbl = [];
                this.loading = true;
                this.$axios.get(restbase() + 'queryrec/consume',{params:{
                    from: this.fromdate,
                    to: this.todate,
                    idnumber: this.idnumber,
                    operator: this.operator,
                    itemname: this.itemname,
                    branch: this.branch
                }}).then(response => {
                    this.loading = false;
                    const d = response.data.data;
                    this.restbl = d;
                    this.$refs['qt'].showtable(d);
                })
                .catch(error => {
                    this.loading = false;
                    if (error) {
                        console.dir(error);
                        this.$message.error(reserr(error));
                    }
                });
            },
            exportfile() {
                JSONToCSVConvertor(this.restbl, 'export', true);
            }
        },
        components:{
            qtable
        }
    }
</script>

<style>
    .r2f1{
        width: 685px;
        background-color: white;
        padding: 20px;
        margin-bottom: 8px;
    }
</style>