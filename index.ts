type TransactionType = 'Deposit' | 'Withdraw' | 'Transfer';

interface Transaction {
  type: TransactionType;
  amount: number;
}

interface Account {
  owner: string;
  balance: number;
  transactions: Transaction[];
}

export class CheckingAccount implements Account {
  owner: string;
  balance: number;
  transactions: Transaction[] = [];

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number) {
    this.balance += amount;
    this.transactions.push({ type: 'Deposit', amount });
  }

  withdraw(amount: number) {
    if (this.balance >= amount) {
      this.balance -= amount;
      this.transactions.push({ type: 'Withdraw', amount });
    } else {
      throw new Error('Insufficient balance');
    }
  }
}

export class InvestmentAccount implements Account {
  owner: string;
  balance: number;
  transactions: Transaction[] = [];
  type: 'Individual' | 'Corporate';

  constructor(owner: string, balance: number, type: 'Individual' | 'Corporate') {
    this.owner = owner;
    this.balance = balance;
    this.type = type;
  }

  deposit(amount: number) {
    this.balance += amount;
    this.transactions.push({ type: 'Deposit', amount });
  }

  withdraw(amount: number) {
    if (this.type === 'Individual' && amount > 500) {
      throw new Error('Withdrawal limit for Individual account is 500 dollars');
    }

    if (this.balance >= amount) {
      this.balance -= amount;
      this.transactions.push({ type: 'Withdraw', amount });
    } else {
      throw new Error('Insufficient balance');
    }
  }
}

export class Bank {
  name: string;
  accounts: Account[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addAccount(account: Account) {
    this.accounts.push(account);
  }
}