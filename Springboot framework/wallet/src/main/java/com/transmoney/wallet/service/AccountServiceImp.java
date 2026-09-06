package com.transmoney.wallet.service;

import com.transmoney.wallet.model.Account;
import com.transmoney.wallet.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class AccountServiceImp implements AccountService{
    AccountRepository accountRepository = new AccountRepository();


    @Override
    public void createAccount(Account account) {
        Long id =


        int size = accountRepository.findAll().size() + 1;
        String accountNumber = String.format("ACC%06d",size);

        account.setId(id);











    }

    @Override
    public List<Account> getAllAccounts() {
        return List.of();
    }

    @Override
    public Account getAccountById(Long id) {
        return null;
    }

    @Override
    public void updateAccount(Account account) {

    }

    @Override
    public void deleteAccount(Long id) {

    }
}
