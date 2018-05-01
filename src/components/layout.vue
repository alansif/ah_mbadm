<template>
    <div>
        <el-form ref="form1" :model="form1" label-width="60px" @submit.native.prevent class="layout1">
            <el-form-item label="证件号">
                <el-input v-model="form1.idnumber" @keyup.enter.native="dosearch0">
                    <el-button slot="append" icon="el-icon-search" @click="dosearch0"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" ref="form1" :model="form1" label-width="60px" class="layout2">
            <el-form-item label="姓名">
                <el-input v-model="form1.name" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form1.sex" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form1.sex" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form1.sex" readonly="true"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form1: {
                    idnumber: '333444',
                    name: '',
                    sex: '',
                    mobile: '',
                    address: ''
                }
            }
        },
        methods: {
            dosearch0() {
                console.log(this.form1.idnumber);
            }
        }
    }
</script>

<style>
    .layout1 {
        width: 560px;
        height: 44px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
    .layout2 {
        width: 560px;
        height: 108px;
        background-color: white;
        padding: 20px 20px;
        margin-bottom: 12px;
    }
</style>