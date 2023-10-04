package com.example.moneyandmonitory.account_service.Controller;

import com.example.moneyandmonitory.account_service.DTO.MoneyTransferRequestDTO;
import com.example.moneyandmonitory.account_service.Service.AccountService;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import com.example.moneyandmonitory.account_service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;


    @GetMapping("/debitaccount/{userId}")
    public DebitAccount getDebitAccountInfo(@PathVariable long userId)
    {
        return accountService.getDebitAccountInfo(userId);
    }

    @GetMapping("/savingsaccount/balance/{userId}")
    public double getSavingsAccountBalance(@PathVariable long userId)
    {
        return accountService.getSavingsAccountBalance(userId);
    }

    @GetMapping("/debitaccount/balance/{userId}")
    public double getDebitAccountBalance(@PathVariable long userId)
    {
        return accountService.getDebitAccountBalance(userId);
    }



    @GetMapping("/savingsaccount/{userId}")
    public SavingsAccount getSavingsAccountInfo(@PathVariable long userId)
    {
        return accountService.getSavingsAccountInfo(userId);
    }


    @PutMapping("/savingsaccount/withdraw/{userId}/{amount}")
    public ResponseEntity<Transaction> withdrawFromSavingsAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.withdrawFromSavingsAccount(userId, amount);
    }

    @PutMapping("/debitaccount/deposit/{userId}/{amount}")
    public ResponseEntity<Transaction> depositToDebitAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.depositToDebitAccount(userId, amount);
    }

    //for payments page - withdraw from debit account
    @PutMapping("/debitaccount/withdraw/{userId}/{amount}")
    public ResponseEntity<Transaction> withdrawFromDebitAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.withdrawFromDebitAccount(userId, amount);
    }

    @PostMapping("/transfermoney")
    public ResponseEntity<Transaction> transferMoney(@RequestBody MoneyTransferRequestDTO moneyTransferRequestDTO)
    {
        return accountService.transferMoney(moneyTransferRequestDTO);
    }

    @GetMapping("/debit/transactionhistory/{userId}")
    public List<Transaction> transactionHistoryForDebitAccount(@PathVariable long userId){
        return accountService.transactionHistoryForDebitAccount(userId);
    }
}

