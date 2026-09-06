package com.transmoney.wallet.model;

public class Account {
    private long id ;
    private String accountNumber ;
    private String customerName;
    private String accountType;
    private double balance ;
    private boolean status;

    public Account(long id, String customerName, String accountNumber, String accountType, double balance, boolean status) {
        this.id = id;
        this.customerName = customerName;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getAccountType() {
        return accountType;
    }

    public double getBalance() {
        return balance;
    }

    public boolean isStatus() {
        return status;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
