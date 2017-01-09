import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/users',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'users',
		component: UsersComponent,
		children: [
			{
				path: '',
				component: UserListComponent
			},
			{
				path: 'create',
				component: UserCreateComponent
			},
			{
				path: ':id',
				component: UserDetailComponent
			},
			{
				path: ':id/edit',
				component: UserEditComponent
			},
		]
	}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
