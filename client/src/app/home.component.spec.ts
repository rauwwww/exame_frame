/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Routing
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AppModule } from './app.module';
import { HomeComponent } from './home/home.component';

describe('Trading App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpModule,
            RouterModule,
            AppModule
        ],
        declarations: [

      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(HomeComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Home'`, async(() => {
    let fixture = TestBed.createComponent(HomeComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Home');
  }));

  it('should render title in a h4 tag', async(() => {
    let fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('FRAMEWORK EXAM');
  }));
});
