import { CheckingAccount, InvestmentAccount, Bank } from './index';

describe('CheckingAccount operations', () => {
  let checkingAccount: CheckingAccount;
  let investmentAccount: InvestmentAccount;
  let bank: Bank;

  beforeEach(() => {
    checkingAccount = new CheckingAccount('John Doe', 1000);
    investmentAccount = new InvestmentAccount('Jane Doe', 2000, 'Individual');
    bank = new Bank('Test Bank');
    bank.addAccount(checkingAccount);
    bank.addAccount(investmentAccount);
  });

  test('checking deposit operation', () => {
    checkingAccount.deposit(500);
    expect(checkingAccount.balance).toBe(1500);
    expect(checkingAccount.transactions).toEqual([{ type: 'Deposit', amount: 500 }]);
  });

  test('checking withdraw operation', () => {
    checkingAccount.withdraw(200);
    expect(checkingAccount.balance).toBe(800);
    expect(checkingAccount.transactions).toEqual([{ type: 'Withdraw', amount: 200 }]);
  });

  test('checking withdraw operation insuffucient funds', () => {
    expect(() => checkingAccount.withdraw(2000)).toThrow("Insufficient balance");
  });

  test('checking transaction history', () => {
    checkingAccount.deposit(500);
    checkingAccount.withdraw(200);
    expect(checkingAccount.transactions).toEqual([
      { type: 'Deposit', amount: 500 },
      { type: 'Withdraw', amount: 200 },
    ]);
  });
});

describe('InvestmentAccount operations', () => {
  let investmentAccount: InvestmentAccount;

  beforeEach(() => {
    investmentAccount = new InvestmentAccount('Jane Doe', 2000, 'Individual');
  });

  test('deposit operation', () => {
    investmentAccount.deposit(500);
    expect(investmentAccount.balance).toBe(2500);
    expect(investmentAccount.transactions).toEqual([{ type: 'Deposit', amount: 500 }]);
  });

  test('withdraw operation with sufficient balance', () => {
    investmentAccount.withdraw(200);
    expect(investmentAccount.balance).toBe(1800);
    expect(investmentAccount.transactions).toEqual([{ type: 'Withdraw', amount: 200 }]);
  });

  test('withdraw operation with insufficient balance', () => {
    const lowBalanceAccount = new InvestmentAccount('Jane Doe', 200, 'Individual');
    expect(() => lowBalanceAccount.withdraw(400)).toThrow('Insufficient balance');
  });

  test('withdraw operation with limit for Individual account', () => {
    expect(() => investmentAccount.withdraw(600)).toThrow('Withdrawal limit for Individual account is 500 dollars');
  });
});