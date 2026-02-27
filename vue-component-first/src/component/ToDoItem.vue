<template>
    <input type="checkbox" :id="id" v-bind:checked="isDone">
    <label for="to-do-item">{{label}}</label>
</template>

<script>
    export default{
        props:{
            label:{
                required: true,
                type: String,
            },
            done:{
                default: false,
                type: Boolean,
            }
        },
        data(){
            return{
                isDone: this.done,
                id: "to-do" + crypto.randomUUID(),
            };
        },
    }
</script>

<style scoped>
    ul{
        list-style: none;
    }
</style>