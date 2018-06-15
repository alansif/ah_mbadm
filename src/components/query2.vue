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
            <el-form-item label="有效期止">
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
            <el-button type="primary" :loading="loading" @click="doquery">查询</el-button>
        </el-form>
        <qtable ref="qtr2"></qtable>
    </div>
</template>

<script>
    import qtable from './qtable.vue';
    import {restbase,reserr} from '../restapi.js';

    export default {
        data() {
            return {
                from0: '',
                from1: '',
                to0: '',
                to1: '',
                loading: false
            }
        },
        methods: {
            doquery() {
                this.loading = true;
                this.$axios.get(restbase() + 'query/period',{params:{
                    from0: this.from0,
                    from1: this.from1,
                    to0: this.to0,
                    to1: this.to1
                }}).then(response => {
                    this.loading = false;
                    const d = response.data.data;
                    this.$refs['qtr2'].showtable(d);
                })
                .catch(error => {
                    this.loading = false;
                    if (error) {
                        console.dir(error);
                        this.$message.error(reserr(error));
                    }
                });
            }
        },
        components:{
            qtable
        }
    }
</script>

<style>
    .q2f1{
        width: 900px;
        background-color: white;
        padding: 20px 20px 0 20px;
        margin-bottom: 8px;
    }
</style>