<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="layout2f1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form ref="form1" :model="form1" :inline="true" label-width="80px" class="layout2f2">
            <el-form-item label="有效期起" prop="period0">
                <el-date-picker
                        v-model="form1.period0"
                        value-format="yyyy-MM-dd"
                        :clearable="false"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期止" prop="period1">
                <el-date-picker
                        v-model="form1.period1"
                        value-format="yyyy-MM-dd"
                        :clearable="false"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最优价格" prop="price"
                          :rules="[{required:true,message:'请填写最优价格'},{type:'number',message:'价格必须为数字'}]">
                <el-input
                        v-model.number="form1.price"
                        style="width: 90px"
                        onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :disabled="!cando" :loading="loading" @click="renew">续卡</el-button>
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
                    price: 0,
                },
                showbaseinfo: false,
                cando: false,
                loading: false
            }
        },
        mounted() {
            this.form1.period0 = moment().format('YYYY-MM-DD');
            this.form1.period1 = moment().add('3','years').subtract('1','days').format('YYYY-MM-DD');
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
                        this.form1.price = data['首次采购价格'];
                        this.showbaseinfo = true;
                        this.cando = true;
                    }
                });
            },
            renew() {
                const d0 = moment(this.form1.period0);
                const d1 = moment(this.form1.period1);
                if (d0 >= d1) {
                    this.$message.error('有效期起止范围错误');
                    return;
                }
                this.$refs["form1"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + `card/${this.idnumber}/renew`,{
                                period0: this.form1.period0,
                                period1: this.form1.period1,
                                price: this.form1.price,
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
    .layout2f1 {
        width: 640px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .layout2f2 {
        width: 650px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
</style>