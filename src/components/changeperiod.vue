<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="cpf1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="80px" @submit.native.prevent class="cpf2">
            <el-form-item label="有效期起" prop="period0">
                <el-date-picker
                        v-model="form1.period0"
                        value-format="yyyy-MM-dd"
                        :clearable="false"
                        :editable="false"
                        style="width: 233px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期止" prop="period1">
                <el-date-picker
                        v-model="form1.period1"
                        value-format="yyyy-MM-dd"
                        :clearable="false"
                        :editable="false"
                        style="width: 232px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注信息" prop="comment"
                          :rules="[{required:true,message:'请填写备注信息'}]">
                <el-input v-model="form1.comment" style="width: 560px"></el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :disabled="!cando" :loading="loading" @click="changepd">修改</el-button>
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
                    period0: '',
                    period1: '',
                    comment: ''
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
                        this.form1.period0 = moment(data['有效期起始']).format('YYYY-MM-DD');
                        this.form1.period1 = moment(data['有效期截止']).format('YYYY-MM-DD');
                        this.showbaseinfo = true;
                        this.cando = true;
                    }
                });
            },
            changepd() {
                this.$refs["form1"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + `card/${this.idnumber}/changeperiod`,{
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
    .cpf1 {
        width: 640px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .cpf2 {
        width: 650px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
</style>