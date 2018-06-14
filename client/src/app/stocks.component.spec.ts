import { TestBed, async } from '@angular/core/testing';
import { SharesComponent } from './shares/shares.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Angular Routing
import { RouterModule } from '@angular/router';
import { AppModule } from './app.module';

describe('Trading-App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            RouterModule,
            AppModule
        ],
        declarations: [

      ],
    });
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SharesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Trading App'`, async(() => {
    const fixture = TestBed.createComponent(SharesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Trading App');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SharesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('All Shares!');
  }));
});
