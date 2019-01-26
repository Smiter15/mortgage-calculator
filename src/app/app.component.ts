import { Component, OnInit } from '@angular/core';

// Interfaces
export interface TableData {
  month: number;
  originalLoan: number;
  interest: number;
  monthlyRepayment: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public amount = 10000;
  public amountOptions = {prefix: '', precision: 0};
  public months = 4;
  public rate = 3.33;
  public rateOptions = {prefix: ''};

  public tableHeaders = ['month', 'originalLoan', 'interest', 'monthlyRepayment'];
  public tableData: TableData[] = [];

  public unlockTestAnswer = false; // Set to true to run tests
  public secret = '';
  public secretHint: string;

  ngOnInit() {
    this.calculateRepayments();
  }

  calculateRepayments() {
    this.tableData = [];
    let tempAmount = this.amount;
    for (let i = 0; i < this.months; i++) {
      this.tableData.push({
        month: i + 1,
        originalLoan: this.amount / this.months,
        interest: tempAmount * this.rate / 100,
        monthlyRepayment: (this.amount / this.months) + tempAmount * this.rate / 100
      });
      tempAmount -= this.amount / this.months;
    }
  }

  getTotal(prop) {
    return this.tableData.map(row => row[prop]).reduce((acc, value) => acc + value, 0);
  }

  unlock() {
    if (this.secret === 'up-down-left-right') {
      this.secretHint = 'Congratulations!';
      setTimeout(() => {
        this.unlockTestAnswer = true;
      }, 1000);
    } else if (this.secret.startsWith('up-down-left-')) {
      this.secretHint = 'Nearly there';
    } else if (this.secret.startsWith('up-down-')) {
      this.secretHint = 'Keep going';
    } else if (this.secret.startsWith('up-')) {
      this.secretHint = 'Good start...';
    } else {
      this.secretHint = 'I don\'t get it ?';
    }
  }
}
