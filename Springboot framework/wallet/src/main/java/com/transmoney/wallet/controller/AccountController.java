package com.transmoney.wallet.controller;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public String createAccount(@RequestBody Account account){
        service.createAccount(account);
        return "Account created.";
    }

    @GetMapping("/allaccounts")
    public List<Account> getAccount(){
       return service.getAllAccounts();
    }

    @PutMapping("/update/{id}")
    public String update(@PathVariable Long id,@RequestBody Account account){
        account.setId(id);
        service.updateAccount(account);
        return "account updated";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        service.deleteAccount(id);
        return "Successfully deleted";
    }




}
