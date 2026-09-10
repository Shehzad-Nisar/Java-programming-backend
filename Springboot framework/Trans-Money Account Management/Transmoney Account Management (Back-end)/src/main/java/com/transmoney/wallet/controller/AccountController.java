package com.transmoney.wallet.controller;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.service.AccountService;
import org.apache.coyote.http11.Http11Processor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<Account> createAccount(@RequestBody Account account){
        service.createAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(account);

    }

    @GetMapping("/allaccounts")
    public List<Account> getAccount(){
       return service.getAllAccounts();
    }
    @GetMapping("/{accountid}")
    public ResponseEntity<Account> accountByid(@PathVariable(value = "accountid",required = false) Long id){
        if(!service.accountExist(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(service.getAccountById(id),HttpStatus.OK);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Account> update(@PathVariable Long id,@RequestBody Account account){
        if(!service.accountExist(id))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        account.setId(id);
        service.updateAccount(account);
        return new ResponseEntity<>(account,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        if(!service.accountExist(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");

        service.deleteAccount(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // searches using request params :

    @GetMapping("/search")
    public ResponseEntity<List<Account>> search(@RequestParam String name){
        List<Account> searchName = service.getAllAccounts().stream()
                .filter(account -> account.getCustomerName().equals(name))
                .toList();

        return new ResponseEntity<>(searchName,HttpStatus.OK);
    }




}
