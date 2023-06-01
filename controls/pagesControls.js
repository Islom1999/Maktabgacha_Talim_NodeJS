
const Workers = require('../models/workers')
const Groups = require('../models/groups')
const Children = require('../models/children')
const Admins = require('../models/admin')


// Dashboard Pages and Events
const getDashboard = async(req, res) => {
    try {
        const workers = await Workers.find().lean()
        const children = await Children.find().lean()

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
        const teachers = await Workers.find().lean()

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
}