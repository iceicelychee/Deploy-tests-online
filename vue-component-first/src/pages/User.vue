<template>
    <!-- 用户管理 -->
    <div>
        <h2>用户列表</h2>
        
        <!-- 添加用户表单 -->
        <div class="add-user">
            <input type="text" placeholder="请输入姓名" v-model="newName">
            <input type="email" placeholder="请输入邮箱" v-model="newEmail">
            <button @click="addUser">添加用户</button>
        </div>

        <!-- 用户列表 -->
        <p v-if="users.length === 0">暂无用户，请添加</p>
        <div 
            v-for="user in users"
            :key="user.id"
            class="user-row"
        >
            <!-- 编辑模式 -->
            <template v-if="editingUserId === user.id">
                <input type="text" v-model="editForm.name" placeholder="姓名">
                <input type="text" v-model="editForm.email" placeholder="邮箱">
                <button @click="saveEdit(user.id)">保存</button>
                <button @click="cancelEdit">取消</button>
            </template>

            <!-- 显示模式 -->
            <template v-else>
                <span>{{ user.name }} {{ user.email }}</span>
                <!-- 显示编辑按钮 权限为admin 和 本人 -->
                <button 
                    class="edit-btn"
                    v-if="currentUser.role === 'admin' || currentUser.id === user.id"
                    @click="startEdit(user)"
                >
                    编辑
                </button>
                <button class="delete-btn" @click="handleDelete(user.id)">删除</button>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        name: "User",
        /*
                    { id: 1 , name: '徐欣薪', email: 'xuxinxin@example.com'},
                    { id: 2 , name: '徐如生', email: 'xurusheng@example.com'},
                    { id: 3 , name: '徐志明', email: 'xuzhiming@example.com'},
        */ 
        data(){
            return{
                users: [],
                newName: '',
                newEmail: '',
                currentUser: JSON.parse(localStorage.getItem('user')) || {}, // 登录当前用户信息
                editingUserId: null,
                editForm: { name: '', email: ''}
            }
        },
        mounted(){
            // 页面加载时获取用户数据
            this.fetchUsers();
        },
        methods: {
            // 获取用户数据
            async fetchUsers(){
                try{
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                     });
                    this.users = res.data;
                }catch(error){
                    console.error('获取用户数据失败:', error);
                }
            },
            // 添加用户
            async addUser(){
                try{
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`,{
                        name: this.newName,
                        email: this.newEmail        },
                    {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
                    )
                // 输入为假时不添加
                if(!this.newName || !this.newEmail){
                    alert('请输入姓名和邮箱');
                    return;
                }
                // 将用户添加到用户列表
                this.users.push(response.data);
                this.newName = '';
                this.newEmail = '';
                }catch(error){
                    console.error('添加用户失败:', error);
                }
            },
            async handleDelete(userId){
              try{
                 await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`,{
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                 });
                // 从用户列表中删除用户
                this.users = this.users.filter(user => user.id !== userId);
              }catch(error){
                console.error('删除用户失败:', error);
              }
             },
            // 开始编辑
            startEdit(user){
                this.editingUserId = user.id;
                this.editForm = { name: user.name, email: user.email };
            },
            // 取消编辑
            cancelEdit(){
                this.editingUserId = null;
                this.editForm = { name: '', email: '' };
            },
            // 保存编辑
            async saveEdit(userId){
                try{
                    const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                        name: this.editForm.name,
                        email: this.editForm.email
                    },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
                );
                    // 更新本地用户数据
                    const index = this.users.findIndex(u => u.id === userId);
                    if(index !== -1){
                        this.users[index] = response.data;
                    }
                    this.editingUserId = null;
                    this.editForm = { name: '', email: '' };
                }catch(error){
                    console.error('保存编辑失败:', error);
                }
            }
        }
           
    }
</script>

<style scoped>
    h2{
        color: #333;
        margin-bottom: 16px;
    }
    .add-user{
        margin-bottom: 20px;
    }
    .add-user input{
        padding: 8px;
        margin-right: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .add-user button{
        padding: 8px 16px;
        background-color: #42b983;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .user-row{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .user-row span{
        padding: 8px;
        margin-right: 8px;
        border-bottom: 1px solid #ccc;
    }
    .user-row button{
        margin-right: 8px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    /* 编辑按钮 - 黄色 */
    .user-row .edit-btn{
        background-color: #ffc107;
        color: #333;
    }
    .user-row .edit-btn:hover{
        background-color: #ffb300;
    }
    /* 删除按钮 - 红色 */
    .user-row .delete-btn{
        background-color: rgb(212, 54, 54);
        color: white;
    }
    .user-row .delete-btn:hover{
        background-color: rgb(185, 42, 42);
    }
</style>