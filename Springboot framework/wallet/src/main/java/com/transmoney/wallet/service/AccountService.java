package com.transmoney.wallet.service;

import com.transmoney.wallet.model.Account;

import java.util.List;

public interface AccountService {
     void createAccount(Account account);
     List<Account> getAllAccounts();
     Account getAccountById(Long id);
     void updateAccount(Account account);
     void deleteAccount(Long id);

}
