<template>
    <transition name="el-zoom-in-top">
        <div v-show="showme">
            <el-form :inline="true" :model="form1" ref="form1" label-width="90px" class="bif1">
                <el-form-item label="卡号">
                    <el-input v-model="form1.cardnumber" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form1.idnumber" readonly="true" style="width: 205px"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form1.name" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form1.sex" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="剩余次数">
                    <el-input v-model="form1.times" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="签发日期">
                    <el-input v-model="form1.issuedate" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="有效期起">
                    <el-input v-model="form1.period0" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="有效期止">
                    <el-input v-model="form1.period1" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="延期止">
                    <el-input v-model="form1.period2" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="卡余额">
                    <el-input v-model="form1.balance" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="赠券余额">
                    <el-input v-model="form1.coupon" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="最优价格">
                    <el-input v-model="form1.price" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="健康顾问">
                    <el-input v-model="form1.advisor" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="开卡门店">
                    <el-input v-model="form1.branch" readonly="true" style="width: 110px"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form1.mobile" readonly="true" style="width: 217px"></el-input>
                </el-form-item>
                <el-form-item label="定制电话">
                    <el-input v-model="form1.altphone" readonly="true" style="width: 217px"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form1.address" readonly="true" style="width: 540px"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件">
                    <el-input v-model="form1.email" readonly="true" style="width: 217px"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </transition>
</template>

<script>
    import {restbase,reserr} from '../restapi.js';
    export default {
        props:{
            showme: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                form1: {
                    cardnumber: '',
                    idnumber: '',
                    name: '',
                    sex: '',
                    mobile: '',
                    address: '',
                    issuedate: '',
                    period0: '',
                    period1: '',
                    period2: '',
                    times: '',
                    balance: '',
                    coupon: '',
                    advisor: '',
                    branch: '',
                    altphone: '',
                    price: '',
                    email: ''
                }
            }
        },
        methods: {
            query(idnum, cb) {
                this.queryall(idnum, undefined, cb);
            },
            queryall(idnum, all, cb) {
                this.$axios.get(restbase() + 'card',{
                        params:{
                            id:idnum,
                            all:all
                        }
                    })
                    .then(response => {
                        const d = response.data.data;
                        this.form1.cardnumber = d['卡号'];
                        this.form1.idnumber = d['身份证号码'];
                        this.form1.name = d['姓名'];
                        this.form1.sex = d['性别'];
                        this.form1.mobile = d['联系电话'];
                        this.form1.address = d['通讯地址'];
                        this.form1.issuedate = moment(d['签发日期']).format('YYYY-MM-DD');
                        this.form1.times = d['益生套餐'] - d['已用益生套餐'];
                        this.form1.balance = d['账户余额'];
                        this.form1.coupon = d['赠券余额'];
                        this.form1.advisor = d['健康顾问'];
                        this.form1.branch = d['发卡门店'];
                        this.form1.altphone = d['定制电话'];
                        this.form1.price = d['首次采购价格'];
                        this.form1.email = d['电子邮件'];
                        this.form1.period0 = moment(d['有效期起始']).format('YYYY-MM-DD');
                        this.form1.period1 = moment(d['有效期截止']).format('YYYY-MM-DD');
                        this.form1.period2 = moment(d['延期止']).format('YYYY-MM-DD');
                        cb(undefined, d);
                    })
                    .catch(error => {
                        if (error) {
                            console.dir(error);
                            this.$message.error(reserr(error));
                            cb(error, undefined);
                        }
                    });
            }
        }
    }
</script>

<style>
    .bif1 {
        width: 650px;
        background-color: white;
        padding: 20px 20px 0 20px;
        margin-bottom: 12px;
    }
    .bif1 .el-input__inner {
        background-color: #eee;
    }
    .bif1 .el-range-input {
        background-color: #eee;
    }
</style>
