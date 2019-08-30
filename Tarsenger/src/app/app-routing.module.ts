import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ConversationComponent } from './Components/conversation/conversation.component';
import { Page404Component } from './Components/page404/page404.component';
import { GuardAuthenticationGuard } from './Services/guard-authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[GuardAuthenticationGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[GuardAuthenticationGuard]},
  { path: 'conversation', component: ConversationComponent, canActivate:[GuardAuthenticationGuard]},
  { path: 'conversation/:uid', component: ConversationComponent, canActivate:[GuardAuthenticationGuard]},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
