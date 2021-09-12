/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Router } from '@angular/router'
import { Product } from './../../../../../../../libs/products/src/lib/models/product'
import { ProductsService } from './../../../../../../../libs/products/src/lib/services/products.service'
import { Component, OnInit } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: [],
})
export class ProductsListComponent implements OnInit {
    products: Product[] = []

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this._getProducts()
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this product',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService.deleteProduct(productId).subscribe(
                    (product: Product) => {
                        this._getProducts()
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `Product ${product.name} is deleted`,
                        })
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error Message',
                            detail: 'Product is not deleted',
                        })
                    }
                )
            },
            reject: () => {},
        })
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`)
    }

    private _getProducts() {
        this.productsService.getProducts().subscribe((products) => {
            this.products = products
        })
    }
}
