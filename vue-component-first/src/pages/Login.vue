<template>
  <div>
    <h1>登录页面</h1>
    <input type="text" placeholder="请输入用户名" v-model="username"/>
    <input type="password" placeholder="请输入密码" v-model="password"/>
    <button @click="login">登录</button>
    <p v-if="errorMeg">{{ errorMeg }}</p>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMeg: ''
      };
    },
    methods: {
      async login() {
        try {
          const res = await axios.post('http://localhost:3000/login', {
            username: this.username,
            password: this.password
          })
          // 返回token
          const token = res.data.token;
          // 存储token
          localStorage.setItem('token', token);

          // 获取当前用户信息
          // 后端通常期待字符串形式的 Authorization 头（例如 "Bearer <token>"），
          const userRes = await axios.get('http://localhost:3000/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          localStorage.setItem('user',JSON.stringify(userRes.data))

          // 登录成功后跳转到仪表盘页面
          this.$router.push('/dashboard');
        }catch(err){
          this.errorMeg = err.response?.data?.error || '登录失败，用户名或密码错误';
        }
      }
    }
}
</script>

