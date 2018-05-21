<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="csf1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keydown.native="cando = false"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="80px" @submit.native.prevent class="csf2">
            <el-form-item label="定制费">
                <el-switch v-model="form1.ctmswitch" @change="ctmchanged"></el-switch>
            </el-form-item>
            <el-form-item label="定制金额" prop="ctm"
                          :rules="[{required:form1.ctmswitch,message:'请填写金额'},{type:'number',message:'必须为数字'}]">
                <el-input v-model.number="form1.ctm" :disabled="!form1.ctmswitch" style="width: 200px"
                          onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <el-form-item label="定制备注">
                <el-input v-model="form1.ctmcomment" style="width: 560px"></el-input>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-bottom: 22px;" />
            <el-form-item label="加项费">
                <el-switch v-model="form1.adtswitch" @change="adtchanged"></el-switch>
            </el-form-item>
            <el-form-item label="加项金额" prop="adt"
                          :rules="[{required:form1.adtswitch,message:'请填写金额'},{type:'number',message:'必须为数字'}]">
                <el-input v-model.number="form1.adt" :disabled="!form1.adtswitch" style="width: 200px"
                          onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <el-form-item label="加项备注">
                <el-input v-model="form1.adtcomment" style="width: 560px"></el-input>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-bottom: 22px;" />
            <el-form-item label="其他费用">
                <el-switch v-model="form1.othswitch" @change="othchanged"></el-switch>
            </el-form-item>
            <el-form-item label="其他金额" prop="oth"
                          :rules="[{required:form1.othswitch,message:'请填写金额'},{type:'number',message:'必须为数字'}]">
                <el-input v-model.number="form1.oth" :disabled="!form1.othswitch" style="width: 200px"
                          onkeypress="return (event.charCode===46) || (event.charCode>=48 && event.charCode <=57)">
                </el-input>
            </el-form-item>
            <el-form-item label="其他备注">
                <el-input v-model="form1.othcomment" style="width: 560px"></el-input>
            </el-form-item>
            <hr style="height:1px;border:none;border-top:1px dashed #0066CC;margin-bottom: 22px;" />
            <el-form-item label="合计金额">
                <el-input v-model="form1.ctm+form1.adt+form1.oth" :readonly="true" style="width: 120px"></el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary" :disabled="!cando" :loading="loading" @click="consume">消费</el-button>
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
                    ctm: 0,
                    ctmcomment: '',
                    ctmswitch: false,
                    adt: 0,
                    adtcomment: '',
                    adtswitch: false,
                    oth: 0,
                    othcomment: '',
                    othswitch: false
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
            consume() {
                if (this.form1.ctm + this.form1.adt + this.form1.oth === 0) {
                    this.$message.error('合计金额不能为0');
                    return;
                }
                this.$refs["form1"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + `card/${this.idnumber}/consume`,{
                            ctm: this.form1.ctm,
                            ctmcomment: this.form1.ctmcomment,
                            adt: this.form1.adt,
                            adtcomment: this.form1.adtcomment,
                            oth: this.form1.oth,
                            othcomment: this.form1.othcomment,
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
            },
            ctmchanged() {
                if (!this.form1.ctmswitch)
                    this.form1.ctm = 0;
            },
            adtchanged() {
                if (!this.form1.adtswitch)
                    this.form1.adt = 0;
            },
            othchanged() {
                if (!this.form1.othswitch)
                    this.form1.oth = 0;
            }
        },
        components:{
            baseinfo
        }
    }
</script>

<style>
    .csf1 {
        width: 640px;
        height: 44px;
        background-color: white;
        padding: 20px 30px 20px 20px;
        margin-bottom: 12px;
    }
    .csf2 {
        width: 650px;
        background-color: white;
        padding: 20px;
        margin-bottom: 12px;
    }
</style>