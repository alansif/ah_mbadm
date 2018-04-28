<template>
    <div class="layout1">
        <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="证件号">
                <el-input v-model="form1.idnumber">
                    <el-button slot="append" icon="el-icon-search" @keyup.enter.native="doSearch"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form1: {
                    idnumber: '333444'
                }
            }
        },
        methods: {
            doSearch() {
                console.log(this.idnumber);
            }
        }
    }
</script>

<style>
    .layout1 {
        width: 800px;
        height: 500px;
        background-color: white;
    }
</style>