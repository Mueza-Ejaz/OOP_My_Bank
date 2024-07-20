#!/usr/bin/env node
import inquirer from "inquirer";
//My Bank class:
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money:
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //Credit Money:
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited.
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // Check Balance:
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//Customer Class:
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Account:
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Create Customers:
const Customers = [
    new Customer("Zain", "Kazi", "Male", 25, 3242320220, accounts[0]),
    new Customer("Mueza", "Ejaz", "Female", 23, 3162320220, accounts[1]),
    new Customer("Anaiza", "Malik", "Female", 24, 3452320220, accounts[2]),
];
//Function to interact with Bank Account:
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const Customer = Customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber);
        if (Customer) {
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }]);
                    Customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }]);
                    Customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services.Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
