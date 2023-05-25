const {Router} = require('express')
const controller =  require('./controller')

const router = Router()

router.get('/', controller.getUsers)
router.get('/:id', controller.getUserById)
router.post('/', controller.addUser)
// router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)
router.post('/login', controller.loginUser)
router.post('/register', controller.registerUser)

module.exports = router