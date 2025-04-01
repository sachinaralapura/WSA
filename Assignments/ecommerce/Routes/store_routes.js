import { Router } from "express"
import { createOrder, deleteOrder, getAllOrders, updateOrderStatus } from "../Controllers/store_controller.js"
const router = Router()
import { body } from "express-validator"

const orderValidationRules = [
    body('userName').notEmpty().withMessage('Username is required'),
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.name').notEmpty().withMessage('Item name is required'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('Item price must be a positive number'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Item quantity must be a positive integer'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
    body('status').optional().isIn(['pending', 'shipped', 'delivered']).withMessage('Invalid status value')
];

const updateOrderStatusValidationRules = [
    body('status').isIn(['pending', 'shipped', 'delivered']).withMessage('Invalid status value')
];

// Routes
router.post('/orders', orderValidationRules, createOrder);
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatusValidationRules, updateOrderStatus);
router.delete('/orders/:id', deleteOrder);


export default router