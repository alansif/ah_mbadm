<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="rff1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :disabled="!cando" :loading="loading" @click="refund">退卡</el-button>
            </div>
        </el-form>
        <baseinfo :showme="showbaseinfo" ref="bic"></baseinfo>
    </div>
</template>

<script>
    import {restbase,reserr} from '../restapi.js';
    import baseinfo from './baseinfo.vue';
    export default {
        data() {
            return {
                idnumber: '',
                showbaseinfo: false,
                cando: false,
                loading: false
            }
        },
        methods: {
            dosearch0() {
                this.showbaseinfo = false;
                this.cando = false;
                this.idnumber = this.idnumber.replace(/^\s+/, "").replace(/\s+$/, "");
                if (this.idnumber.length !== 18) {
                    this.$message.error('证件号码格式错误');
                    return;
                }
                this.$refs['bic'].query(this.idnumber, (err, data) => {
                    if (!err) {
                        this.showbaseinfo = true;
                        this.cando = true;
                    }
                });
            },
            refund() {
                this.loading = true;
                this.$axios.post(restbase() + `card/${this.idnumber}/refund`,{
                    operator:this.$root.oprt
                })
                .then(response => {
                    this.loading = false;
                    this.showbaseinfo = false;
                    this.cando = false;
                    this.$message({
                        message: response.data.status.message,
                        type: 'success',
                        center: true
                    });
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
            baseinfo
        }
    }
</script>

<style>
    .rff1 {
        width: 640px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
</style>