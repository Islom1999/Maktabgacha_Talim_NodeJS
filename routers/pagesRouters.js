const {Router} = require('express')
const upload = require('../utils/fileUpload')

const {
    getDashboard,
    getWorker,
    getChildren,
    getSetting,
    getAdmin,
    getOrderTableAdmin,
} = require('../controls/pagesControls')

const {
    createWorker,
    updateWorker,
    deleteWorker,

    createChildren,
    updateChildren,
    deleteChildren,

    createGroup,
    updateGroup,
    deleteGroup,

    createAdmin,
    updateAdmin,
    deleteAdmin,

    childrenCreateOrder,
    deleteOrder
} = require('../controls/crudControls')


const router = Router()

// router.get('/', getDashboard)

router.get('/order/table', getOrderTableAdmin)
router.post('/children/create/order/:id', childrenCreateOrder)
router.post('/order/delete/:id', deleteOrder)

router.get('/workers', getWorker)
router.post('/worker/create', createWorker)
router.post('/worker/delete/:id', deleteWorker)
router.post('/worker/update/:id', updateWorker)


router.get('/groups', getChildren)
router.post('/children/create', createChildren)
router.post('/children/delete/:id', deleteChildren)
router.post('/children/update/:id', updateChildren)


router.get('/settings', getSetting)
router.post('/group/create', createGroup)
router.post('/group/delete/:id', deleteGroup)
router.post('/group/update/:id', updateGroup)

router.get('/admins', getAdmin)
router.post('/admin/create', createAdmin)
router.post('/admin/delete/:id', deleteAdmin)
router.post('/admin/update/:id', updateAdmin)

module.exports = router









