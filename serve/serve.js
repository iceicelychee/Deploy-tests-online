const express = require('express');
const fs = require('fs');
const path = require('path');

// 引入环境变量
require('dotenv').config()
const jwt = require('jsonwebtoken')


const app = express();
// 端口配置
const PORT = process.env.PORT || 5000;


// 读取用户数据
const dataFile = path.join(__dirname, 'users.json')

// 跨领域请求 中间件
const cors = require('cors')
app.use(cors())

// 根路由： 测试
app.get('/', (req ,res) => {
    res.json( { message: 'API 运行正常'})
})

// 解析 JSON 请求体
app.use(express.json())

// 注册登入接口
const login = require('./login')
login(app, readUsers, writeUsers)


// 验证JWT 中间件
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // 没有 token 返回 401
    if( !token) {
        return res.sendStatus(401)
    }
    // 验证 token真伪
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            // token 为伪 返回 403
            return res.sendStatus(403)
        }
        // token 为真 将用户信息存储在请求对象中 供后续处理使用
        req.user = user
        next()
    })
}


//  从文件读取用户数据
function readUsers(){
    try{
        const data = fs.readFileSync(dataFile, 'utf-8')
        return JSON.parse(data)
    }catch(error){
        console.error('读取用户数据失败:', error);
        // 读取失败 返回空数组
        return []
    }
}

// 写入用户数组到文件
function writeUsers(users){
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), 'utf-8')
}

// 获取当前登录用户信息
app.get('/users/me', authenticateToken, (req, res) => {
    const users = readUsers()
    const user = users.find(u => u.id === req.user.id)
    if(!user) return res.status(404).json({ message: '用户不存在'})
    // 返回时不含密码
    const { password, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
})

// 获取用户列表
app.get('/users', authenticateToken,(req, res) => {
    const users = readUsers()
    // 权限判断
    if(req.user.role === 'admin'){
        // admin 返回所有用户 过滤密码
        const usersWithoutPassword = users.map(({password, ...rest}) => rest);
        res.json(usersWithoutPassword)
    }else{
        // 普通用户只返回自己的信息
        const user = users.find(u => u.id === req.user.id)
        if(!user) return res.json(404).json({ message: '用户不存在'})
        const {password, ...userWithoutPassword} = user
        res.json([userWithoutPassword]) // 返回数组格式，方便前端渲染
    }
})

// 新增用户
app.post('/users', authenticateToken, (req, res) => {
    const { name, email } = req.body;
    if( !name || !email ) {
        return res.status(400).json({ error: '姓名和邮箱不能为空' })
    }
    const users = readUsers()
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };
    users.push(newUser);
    writeUsers(users)
    res.status(201).json(newUser);
}) 

// 编辑用户
app.put('/users/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email} = req.body;
    // 权限检查
    if(req.user.role !== 'admin' && req.user.id !== id){
        return res.status(403).json({ message: '无权更改其他用户信息'})
    }
    const users = readUsers()
    const index = users.findIndex(u => u.id === id)
    if(index === -1) return res.status(404).json({ message: '用户不存在'})
    // 更新字段
    if(name) users[index].name = name
    if(email) users[index].email = email
    // 写回文件
    writeUsers(users)
    // 返回更新后的用户信息
    const {password, ...UpateUser} = users[index]
    res.json(UpateUser)

})


// 删除用户
app.delete('/users/:id', authenticateToken, (req, res) => {
    const Id = parseInt(req.params.id)
    const users = readUsers()
    const index = users.findIndex(user => user.id === Id)
    if( index === -1) {
        return res.status(404).json( { error: '用户不存在' })
    }
    
    users.splice(index, 1)
    writeUsers(users)
    // 删除成功 无返回内容
    res.status(204).send()
})

app.listen(port, () => {
    console.log( `服务器已运行在 http://localhost:${port}`)
})