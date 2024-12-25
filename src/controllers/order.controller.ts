import { Request, Response } from "express";
import { Order, orders } from "../models/order.model";
import {randomUUID} from 'crypto'

export const addOrder = (req:Request,res:Response)=>{
    try{
        const {productName,quantity,pricePerUnit} = req.body

        if(!productName || typeof(quantity) !== 'number' || typeof(pricePerUnit) !== 'number' || quantity<=0 || pricePerUnit<=0){
            res.status(400).json({
                message:"Invalid Input"
            })
        }

        const totalAmount:number = quantity * pricePerUnit

        let discount:number = 0;

        if(totalAmount>10000){
            discount = totalAmount * 0.1
        }

        if(quantity>5){
            discount = discount+500
        }

        const finalAmount:number = totalAmount - discount

        const uniqueId = randomUUID()

        const newOrder:Order = {
            id:uniqueId,
            productName,
            quantity,
            pricePerUnit,
            totalAmount,
            discount,
            finalAmount,
            timestamp: new Date().toISOString()
        }

        orders.push(newOrder)

        res.status(200).json({
            message:"Order Placed Successfully",
            data:newOrder
        })

    }catch(error){
        res.status(500).json({
            message:`Internal Server Error`,
            error:error
        })
    }

}

export const getOrderSummary = (req:Request,res:Response)=>{
    try{
        const { orderId } = req.params
        if(!orderId){
            res.status(400).json({
                message:"Order Id is required"
            })
            return
        }

        const order = orders.find((order) => order.id === orderId)

        if(!order){
            res.status(404).json({
                message:"Order with this id not found"
            })
            return
        }

        res.status(200).send({
            message:"Order Found",
            data:order
        })

    }catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getTotalRevenue = (_req:Request,res:Response)=>{
    try{
        if(orders.length === 0){
            res.status(404).json({
                message:"Orders not found"
            })
            return 
        }

        const totalRevenue = orders.reduce((total, order) => total+order.finalAmount , 0)
        res.status(200).json({
            message:"Total revenue calculated",
            data:totalRevenue
        })
    }catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}