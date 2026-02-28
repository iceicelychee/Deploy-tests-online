const jwt = require('jsonwebtoken');


module.exports = function(app, readUsers, writeUsers){
    app.post('/login', (req, res) => {
    const { username, password} = req.body;
    // 获取用户数据
    const users = readUsers()
    // 查找匹配的用户
    const user = users.find(u => u.name === username)
    if(!user || user.password !== password){
        // 用户不存在或密码错误 返回 401
         return res.status(401).json({ error: '用户名或密码错误' })  
    }
    // 用户验证成功 生成 token
    const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
    res.json({ token, message: '登录成功' })
})
}