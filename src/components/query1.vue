<template>
    <div>
        <el-form label-width="80px" @submit.native.prevent class="q1f1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber"
                          @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <qtable v-for="t in tbls" :key="t.dbt" ref="qt"></qtable>
    </div>
</template>

<script>
    import qtable from './qtable.vue';

    export default {
        data() {
            return {
                idnumber: '',
                tbls:[
                    {dbt:'Cardbaseinfo', label:'基本信息'},
                    {dbt:'RegCardinfo', label:'开卡记录'},
                    {dbt:'CardAddYearinfo', label:'续卡记录'},
                    {dbt:'ChangeCardinfo', label:'转卡记录'},
                    {dbt:'Moneydetail', label:'收费记录'},
                    {dbt:'ConsumeRecord', label:'消费记录'},
                    {dbt:'ConsumeRecordByCardMoney', label:'余额消费记录'},
                    {dbt:'ChangeInfo', label:'修改信息记录'},
                    {dbt:'ChangePeriod', label:'修改有效期记录'},
                    {dbt:'ReturnCardinfo', label:'退卡记录'}
                ]
            }
        },
        methods: {
            dosearch0() {
                this.idnumber = this.idnumber.replace(/^\s+/, "").replace(/\s+$/, "");
                if (this.idnumber.length !== 18) {
                    this.$message.error('证件号码格式错误');
                    return;
                }
                this.tbls.forEach((v,index)=>{
                    this.$refs['qt'][index].query(this.idnumber, v.dbt, v.label);
                });
            }
        },
        components:{
            qtable
        }
    }
</script>

<style>
    .q1f1 {
        width: 400px;
        background-color: white;
        padding: 20px 30px 2px 8px;
        margin-bottom: 12px;
        box-sizing: border-box;
    }
</style>