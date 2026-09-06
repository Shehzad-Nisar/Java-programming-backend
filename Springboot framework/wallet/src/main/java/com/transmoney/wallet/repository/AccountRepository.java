package com.transmoney.wallet.repository;

import com.transmoney.wallet.model.Account;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class AccountRepository {
    private final Map<Long, Account> accountRepository = new HashMap<>();

    Long nextId = 0L;

    public Long getNextId(){
        return nextId++;
    }

    public void save(Account acc){
        Objects.requireNonNull(acc, "Account must not be null.");

        accountRepository.put(acc.getId(),acc);
    }

    public void deleteById(Long id){

        Objects.requireNonNull(id, "Id should not be null");
        Account deletedAccount = accountRepository.remove(id);

        if(deletedAccount==null){
            throw new RuntimeException("Account Not found");
        }
    }

    public void update(Account acc){

        //first validate id should not be null
        Objects.requireNonNull(acc.getId(), "Id should not be null.");

        //Second validation to check that this acc is actually inside database otherwise it will add new acc at acc.id.

        if(!accountRepository.containsKey(acc.getId())){
            throw new RuntimeException("Account Not found.");
        }

        //finally acc changed at particular id which is present.
        accountRepository.put(acc.getId(),acc);
    }


    public Optional<Account> findById(Long id ){
        return Optional.ofNullable(accountRepository.get(id));

    }

    public List<Account> findAll(){
        return new ArrayList<>(accountRepository.values());
    }


}
