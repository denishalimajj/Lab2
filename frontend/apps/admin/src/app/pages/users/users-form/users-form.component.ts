/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UsersService } from './../../../../../../../libs/users/src/lib/services/users.service'
import { User } from './../../../../../../../libs/users/src/lib/models/user'
import { MessageService } from 'primeng/api'
import { timer } from 'rxjs'
import * as countriesLibrary from 'i18n-iso-countries'

declare const require

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: [],
})
export class UsersFormComponent implements OnInit {
    form!: FormGroup
    isSubmited = false
    editMode = false
    currentUserId!: string
    countries= [] as any;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initUserForm()
        this._getCountries()
        this._checkEditMode()
    }

    private _initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: [''],
        })
    }

    private _getCountries() {
        countriesLibrary.registerLocale(
            require('i18n-iso-countries/langs/en.json')
        )
        this.countries = Object.entries(
            countriesLibrary.getNames('en', { select: 'official' })
        ).map((entry) => {
            return {
                id: entry[0],
                name: entry[1],
            }
        })
    }

    private _addUser(user: User) {
        this.usersService.createUser(user).subscribe(
            (user: User) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `User ${user.name} is created!`,
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
                    summary: 'Error',
                    detail: 'User is not created!',
                })
            }
        )
    }

    private _updateUser(user: User) {
        this.usersService.updateUser(user).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User is updated!',
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
                    summary: 'Error',
                    detail: 'User is not updated!',
                })
            }
        )
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true
                this.currentUserId = params.id
                this.usersService.getUser(params.id).subscribe((user) => {
                    this.userForm.name.setValue(user.name)
                    this.userForm.email.setValue(user.email)
                    this.userForm.phone.setValue(user.phone)
                    this.userForm.isAdmin.setValue(user.isAdmin)
                    this.userForm.street.setValue(user.street)
                    this.userForm.apartment.setValue(user.apartment)
                    this.userForm.zip.setValue(user.zip)
                    this.userForm.city.setValue(user.city)
                    this.userForm.password.setValue(user.password)
                    this.userForm.country.setValue(user.country)

                    this.userForm.password.setValidators([])
                    this.userForm.password.updateValueAndValidity()
                })
            }
        })
    }

    onSubmit() {
        this.isSubmited = true
        if (this.form.invalid) {
            return
        }
        const user: User = {
            id: this.currentUserId,
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            phone: this.userForm.phone.value,
            isAdmin: this.userForm.isAdmin.value,
            street: this.userForm.street.value,
            apartment: this.userForm.apartment.value,
            zip: this.userForm.zip.value,
            city: this.userForm.city.value,
            password: this.userForm.password.value,
            country: this.userForm.country.value,
        }
        if (this.editMode) {
            this._updateUser(user)
        } else {
            this._addUser(user)
        }
    }

    onCancel() {
        this.location.back()
    }

    get userForm() {
        return this.form.controls
    }
}
