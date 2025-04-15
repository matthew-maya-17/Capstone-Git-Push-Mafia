package learn.finance.controller;

import learn.finance.exception.ErrorResponse;
import learn.finance.model.Category;
import learn.finance.model.Expense;
import learn.finance.service.ExpenseService;
import learn.finance.service.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/expense")
public class ExpenseController {
    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Expense> findAll(){
        return service.findAll();
    }

    @GetMapping("/date-range")
    public List<Expense> findByDateRange(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end){
        return service.findByDateRange(start, end);
    }

    @GetMapping("/category")
    public List<Expense> findByCategory(@RequestParam Category category){
        return service.findByCategory(category);
    }

    @PostMapping
    public ResponseEntity<Object> addExpense(@RequestBody Expense expense){
        Result<Expense> result = service.addExpense(expense);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<Object> update(@PathVariable int expenseId, @RequestBody Expense expense) {
        if (expenseId != expense.getExpenseId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Expense> result = service.updateExpense(expense);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteById(@PathVariable int expenseId) {
        if (service.deleteExpenseById(expenseId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
