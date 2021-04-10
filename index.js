// 백엔드 시작점

const express = require('express')
const app = express()
const port = 5000

const { User } = require("./models/User");
const bodyParer = require('body-parser');

const config = require('./config/key');

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))

// application/x-www-form-urlencoded
app.use(bodyParer.urlencoded({ extended: true }));
// application/json
app.use(bodyParer.json());

app.post('/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    user.save((err, userInfo) => { // mongoDB에서 오는 method : save
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ // 200은 성공했다는 의미
            success: true
        })
    })
})

app.get('/', (req, res) => res.send('Hello World! ~하이~~~'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))