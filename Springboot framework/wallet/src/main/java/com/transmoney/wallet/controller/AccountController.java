package com.transmoney.wallet.controller;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.service.AccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public String createAccount(){
        service.createAccount(new Account("Shehzad Nisar","Current-Account",5000.0,true));
        return "Account created.";
    }

    @GetMapping("/allaccounts")
    public List<Account> getAccount(){
       return service.getAllAccounts();
    }




}
