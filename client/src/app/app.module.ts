import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
// jwt for Routeguards
import { AuthHttp, AuthConfig } from 'angular2-jwt';

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
  { path: '',
    redirectTo: '/stocks',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


