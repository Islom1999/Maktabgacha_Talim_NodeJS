
const protuctedAdmin = async(req,res,next) => {
    try {
        if(req.session.isAdmin && req.session.isLogin){
            next()
        }else{
            res.redirect('/admin/login')
        }
    }catch(err) {
        console.log(err)
    }

}

const protuctedUser = async(req,res,next) => {
    try {
        console.log(req.session)
        if(req.session.isUser && req.session.isLogin){
            next()
        }else{
            res.redirect('/')
        }
    }catch(err) {
        console.log(err)
    }

}


module.exports = {
    protuctedAdmin,
    protuctedUser
}

