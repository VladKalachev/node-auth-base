const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body;
        // Проверяем есть ли такой пользователь в базе
        const condidate = await User.findOne({ email });
        if(condidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }
        // Шифруем пароль
        const hashedPassword = await bcrypt.hash(password, 12);
        // Создаем нового пользователя
        const user = new User({ email, password: hashedPassword });
        // Сохраняем пользователя в базе
        await user.save();

        res.status(201).json({ message: 'Пользователь создан' });

    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

// /api/auth/login
router.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;