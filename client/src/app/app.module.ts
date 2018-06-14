import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App components init
import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { HomeComponent } from './home/home.component';
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
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: '',
    redirectTo: '/home',
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
    StocksComponent,
    HomeComponent,
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
      { useHash: true, enableTracing: true }, // tracing for debugging, usehash for hash urls should be html5 urls eventually
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


