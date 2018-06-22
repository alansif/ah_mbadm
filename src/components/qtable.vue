<template>
    <transition name="el-zoom-in-top">
        <div v-show="show">
            <div class="qtd1">
                <div style="margin-bottom: 8px;font-size: 14px;">{{label}}</div>
                <el-table :data="tableData" border stripe :max-height="500" style="width: 100%">
                    <el-table-column
                            v-for="col in cols" :key="col.label"
                            :prop="col.prop" :label="col.label" :width="col.width">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </transition>
</template>

<script>
    import {restbase,reserr} from '../restapi.js';

    function getStringLen(str) {
        if (typeof str !== 'string') return 0;
        let l = str.length;
        let blen = 0;
        for(let i=0; i<l; i++) {
            if ((str.charCodeAt(i) & 0xff00) !== 0) {
                blen ++;
            }
            blen ++;
        }
        return blen;
    }

    export default {
        data() {
            return {
                show: false,
                label: '',
                tableData:[],
                cols:[]
            }
        },
        methods:{
            query(id, dbt, label) {
                this.label = label;
                this.$axios.get(restbase() + 'dossier',{params:{id:id,tbname:dbt}})
                    .then(response => {
                        const d = response.data.data;
                        this.showtable(d);
                    })
                    .catch(error => {
                        if (error) {
                            console.dir(error);
                            this.$message.error(reserr(error));
                        }
                    });
            },
            showtable(d) {
                if (d.length > 0) {
                    this.cols = [];
                    for(let k in d[0]) {
                        let a = d[0][k];
                        let len = a ? getStringLen(a.toString()) : 8;
                        if (len < 8) len = 8;
                        this.cols.push({prop:k, label:k, width: len * 9 + 16});
                    }
                    this.tableData = d;
                    this.show = true;
                } else {
                    this.tableData = [];
                    this.show = false;
                }
            }
        }
    }
</script>

<style>
    .qtd1{
        width: 100%;
        padding: 12px;
        background-color: white;
        margin: 20px 10px 20px 0;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #ccc;
    }
</style>