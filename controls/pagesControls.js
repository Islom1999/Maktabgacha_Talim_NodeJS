
const Workers = require('../models/workers')
const Groups = require('../models/groups')
const Children = require('../models/children')
const ChildrenOrder = require('../models/childrenOrder')
const Admins = require('../models/admin')


// Dashboard Pages and Events
const getDashboard = async(req, res) => {
    try {
        const workers = await Workers.find().lean()
        const children = await Children.find().lean()
        const groups = await Groups.find().lean().populate('children').populate('teacher')

        let amount1 = 0
        workers.forEach(worker =>{
            amount1 += worker.amount
        })
        let amount2 = 0
        children.forEach(children =>{
            amount2 += children.amount
        })

        const dashboard = {
            workers: workers.length,
            children: children.length,
            workersAmount: amount1,
            childrenAmount: amount2
        }
        const workersData = await Workers.find().lean().populate('groups')
        const childrenData = await Children.find().lean().populate('groups')

        res.render('dashboard', {
            title: 'Asosiy sahifa',
            dashboard,
            workers: workersData,
            children: childrenData,
            groups,
            public: 'public',
            isAdmin: req.session.isAdmin
        })
    } catch (error) {
        console.log(error)
    }
}
const getOrder = async(req, res) => {
    try {
        res.render('orderChild', {
            title: 'Ariza qoldirish sahifasi',
            public: 'public'
        })
    } catch (error) {
        console.log(error)
    }
}
const newOrderCreate = async(req, res) => {
    try {
        await ChildrenOrder.create(req.body)
        res.redirect('/child/order/table')
    } catch (error) {
        console.log(error)
    }
}
const getOrderTable = async(req, res) => {
    try {
        const childrenOrders = await ChildrenOrder.find().lean()
        res.render('orderChildTable', {
            title: 'Novbat sahifasi',
            public: 'public',
            childrenOrders
        })
    } catch (error) {
        console.log(error)
    }
}
const getOrderTableAdmin = async(req, res) => {
    try {
        const childrenOrders = await ChildrenOrder.find().lean()
        const groups = await Groups.find().lean().populate('children').populate('teacher')
        res.render('orderChildTableAdmin', {
            title: 'Novbat sahifasi',
            childrenOrders,
            groups
        })
    } catch (error) {
        console.log(error)
    }
}


// Home Pages and Events
const getWorker = async(req, res) => {
    try {
        const workers = await Workers.find().lean().populate('groups')
        const groups = await Groups.find().lean()

        res.render('workers', { 
            title: 'Xodimlar sahifasi',
            workers,
            groups
        })
    } catch (error) {
        console.log(error)
    }
}

// Children Pages and Events
const getChildren = async(req, res) => {
    try {
        const children = await Children.find().lean().populate('groups')
        const groups = await Groups.find().lean().populate('children').populate('teacher')
        const workers = await Workers.find().lean()
        
        res.render('childrens', {
            title: 'Guruhlar sahifasi',
            children,
            groups,
        })
    } catch (error) {
        console.log(error)
    }
}

// Children Pages and Events
const getSetting = async(req, res) => {
    try {
        const groups = await Groups.find().lean().populate('teacher')
        const teachers = await Workers.find({status: "Tarbiyachi"}).lean()

        res.render('settings', {
            title: 'Sozlamalar sahifasi',
            groups,
            workers: teachers
        })
    } catch (error) {
        console.log(error) 
    }
}

// Admins Pages and Events
const getAdmin = async(req, res) => {
    try {
        const admins = await Admins.find().lean()

        res.render('admins', {
            title: 'Adminlar sahifasi',
            admins
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getDashboard,
    getWorker,
    getChildren,
    getSetting,
    getAdmin,
    getOrder,
    getOrderTable,
    newOrderCreate,
    getOrderTableAdmin
}