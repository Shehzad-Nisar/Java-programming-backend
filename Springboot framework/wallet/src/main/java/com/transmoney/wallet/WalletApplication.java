package com.transmoney.wallet;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WalletApplication {

	public static void main(String[] args) {
		SpringApplication.run(WalletApplication.class, args);
	}

	@Bean
    CommandLineRunner dummyData(AccountService accountService) {
		return args -> { accountService.createAccount( new Account("Ali Khan", "SAVINGS", 50000, true) ); accountService.createAccount( new Account("Ahmed Raza", "CURRENT", 125000, true) ); accountService.createAccount( new Account("Hassan Ali", "SAVINGS", 25000, true) ); accountService.createAccount( new Account("Bilal Hussain", "CURRENT", 80000, false) ); }; } }
