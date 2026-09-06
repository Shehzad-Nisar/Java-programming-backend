package com.transmoney.wallet.repository;

import com.transmoney.wallet.model.Account;

import java.util.*;

public class AccountRepository {
    private final Map<Long, Account> accountRepository = new HashMap<>();

    public void save(Account acc){
        Objects.requireNonNull(acc, "Account must not be null.");

        accountRepository.put(acc.getId(),acc);
    }

    public void deleteById(Long id){

        Objects.requireNonNull(id, "Id should not be null");

        accountRepository.remove(id);
    }


    public Optional<Account> findById(Long id ){
        return Optional.ofNullable(accountRepository.get(id));

    }

    public List<Account> findAll(){
        return new ArrayList<>(accountRepository.values());
    }


}
