<template>
    <div id="app">
        <el-container style="position: absolute;top:0;bottom: 0;left: 0;width: 100%;">
            <el-header>
                <div style="float:left; color: white;line-height: 60px; height:60px;">华兆会员系统</div>
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
                        <el-menu-item index="/3" :disabled="dis03"><i class="el-icon-menu"></i>开卡</el-menu-item>
                        <el-menu-item index="/4" :disabled="dis04"><i class="el-icon-d-arrow-right"></i>续卡</el-menu-item>
                        <el-menu-item index="/5" :disabled="dis05"><i class="el-icon-sort"></i>转卡</el-menu-item>
                        <el-menu-item index="/6" :disabled="dis06"><i class="el-icon-sold-out"></i>预存</el-menu-item>
                        <el-menu-item index="/7" :disabled="dis07"><i class="el-icon-delete"></i>退卡</el-menu-item>
                        <el-menu-item index="/9" :disabled="dis09"><i class="el-icon-goods"></i>余额消费</el-menu-item>
                        <el-menu-item index="/b" :disabled="dis0b"><i class="el-icon-date"></i>修改信息</el-menu-item>
                        <el-menu-item index="/8" :disabled="dis08"><i class="el-icon-date"></i>修改效期</el-menu-item>
                        <el-submenu index="">
                            <template slot="title">
                                <i class="el-icon-search"></i>
                                <span slot="title">查询</span>
                            </template>
                            <el-menu-item index="/2" :disabled="dis02">客户查询</el-menu-item>
                            <el-menu-item index="/a" :disabled="dis02">有效期查询</el-menu-item>
                        </el-submenu>
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
            <el-form ref="loginform" :model="loginform">
                <el-form-item label="用户名" prop="username" :rules="[{required:true,message:'请填写用户名'}]">
                    <el-input v-model="loginform.username" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginform.password" type="password" @keyup.enter.native="login"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="loading" @click="login">登录</el-button>
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
                realname: '[登录]',
                loading: false,
                loginform: {
                    username: '',
                    password: '',
                },
                privileges: []
            }
        },
        computed: {
            dis02: function() { return false },
            dis03: function() { return (this.privileges !== '*') && (this.privileges.indexOf('发卡建档') === -1) },
            dis04: function() { return (this.privileges !== '*') && (this.privileges.indexOf('会员续卡') === -1) },
            dis05: function() { return (this.privileges !== '*') && (this.privileges.indexOf('会员转卡') === -1) },
            dis06: function() { return (this.privileges !== '*') && (this.privileges.indexOf('账户预存') === -1) },
            dis07: function() { return (this.privileges !== '*') && (this.privileges.indexOf('会员注销') === -1) },
            dis09: function() { return (this.privileges !== '*') && (this.privileges.indexOf('日常体检') === -1) },
            dis0b: function() { return (this.privileges !== '*') && (this.privileges.indexOf('修改卡信息') === -1) },
            dis08: function() { return (this.privileges !== '*') && (this.privileges.indexOf('修改卡有效期') === -1) }
        },
        mounted() {
        },
        methods: {
            login() {
                this.$refs["loginform"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post(restbase() + 'login', {username:this.loginform.username, password:this.loginform.password})
                            .then(response => {
                                this.realname = response.data.data['username'];
                                this.$root.oprt = this.realname;
                                this.dialogVisible = false;
                                if (this.realname === '管理员') {
                                    this.privileges = '*';
                                } else {
                                    this.privileges = response.data.data['privileges'];
                                }
                            })
                            .catch(error => {
                                this.loading = false;
                                if (error) {
                                    this.$message.error(error.response ? (error.response.data ? error.response.data.status.message : error.response.statusText) : error.message);
                                }
                            });
                    }
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
