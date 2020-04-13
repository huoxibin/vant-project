<!--
* author: huoxibin
* created: 2020/3/27
* describe:
-->
<template>
    <div class="conent">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">

                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">一级标题</span>
                </template>

                <el-menu-item index="1-1">
                    <i class="el-icon-location"></i>
                    <span slot="title">二级标题（无三级标题）</span>
                </el-menu-item>

                <el-submenu index="1-2">
      <span slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">二级标题（有三级标题）</span>
      </span>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-location"></i>
                        <span slot="title">三级标题1</span>
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">

                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">一级标题</span>
                </template>

                <el-menu-item index="1-1">
                    <i class="el-icon-location"></i>
                    <span slot="title">二级标题（无三级标题）</span>
                </el-menu-item>

                <el-submenu index="1-2">
      <span slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">二级标题（有三级标题）</span>
      </span>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-location"></i>
                        <span slot="title">三级标题1</span>
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">

                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">一级标题</span>
                </template>

                <el-menu-item index="1-1">
                    <i class="el-icon-location"></i>
                    <span slot="title">二级标题（无三级标题）</span>
                </el-menu-item>

                <el-submenu index="1-2">
      <span slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">二级标题（有三级标题）</span>
      </span>
                    <el-menu-item index="1-4-1">
                        <i class="el-icon-location"></i>
                        <span slot="title">三级标题1</span>
                    </el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

    export default {
        name: "daohang",
        components: {},
        data() {
            return {
                isCollapse: true
            }
        },
        created() {

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted() {

        },
        watch: {},
        computed: {}
    }
</script>

<style lang="scss" scoped>

</style>