<template>
    <div id="app">
        <el-container style="position: absolute;top:0;bottom: 0;left: 0;width: 100%;">
            <el-header>
                <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="float: right">
                    <el-menu-item index="/">{{realname}}</el-menu-item>
                    <el-submenu index="2" v-show="false">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/a" v-show="false">订单管理</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="180px">
                    <el-menu :router="true" :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu index="1" v-show="false">
                            <template slot="title"><i class="el-icon-message"></i>导航一</template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="/3"><i class="el-icon-menu"></i>开卡</el-menu-item>
                        <el-menu-item index="/4"><i class="el-icon-d-arrow-right"></i>续卡</el-menu-item>
                        <el-menu-item index="/5"><i class="el-icon-sort"></i>转卡</el-menu-item>
                        <el-menu-item index="/6"><i class="el-icon-sold-out"></i>预存</el-menu-item>
                        <el-menu-item index="/7"><i class="el-icon-delete"></i>退卡</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <transition name="el-fade-in-linear" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="登录" :visible.sync="dialogVisible" width="360px"
                   center
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                    :show-close="false">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="login">登录</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {restbase} from './restapi.js';
    export default {
        data() {
            return {
                dialogVisible: true,
                username: '',
                password: '',
                realname: '[登录]'
            }
        },
        mounted() {
        },
        methods: {
            login() {
                this.$axios.post(restbase() + 'login', {username:this.username, password:this.password})
                    .then(response => {
                        this.realname = response.data.data['username'];
                        this.dialogVisible = false;
                    })
                    .catch(function(error){
                        console.log(error.response);
                    });
            }
        }
    }
</script>

<style scoped>
    .el-menu {
        border-right-width: 0;
    }

    .el-header, .el-footer {
        background-color: #545c64; /* #B3C0D1 */
        color: #333;
        text-align: center;
    }

    .el-aside {
        background-color: #545c64; /* #D3DCE6 */
        color: #333;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
</style>
