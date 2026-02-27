<script>
import ToDoItem from './component/ToDoItem.vue';

    export default{
      name: 'App',
      components:{
        ToDoItem,
      },
      
    }

</script>

<template>
  <div id="app">
    <h1>To-Do-List</h1>
    <ul>
      <li>
        <to-do-item label="My First Component" :done="true"></to-do-item>
        <to-do-item label="My Second Component" :done="false"></to-do-item>
        
      </li>
    </ul>
  </div>
</template>

<style scoped>
  h1{
    width: 200px;
    color: #42b983;
    margin: 0 auto;
  }
  ul{
    list-style: none;
  }
  
</style>
