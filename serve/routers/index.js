const Router = require('koa-router')
const dateNumberController = require('../controllers/date_number')

const router = new Router({
	prefix: '/api'
})

dateNumberController.prefix ='date_number'

router
.post(dateNumberController.getPath('add'), dateNumberController.add)
.get(dateNumberController.getPath(`select`), dateNumberController.find)
.post(dateNumberController.getPath(`remove`), dateNumberController.delect)
.post(dateNumberController.getPath(`update`), dateNumberController.update)

module.exports = router