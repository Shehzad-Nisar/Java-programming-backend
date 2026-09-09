package com.transmoney.wallet.controller;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createAccount(@RequestBody Account account){
        service.createAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Created.");

    }

    @GetMapping("/allaccounts")
    public List<Account> getAccount(){
       return service.getAllAccounts();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id,@RequestBody Account account){
        account.setId(id);
        service.updateAccount(account);
        return ResponseEntity.status(HttpStatus.OK).body("updated successfully.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        if(!service.accountExist(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        
        service.deleteAccount(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }




}
