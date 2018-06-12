import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App components init
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { StocksComponent } from './stocks/stocks.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './404/pageNotFound.component';
import { SignupComponent } from './signup/signup.component';
// Angular Http for REST API
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Angular Routing
import { RouterModule, Routes, CanActivate } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'stocks',
    component: StocksComponent,
    data: { title: 'Stock List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: '',
    redirectTo: '/stocks',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: '404'}
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: { title: '404'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StocksComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, enableTracing: true }, // tracing for debugging, usehash for userfriendly urls
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


