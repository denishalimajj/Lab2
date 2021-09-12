/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Category } from './../../../../../../../libs/products/src/lib/models/category'
import { CategoriesService } from 'libs/products/src/lib/services/categories.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { Location } from '@angular/common'
import { timer } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: [],
})
export class CategoriesFormComponent implements OnInit {
    form!: FormGroup
    isSubmited!: boolean
    editMode = false
    currentCategoryId!: string

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff'],
        })

        this._checkEditMode()
    }

    onSubmit() {
        this.isSubmited = true
        if (this.form.invalid) {
            return
        }
        const category: Category = {
            id: this.currentCategoryId,
            name: this.form.controls.name.value,
            icon: this.form.controls.icon.value,
            color: this.categoryForm.color.value,
        }
        if (this.editMode) {
            this._updateCategory(category)
        } else {
            this._addCategory(category)
        }
    }
    onCancel() {
        this.location.back()
    }

    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is created`,
                })
                timer(1000)
                    .toPromise()
                    .then(() => {
                        this.location.back()
                    })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: 'Category is not created',
                })
            }
        )
    }

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(category).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Category is updated',
                })
                timer(1000)
                    .toPromise()
                    .then(() => {
                        this.location.back()
                    })
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: 'Category is not updated',
                })
            }
        )
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true
                this.currentCategoryId = params.id
                this.categoriesService
                    .getCategory(params.id)
                    .subscribe((category) => {
                        this.categoryForm.name.setValue(category.name)
                        this.categoryForm.icon.setValue(category.icon)
                        this.categoryForm.color.setValue(category.color)
                    })
            }
        })
    }

    get categoryForm() {
        return this.form.controls
    }
}
