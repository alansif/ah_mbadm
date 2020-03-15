<template>
    <div>
        <el-form :inline="true" label-width="80px" @submit.native.prevent class="q4f1">
            <el-form-item label="卡片状态">
                <el-select v-model="mbst" style="width:120px">
                    <el-option label="*" value=""></el-option>
                    <el-option value="新卡使用"></el-option>
                    <el-option value="已经停用"></el-option>
                    <el-option value="会员转卡"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用分类">
                <el-select v-model="usemode" style="width:120px">
                    <el-option label="*" value=""></el-option>
                    <el-option value="新会员"></el-option>
                    <el-option value="连续续卡"></el-option>
                    <el-option value="间断续卡"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员经理">
                <el-input v-model="agent" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="健康顾问">
                <el-input v-model="advisor" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="最优价格">
                <el-input v-model="preferprice" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="套餐余次">
                <el-input v-model="remaintimes" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-select v-model="balancegt0" style="width:120px">
                    <el-option label="*" value=""></el-option>
                    <el-option value=">0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="comment" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="签发日期">
                <el-date-picker
                        v-model="fromdate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 149px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="todate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 149px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期止">
                <el-date-picker
                        v-model="expfromdate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 149px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="exptodate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 149px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="延期止">
                <el-date-picker
                        v-model="exfromdate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 149px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="extodate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 149px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="操作人员">
                <el-input v-model="operator" style="width:120px"></el-input>
            </el-form-item>
            <el-form-item label="会员状态">
                <el-select v-model="mbst2" style="width:120px">
                    <el-option label="*" value=""></el-option>
                    <el-option value="有效会员"></el-option>
                    <el-option value="无效会员"></el-option>
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
                mbst: '',
                usemode: '',
                agent: '',
                advisor: '',
                preferprice: '',
                fromdate: '',
                todate: '',
                expfromdate: '',
                exptodate: '',
                exfromdate: '',
                extodate: '',
                comment: '',
                remaintimes: '',
                balancegt0: '',
                operator: '',
                mbst2: '',
                loading: false,
                restbl: []
            }
        },
        methods: {
            doquery() {
                this.restbl = [];
                this.loading = true;
                this.$axios.get(restbase() + 'query/combo',{params:{
                    mbst: this.mbst,
                    usemode: this.usemode,
                    agent: this.agent,
                    advisor: this.advisor,
                    preferprice: this.preferprice,
                    fromdate: this.fromdate,
                    todate: this.todate,
                    expfromdate: this.expfromdate,
                    exptodate: this.exptodate,
                    exfromdate: this.exfromdate,
                    extodate: this.extodate,
                    comment: this.comment,
                    remaintimes: this.remaintimes,
                    balancegt0: this.balancegt0,
                    operator: this.operator,
                    mbst2: this.mbst2
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
    .q4f1{
        width: 860px;
        background-color: white;
        padding: 20px;
        margin-bottom: 8px;
    }
</style>
