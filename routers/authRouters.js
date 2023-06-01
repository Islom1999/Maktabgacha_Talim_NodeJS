const {Router} = require('express')
const upload = require('../utils/fileUpload')

const {
    getLogin,
    adminLogin,
    adminLogOut
} = require('../controls/authControls')


const router = Router()

router.get('/login', getLogin)
router.post('/login', adminLogin)
router.post('/logout', adminLogOut)


module.exports = router









