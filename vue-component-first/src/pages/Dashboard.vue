<template>
    <!-- 仪表盘页面 -->
     <div class="dashboard">
        <!-- 导航栏 -->
        <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/dashboard">用户管理</router-link>
        </nav>
        <!-- 子页面 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
    name: 'Dashboard'
}
</script>
<style scoped>

</style>