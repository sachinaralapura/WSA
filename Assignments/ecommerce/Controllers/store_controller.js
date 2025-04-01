import("express").Request
import("express").Response
import OrderModel from "../Models/store_model.js"
import { matchedData, validationResult } from "express-validator";
/**
 * Creates a new order.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const createOrder = async (request, res) => {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                error: errors.array()[0].msg
            })
        }
        const data = matchedData(request)
        const order = new OrderModel(data)
        await order.save();
        res.status(201).json({ status: true, message: "Added order successful", data: data });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};


/**
 * Get all orders
 *
 * @param {Request} request - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json({ status: true, message: "successful", data: orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 *  Update order status
 * 
 * @param {Request} request - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const updateOrderStatus = async (request, res) => {
    try {
        const id = request.params.id
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                error: errors.array()[0].msg
            })
        }
        const status = matchedData(request)
        const order = await OrderModel.findByIdAndUpdate(id, status, { new: true });
        if (!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }
        res.status(200).json({ status: true, message: "status updated", data: order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Delete an order by ID
 * 
 * @param {Request} request - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        const order = await OrderModel.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ staus: false, message: 'Order not found' });
        }
        res.status(200).json({ status: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
