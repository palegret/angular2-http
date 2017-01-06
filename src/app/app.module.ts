import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { UserService } from './shared/services/user.service';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

@NgModule({
  // Injectable objects available in the injector of this module.
  providers: [
    UserService
  ],
  // Directives/pipes that belong to this module.
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent
  ],
  // Modules whose exported directives/pipes are available to module templates.
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  // Directives/pipes/modules usable by templates in modules importing this one.
  exports: [],

  // Components to compile when this module is defined.
  // Each component gets a ComponentFactory, stored in ComponentFactoryResolver.
  // entryComponents?: any[]

  // Components to bootstrap when this module is bootstrapped. 
  // Components listed here are automatically added to `entryComponents`.  
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
