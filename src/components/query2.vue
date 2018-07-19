<template>
    <div>
        <el-form :inline="true" label-width="80px" @submit.native.prevent class="q2f1">
            <el-form-item label="有效期起">
                <el-date-picker
                        v-model="from0"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="from1"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="有效期止">
                <el-date-picker
                        v-model="to0"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="至" label-width="22px">
                <el-date-picker
                        v-model="to1"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        style="width: 140px">
                </el-date-picker>
            </el-form-item>
            <div style="text-align: center">
                <el-button type="primary" :loading="loading" @click="doquery" style="width: 160px">查询</el-button>
                <el-button @click="exportfile" :disabled="restbl.length === 0" style="width: 160px">导出{{restbl.length}}项</el-button>
            </div>
        </el-form>
        <qtable ref="qtr2"></qtable>
    </div>
</template>

<script>
    import qtable from './qtable.vue';
    import {restbase,reserr} from '../restapi.js';

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

//        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        CSV = '\ufeff' + CSV;

        //Generate a file name
        var fileName = "";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g,"_");
        fileName += '.csv';

        var blob = new Blob([CSV], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    export default {
        data() {
            return {
                from0: '',
                from1: '',
                to0: '',
                to1: '',
                loading: false,
                restbl: []
            }
        },
        methods: {
            doquery() {
                this.restbl = [];
                this.loading = true;
                this.$axios.get(restbase() + 'query/period',{params:{
                    from0: this.from0,
                    from1: this.from1,
                    to0: this.to0,
                    to1: this.to1
                }}).then(response => {
                    this.loading = false;
                    const d = response.data.data;
                    this.restbl = d;
                    this.$refs['qtr2'].showtable(d);
                })
                .catch(error => {
                    this.loading = false;
                    if (error) {
                        console.dir(error);
                        this.$message.error(reserr(error));
                    }
                });
            },
            exportfile() {
                JSONToCSVConvertor(this.restbl, 'export', true);
            }
        },
        components:{
            qtable
        }
    }
</script>

<style>
    .q2f1{
        width: 410px;
        background-color: white;
        padding: 20px;
        margin-bottom: 8px;
    }
</style>