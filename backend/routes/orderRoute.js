import express from 'express';
import { placeOrder,placeOrderRazorpay,allOrders,updateStatus,userOrders } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;