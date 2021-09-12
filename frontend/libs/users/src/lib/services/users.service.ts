/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
import { User } from './../models/user'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/api/v1/users')
    }

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(
            `http://localhost:3000/api/v1/users/${userId}`
        )
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:3000/api/v1/users', user)
    }

    deleteUser(userId: string): Observable<Object> {
        return this.http.delete<Object>(
            `http://localhost:3000/api/v1/users/${userId}`
        )
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(
            `http://localhost:3000/api/v1/users/` + user.id,
            user
        )
    }

}
