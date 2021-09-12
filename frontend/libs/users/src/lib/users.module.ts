import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Route, Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
]

export const usersRoutes: Route[] = []

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginComponent],
})
export class UsersModule {}
