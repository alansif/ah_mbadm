<template>
    <div>
        <el-form ref="form1" label-width="80px" @submit.native.prevent class="rff1">
            <el-form-item label="证件号">
                <el-input :maxlength="18" v-model="idnumber" @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
            <div style="width:100%;text-align: center;">
                <el-button type="primary">退卡</el-button>
            </div>
        </el-form>
        <baseinfo :showme="showbaseinfo"></baseinfo>
    </div>
</template>

<script>
    import baseinfo from './baseinfo.vue';
    export default {
        data() {
            return {
                idnumber: '110101190010104567',
                showbaseinfo: false
            }
        },
        methods: {
            dosearch0() {
                console.log(this.idnumber);
                this.showbaseinfo = !this.showbaseinfo;
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