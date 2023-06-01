const {Router} = require('express')
const upload = require('../utils/fileUpload')

const {
    getDashboard,
    getWorker,
    getChildren,
    getSetting,
    getAdmin,
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
} = require('../controls/crudControls')


const router = Router()

router.get('/', getDashboard)

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









