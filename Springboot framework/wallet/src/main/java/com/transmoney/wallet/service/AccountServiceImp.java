package com.transmoney.wallet.service;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class AccountServiceImp implements AccountService{
    private final AccountRepository accountRepository;

    public AccountServiceImp(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    @Override
    public void createAccount(Account account) {
        //Generated unique id;
        Long id = accountRepository.getNextId();

       //Unique Acc number from ACC000001;
        String accountNumber = String.format("ACC%06d",id);

        // added generated uniques numbers and id in object
        account.setId(id);
        account.setAccountNumber(accountNumber);

        accountRepository.save(account);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Account Not found at this ID: " + id));
    }

    @Override
    public void updateAccount(Account account) {
        accountRepository.update(account);
    }

    @Override
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }
}
