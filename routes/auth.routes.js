const {Router} = require('express');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/register', async (req, res) => {
    try {
       
        const {email, password} = req.body;

        const condidate = await User.findOne({ email });
        if(condidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }

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