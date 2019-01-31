import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
                          {  path: '', redirectTo: '/login', pathMatch: 'full' },
                          {  path: 'register', component:RegisterComponent },
                          {  path: 'login', component:LoginComponent },
                          {  path: 'login', component:LoginComponent },
                          {  path: 'admin', loadChildren:'./admin/admin.module#AdminModule' },
                          {  path: '**', component: PageNotFoundComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
