<template>
    <div>
        <el-form :inline="true" label-width="20px" @submit.native.prevent class="q3f1">
            <el-form-item label="">
                <el-input v-model="keyword" placeholder="姓名、卡号或电话" style="width: 250px;margin: 0 10px;"></el-input>
            </el-form-item>
            <el-button type="primary" :loading="loading" @click="doquery" style="width: 100px">查询</el-button>
        </el-form>
        <qtable ref="qtr3"></qtable>
    </div>
</template>

<script>
    import qtable from './qtable.vue';
    import {restbase,reserr} from '../restapi.js';

    export default {
        data() {
            return {
                keyword: '',
                loading: false
            }
        },
        methods:{
            doquery() {
                this.loading = true;
                this.$axios.get(restbase() + 'query/keyword',{params:{
                    keyword: this.keyword,
                }}).then(response => {
                    this.loading = false;
                    const d = response.data.data;
                    this.$refs['qtr3'].showtable(d);
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
    .q3f1{
        width: 400px;
        background-color: white;
        padding: 20px 20px 0 20px;
        margin-bottom: 8px;
    }
</style>