import express from "express";
import * as authController from "../controllers/authControllers"
import * as userController from "../controllers/userControllers"
import * as cardController from "../controllers/cardControllers"
import * as historyController from "../controllers/historyControllers"
import * as billController from "../controllers/billController"
import * as notificationController from "../controllers/notificationController"

const router = express.Router()

// auth route
router.post('/auth', authController.checkTokenExpiredController)
router.post('/auth/login', authController.loginController)
router.post('/auth/register', authController.registerController)
router.post('/auth/changepass', authController.changePassWordController)
router.post('/auth/dvtoken', authController.updateTokenDeviceController)

// user route
router.get('/user', userController.getAllUsersController)
router.post('/user/id', userController.getUserByIdController)
router.post('/user/update', userController.updateUserController)
router.post('/user/delete', userController.deleteUserController)

// card route
router.get('/card', cardController.getAllCardController)
router.get('/card/noac', cardController.getCardWithoutAccountController)
router.post('/card/add', cardController.createCardController)
router.post('/card/update', cardController.updateCardController)
router.post('/card/delete', cardController.deleteCardController)

// bill route
router.post('/bill', billController.getBillController)
router.get('/bill/all', billController.getAllBillController)
router.post('/bill/pay', billController.payBillController)

// history route
router.get('/history', historyController.getHistoryController)
router.post('/history/id', historyController.getHistoryByIdController)

// notification
router.post('/notification', notificationController.notificationController)

export default router