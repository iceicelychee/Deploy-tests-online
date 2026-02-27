<template>
    <div class="task-item" :class="{done: done}" @click="$emit('toggle-done')">
        {{ title }}
    </div>
</template>

<script>
    export default{
       props:{
          title:{
                type: String,
          },
          done:{
                type: Boolean,
          },
          
       },
       emits: ['toggle-done']
    }
</script>

<style scoped>
    .task-item {
        padding: 10px 16px;
        margin: 8px 0;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        background-color: #fff;
        transition: all 0.2s;
        font-size: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .done{
        text-decoration: line-through;
        color: #9ca3af;
        background-color: #f3f4f6;
        border-color: #d1d5db;
    }
</style>