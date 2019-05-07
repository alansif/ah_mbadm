<template>
    <div>
        <el-form :inline="true" label-width="80px" @submit.native.prevent class="q2f1">
            <el-form-item label="有效期起">
                <el-date-picker
                        v-model="from0"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="from1"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="延期止">
                <el-date-picker
                        v-model="to0"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="to1"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <div style="text-align: center">
                <el-button type="primary" :loading="loading" @click="doquery" style="width: 160px">查询</el-button>
                <el-button @click="exportfile" :disabled="restbl.length === 0" style="width: 160px">导出{{restbl.length}}项</el-button>
            </div>
        </el-form>
        <qtable ref="qtr2"></qtable>
    </div>
</template>

<script>
    import qtable from './qtable.vue';
    import {restbase,reserr} from '../restapi.js';
    import {JSONToCSVConvertor} from '../csv.js';

    export default {
        data() {
            return {
                from0: '',
                from1: '',
                to0: '',
                to1: '',
                loading: false,
                restbl: []
            }
        },
        methods: {
            doquery() {
                this.restbl = [];
                this.loading = true;
                this.$axios.get(restbase() + 'query/period',{params:{
                    from0: this.from0,
                    from1: this.from1,
                    to0: this.to0,
                    to1: this.to1
                }}).then(response => {
                    this.loading = false;
                    const d = response.data.data;
                    this.restbl = d;
                    this.$refs['qtr2'].showtable(d);
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
    .q2f1{
        width: 410px;
        background-color: white;
        padding: 20px;
        margin-bottom: 8px;
    }
</style>