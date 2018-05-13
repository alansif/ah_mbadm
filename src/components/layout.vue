<template>
    <div>
        <el-form :inline="true" ref="form1" :model="form1" label-width="60px" @submit.native.prevent class="layout1f1">
            <el-form-item label="证件号">
                <el-input id="idinput" :maxlength="18" v-model="form1.idnumber" style="width: 525px"
                          @keydown.native="clearinfo"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form1.name" readonly="true" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form1.sex" readonly="true" style="width: 60px"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form1.mobile" readonly="true" style="width: 195px"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form1.address" readonly="true" style="width: 525px"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form2" :model="form2" label-width="80px" class="layout1f3">
            <el-form-item label="会员期限">
                <el-input v-model="form2.terms" readonly="true" style="width: 60px"></el-input>
            </el-form-item>
            <el-form-item label="有效期">
                <el-date-picker
                        v-model="form2.period"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        :unlink-panels="true"
                        :clearable="false"
                        :editable="false"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最优价格" prop="price"
                :rules="[{required:true,message:'请填写最优价格'},{type:'number',message:'价格必须为数字'}]">
                <el-input
                        v-model.number="form2.price"
                        placeholder="每年价格"
                        style="width: 90px"
                        onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <el-form-item label="健康顾问" prop="advisor" :rules="[{required:true,message:'请填写健康顾问'}]">
                <el-input v-model="form2.advisor" style="width: 90px"></el-input>
            </el-form-item>
            <el-form-item label="定制电话">
                <el-input v-model="form2.altphone" style="width: 135px"></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="form2.commentinfo" style="width: 505px"></el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :loading="loading" @click="newuser">开卡</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {restbase,reserr} from '../restapi.js';
    export default {
        data() {
            return {
                form1: {
                    idnumber: '',
                    name: '',
                    sex: '',
                    mobile: '',
                    address: ''
                },
                form2: {
                    terms: '3年',
                    period:['',''],
                    price: '',
                    advisor: '',
                    altphone: '',
                    commentinfo: ''
                },
                loading: false
            }
        },
        mounted() {
            let d0 = moment().format('YYYY-MM-DD');
            let d1 = moment().add('3','years').format('YYYY-MM-DD');
            this.form2.period = [d0, d1];
        },
        methods: {
            clearinfo() {
                this.form1.name = '';
                this.form1.sex = '';
                this.form1.mobile = '';
                this.form1.address = '';
            },
            dosearch0() {
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
                    })
                    .catch(error => {
                        if (error) {
                            console.dir(error);
                            this.$message.error(reserr(error));
                        }
                    });
            },
            newuser() {
                this.form1.idnumber = this.form1.idnumber.replace(/^\s+/, "").replace(/\s+$/, "");
                if (this.form1.idnumber.length !== 18) {
                    this.$message.error('证件号码格式错误');
                    return;
                }
                this.form1.name = this.form1.name.replace(/^\s+/, "").replace(/\s+$/, "");
                if (this.form1.name.length === 0) {
                    this.$message.error('需要姓名');
                    return;
                }
                this.$refs["form2"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + 'card',{
                                id:this.form1.idnumber,
                                name:this.form1.name,
                                sex:this.form1.sex,
                                mobile:this.form1.mobile,
                                address:this.form1.address,
                                period0:this.form2.period[0],
                                period1:this.form2.period[1],
                                price:this.form2.price,
                                advisor:this.form2.advisor,
                                altphone:this.form2.altphone,
                                comment:this.form2.commentinfo,
                                operator:this.$root.oprt
                            })
                            .then(response => {
                                this.loading = false;
//                                const d = response.data.data;
//                                console.log(d);
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
        }
    }
</script>

<style>
    .layout1f1 {
        width: 600px;
        height: 170px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
    #idinput {
        background-color: inherit;
    }
    .layout1f1 .el-input__inner {
        background-color: #eee;
    }
    .layout1f3 {
        width: 600px;
        background-color: white;
        padding: 20px 20px;
    }
</style>