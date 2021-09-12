/* eslint-disable @typescript-eslint/ban-types */
import { Order } from './../models/order'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>('http://localhost:3000/api/v1/orders' )
    }

    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${orderId}`)
    }

    createOrder(order: Order):Observable<Order>  {
        return this.http.post<Order>('http://localhost:3000/api/v1/orders', order)
    }

    deleteOrder(orderId: string): Observable<Object>  {
        return this.http.delete<Object>(`http://localhost:3000/api/v1/orders/${orderId}`);
    }

    updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order>  {
        return this.http.put<Order>(`http://localhost:3000/api/v1/orders/`+ orderId, orderStatus);
    }
}
