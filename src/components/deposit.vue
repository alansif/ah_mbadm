<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="dpf1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form ref="form1" :model="form1" label-width="80px" @submit.native.prevent class="dpf2">
            <el-form-item label="充值金额" prop="amount"
                          :rules="[{required:true,message:'请填写充值金额'},{type:'number',message:'必须为数字'}]">
                <el-input v-model.number="form1.amount" style="width: 140px"
                          onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)"></el-input>
            </el-form-item>
            <el-form-item label="预存类型">
                <el-radio v-model="form1.dptype" label="1">现金</el-radio>
                <el-radio v-model="form1.dptype" label="2">赠券</el-radio>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="form1.comment" style="width: 560px"></el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :disabled="!cando" :loading="loading" @click="deposit">预存</el-button>
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
                form1: {
                    amount: 0,
                    dptype: '1',
                    comment: '',
                },
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
            deposit() {
                if (this.form1.amount < 1) {
                    this.$message.error('请填写充值金额');
                    return;
                }
                this.$refs["form1"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + `card/${this.idnumber}/deposit`,{
                                amount: this.form1.amount,
                                dptype: this.form1.dptype,
                                comment: this.form1.comment,
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
                });
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
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
</style>