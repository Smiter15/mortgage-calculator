import { TestBed, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';

// Material UI
import { MaterialModule } from './material.module';

// 3rd party
import { NgxCurrencyModule } from 'ngx-currency';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        NgxCurrencyModule
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`total repayments original loan should = 10000`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.amount).toEqual(10000);
  });

  it(`should create correct dynamic original loan value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.months = 5;
    fixture.detectChanges(); // trigger ngOnInit here
    expect(app.tableData[0].originalLoan).toEqual(2000);
  });

  it(`total monthly repayment from initial variables should = 10833`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.calculateRepayments();
    fixture.detectChanges();
    const monthlyRepaymentTotatl = Math.round(app.getTotal('monthlyRepayment'));
    expect(monthlyRepaymentTotatl).toEqual(10833);
  });

  it(`totals from updated variables should be correct`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.amount = 150000;
    app.months = 12;
    app.rate = 2.20;
    app.calculateRepayments();
    fixture.detectChanges();
    const originalLoanTotal = Math.round(app.getTotal('originalLoan'));
    const interestTotatl = Math.round(app.getTotal('interest'));
    const monthlyRepaymentTotatl = Math.round(app.getTotal('monthlyRepayment'));
    expect(originalLoanTotal).toEqual(150000);
    expect(interestTotatl).toEqual(21450);
    expect(monthlyRepaymentTotatl).toEqual(171450);
  });

});
