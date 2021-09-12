/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { User } from './../../../../../../../libs/users/src/lib/models/user'
import { MessageService, ConfirmationService } from 'primeng/api'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UsersService } from './../../../../../../../libs/users/src/lib/services/users.service'

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: [],
})
export class UsersListComponent implements OnInit {
    users: User[] = []

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers()
    }
    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe(
                    () => {
                        this._getUsers()
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `User is deleted`,
                        })
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error Message',
                            detail: 'User is not deleted',
                        })
                    }
                )
            },
            reject: () => {},
        })
    }

    updateUser(userid: string) {
        this.router.navigateByUrl(`users/form/${userid}`)
    }


    private _getUsers() {
        this.usersService.getUsers().subscribe((users) => {
            this.users = users
        })
    }
}
