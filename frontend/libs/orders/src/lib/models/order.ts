/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from './order-item'
import { User } from '@frontend/users'

export class Order {
    id!: string
    orderItems?: OrderItem | any
    shippingAddress1?: string
    shippingAddress2?: string
    city?: string
    zip?: string
    country?: string
    phone?: string
    status?: number
    totalPrice?: string
    user!: User
    dateOrdered?: string
}


