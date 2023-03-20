import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChatbotAiComponent } from'./chatbot-ai/chatbot-ai.component';
import { LoaderComponent } from './loader/loader.component';
import { Event1Component } from './event1/event1.component';

const routes: Routes = [
  {
    path: '',
    component: LoaderComponent,
   
  },

  {
    path: 'loader',
    component: LoaderComponent,
   
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'event',
    component: EventComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'chatbot-ai',
    component: ChatbotAiComponent
  },
  {
    path: 'event1',
    component: Event1Component
  }



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
