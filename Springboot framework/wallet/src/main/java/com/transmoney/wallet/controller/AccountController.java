package com.transmoney.wallet.controller;

import com.transmoney.wallet.service.AccountService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }


}
