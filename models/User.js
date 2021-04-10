const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 비밀번호 암호화하는데 필요한 패키지
const saltRounds = 10; // 10자리 salt


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        // wjd whwl@naver.com 이러면 공백이있는데, 공백을 없애주는 역할이 trim..
        unique: 1 // 똑같은 이메일은 못쓰게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // 토큰 유효기간
        type: Number
    }
})

// 유저 모델을 저장하기 전에, 암호화
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) { // 유저 비밀번호가 바뀔때만.
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { // 비밀번호를 바꾸는게 아니라 다른 정보 수정일때.
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User } // User 모델을 다른 곳에서도 쓸수있게