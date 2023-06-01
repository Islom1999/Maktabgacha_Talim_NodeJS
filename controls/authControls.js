const Admins = require('../models/admin')

const getLogin = async(req, res) => {
    try {
        res.render('login', {
            isLoginPage: true,
            title: 'Tizimga kirish'
        })
    } catch (error) {
        console.log(error)
    }
}
const adminLogin = async(req, res) => {
    try {

        const {username, password} = req.body

        const admin = await Admins.findOne({username}).lean()

        if(!admin){
            return res.redirect('/login')
        }else{
            if(admin.password == password){
                req.session.isAdmin = admin
                req.session.isLogin = true
                return res.redirect('/')
            }else{
                return res.redirect('/login')
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}
const adminLogOut = async(req, res) => {
    try {

        req.session.isAdmin = null
        req.session.isLogin = false

        res.redirect('/admin/login')
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    adminLogin,
    getLogin,
    adminLogOut,
}
