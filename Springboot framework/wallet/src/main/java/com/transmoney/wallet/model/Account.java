package com.transmoney.wallet.model;

public class Account {
    private Long id ;
    private String accountNumber ;
    private String customerName;
    private String accountType;
    private double balance ;
    private boolean active;

    public Account(String customerName, String accountType, double balance, boolean active) {
        this.customerName = customerName;
        this.accountType = accountType;
        this.balance = balance;
        this.active = active;
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

    public boolean isActive() {
        return active;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
