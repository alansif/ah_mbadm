<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="cif1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="80px" @submit.native.prevent class="cif2">
            <el-form-item label="会员经理" prop="agent">
                <el-input v-model="form1.agent" style="width:200px">
                    <i class="el-icon-d-arrow-left el-input__icon" slot="suffix"
                       @click="form1.agent=oldinfo.agent" v-show="form1.agent!==oldinfo.agent"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="健康顾问" prop="advisor">
                <el-input v-model="form1.advisor" style="width:200px">
                    <i class="el-icon-d-arrow-left el-input__icon" slot="suffix"
                       @click="form1.advisor=oldinfo.advisor" v-show="form1.advisor!==oldinfo.advisor"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="益生套餐" prop="ystc">
                <el-input v-model="form1.ystc" style="width:200px">
                    <i class="el-icon-d-arrow-left el-input__icon" slot="suffix"
                       @click="form1.ystc=oldinfo.ystc" v-show="form1.ystc!==oldinfo.ystc"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="已用套餐" prop="yyystc">
                <el-input v-model="form1.yyystc" style="width:200px">
                    <i class="el-icon-d-arrow-left el-input__icon" slot="suffix"
                       @click="form1.yyystc=oldinfo.yyystc" v-show="form1.yyystc!==oldinfo.yyystc"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="定制电话" prop="altphone">
                <el-input v-model="form1.altphone" style="width:265px">
                    <i class="el-icon-d-arrow-left el-input__icon" slot="suffix"
                       @click="form1.altphone=oldinfo.altphone" v-show="form1.altphone!==oldinfo.altphone"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
                <el-input v-model="form1.comment" style="width:560px">
                    <i class="el-icon-d-arrow-left el-input__icon" slot="suffix"
                       @click="form1.comment=oldinfo.comment" v-show="form1.comment!==oldinfo.comment"></i>
                </el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :loading="loading" @click="dochange"
                           :disabled="!(cando && (form1.agent!==oldinfo.agent || form1.altphone!==oldinfo.altphone || form1.comment!==oldinfo.comment))"
                >修改</el-button>
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
                    agent: '',
                    altphone: '',
					advisor: '',
					ystc:'',    //益生套餐
					yyystc:'',  //已用益生套餐
                    comment: ''
                },
                oldinfo: {
                    agent: '',
                    altphone: '',
					advisor: '',
					ystc:'',    //益生套餐
					yyystc:'',  //已用益生套餐
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
                        this.form1.agent = data['会员经理'];
                        this.form1.altphone = data['定制电话'];
                        this.form1.advisor = data['健康顾问'];
                        this.form1.ystc = data['益生套餐'];
                        this.form1.yyystc = data['已用益生套餐'];
                        this.form1.comment = data['备注'];
                        this.oldinfo.agent = data['会员经理'];
                        this.oldinfo.altphone = data['定制电话'];
                        this.oldinfo.advisor = data['健康顾问'];
                        this.oldinfo.ystc = data['益生套餐'];
                        this.oldinfo.yyystc = data['已用益生套餐'];
                        this.oldinfo.comment = data['备注'];
                        this.showbaseinfo = true;
                        this.cando = true;
                    }
                });
            },
            dochange() {
                this.loading = true;
                let chglist = [];
                if (this.form1.agent!==this.oldinfo.agent) {
                    chglist.push({entry:'会员经理',value:this.form1.agent});
                }
                if (this.form1.advisor!==this.oldinfo.advisor) {
                    chglist.push({entry:'健康顾问',value:this.form1.advisor});
                }
                if (this.form1.ystc!==this.oldinfo.ystc) {
                    chglist.push({entry:'益生套餐',value:this.form1.ystc});
                }
                if (this.form1.yyystc!==this.oldinfo.yyystc) {
                    chglist.push({entry:'已用益生套餐',value:this.form1.yyystc});
                }
                if (this.form1.altphone!==this.oldinfo.altphone) {
                    chglist.push({entry:'定制电话',value:this.form1.altphone});
                }
                if (this.form1.comment!==this.oldinfo.comment) {
                    chglist.push({entry:'备注',value:this.form1.comment});
                }
                if (chglist.length === 0) return;
                this.$axios.post(restbase() + `card/${this.idnumber}/changeinfo`,{
                    chglist: chglist,
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
    .cif1 {
        width: 640px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .cif2 {
        width: 650px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
</style>