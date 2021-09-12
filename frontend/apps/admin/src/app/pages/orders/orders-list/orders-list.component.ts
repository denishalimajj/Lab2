/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Order } from './../../../../../../../libs/orders/src/lib/models/order'
import { OrdersService } from './../../../../../../../libs/orders/src/lib/services/orders.service'
import { ORDER_STATUS } from '../order.constants'
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: [],
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = []
    orderStatus = ORDER_STATUS

    constructor(
        private ordersService: OrdersService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getOrders()
    }

    _getOrders() {
        this.ordersService.getOrders().subscribe((orders) => {
            this.orders = orders
        })
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this order',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this._getOrders()
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `Order is deleted`,
                        })
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error Message',
                            detail: 'Order is not deleted',
                        })
                    }
                )
            },
            reject: () => {},
        })
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`)
    }
}
