<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="tff1">
            <el-form-item label="出证件号">
                <el-input :maxlength="18" placeholder="请输入转出者证件号码" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="80px" @submit.native.prevent class="tff2">
            <el-form-item label="入证件号">
                <el-input id="tfidinput" :maxlength="18" placeholder="请输入转入者证件号码" v-model="form1.idnumber"
                          @keydown.native="cando1 = false"
                          @keyup.enter.native="dosearch1"
                          style="width: 550px">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch1"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form1.name" readonly="true" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form1.sex" readonly="true" style="width: 60px"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form1.mobile" readonly="true" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form1.address" readonly="true" style="width: 550px"></el-input>
            </el-form-item>
            <el-form-item label="定制电话">
                <el-input id="tfaltp" v-model="form1.altphone" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="手续费" prop="fee"
                          :rules="[{required:true,message:'请填写手续费'},{type:'number',message:'必须为数字'}]">
                <el-input id="tffee"
                          v-model.number="form1.fee"
                          style="width: 120px"
                          onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :disabled="!cando || !cando1" :loading="loading" @click="transfer">转卡</el-button>
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
                    idnumber: '',
                    name: '',
                    sex: '',
                    mobile: '',
                    address: '',
                    altphone: '',
                    fee: 100
                },
                showbaseinfo: false,
                cando: false,
                loading: false,
                cando1: false
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
            dosearch1() {
                this.cando1 = false;
                this.form1.idnumber = this.form1.idnumber.replace(/^\s+/, "").replace(/\s+$/, "");
                if (this.form1.idnumber.length !== 18) {
                    this.$message.error('证件号码格式错误');
                    return;
                }
                this.$axios.get(restbase() + `guest/${this.form1.idnumber}/info`)
                    .then(response => {
                        const d = response.data.data;
                        this.form1.name = d.Name;
                        this.form1.sex = d.Sex;
                        this.form1.mobile = d.Mobile;
                        this.form1.address = d.Address;
                        this.cando1 = true;
                    })
                    .catch(error => {
                        if (error) {
                            console.dir(error);
                            this.$message.error(reserr(error));
                        }
                    });
            },
            transfer() {
                this.$refs["form1"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + `card/${this.idnumber}/transfer`,{
                            id1: this.form1.idnumber,
                            altphone:this.form1.altphone,
                            fee:this.form1.fee,
                            operator:this.$root.oprt
                        })
                            .then(response => {
                                this.loading = false;
                                this.showbaseinfo = false;
                                this.cando = false;
                                this.cando1 = false;
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
    .tff1 {
        width: 630px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .tff2 {
        width: 640px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
    #tfidinput,#tfaltp,#tffee {
        background-color: inherit;
    }
    .tff2 .el-input__inner {
        background-color: #eee;
    }
</style>