import { Router } from '@angular/router'
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Category } from './../../../../../../../libs/products/src/lib/models/category'
import { CategoriesService } from './../../../../../../../libs/products/src/lib/services/categories.service'
import { Component, OnInit } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: [],
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = []

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories()
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete category',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    (category: Category) => {
                        this._getCategories()
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `Category ${category.name} is deleted`,
                        })
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error Message',
                            detail: 'Category is not deleted',
                        })
                    }
                )
            },
            reject: () => {},
        })
    }

    updateCategory(categoryid: string) {
        this.router.navigateByUrl(`categories/form/${categoryid}`)
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats
        })
    }
}
