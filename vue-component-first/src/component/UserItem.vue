<template>
    <div class="user-item">
        <span>{{ user.name }} {{ user.email }}</span>
        <button @click="handleDelete">删除</button>
    </div>
</template>

<script>
    export default{
        name: 'UserItem',
        props: {
            user:{
                type: Object,
                required: true
            }
        },
        methods: {
            handleDelete(){
                //自定义事件
                this.$emit('delete-user', this.user.id)
            }
        }
    }
</script>

<style scoped>
    .user-item{
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 8px;
       border-bottom: 1px solid #eee;
    }

    .user-item button {
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
    }

    .user-item button:hover {
        background-color: #d32f2f;
    }
</style>