    <template>
        <div id="app">
            <h2>Day Tasks</h2>
            <!-- 添加任务输入框和按钮 -->
            <div class="add-task">
                <input type="text" v-model="newTaskTitle" @keyup.enter="addTask" placeholder="输入一个任务">
                <button @click="addTask">添加任务</button>
            </div>
            <task-item v-for="task in tasks" :key="task.id" :title="task.title" :done="task.done" @toggle-done="toggleTaskDone(task.id)"></task-item>
        </div>
    </template>

    <script>
    import TaskItem from './component/TaskItem.vue';

        export default{
            name: 'App1',
            components:{
                TaskItem
            },
            data(){
                return{
                     tasks:[
                        {id:1, title: "one", done: true},
                        {id:2, title: "two", done: true},
                        {id:3, title: "three", done: false},
                     ],
                    newTaskTitle:'Xu xin xin'
                    }
            },
                
            methods: {
                // 添加任务方法
                addTask(){
                    const title = this.newTaskTitle.trim()
                    this.tasks.push({
                        id: Date.now(),
                        title,
                        done:false,
                    })
                    this.newTaskTitle = '';
                },

                // 切换任务完成状态
                toggleTaskDone(id){
                    const task = this.tasks.find(t => t.id === id)
                    if(task){
                        task.done = !task.done;
                    }
                }
            }

        }

    </script>

    <style>
        .app {
            max-width: 400px;
            margin: 40px auto;
            padding: 20px;
            font-family: system-ui, sans-serif;
            border: 1px solid #eee;
            border-radius: 12px;
            background: #fafafa;
    }
        h2 {
            width: 200px;
            margin:10px auto;
            margin-top: 0;
            color: #333;
        }
    </style>