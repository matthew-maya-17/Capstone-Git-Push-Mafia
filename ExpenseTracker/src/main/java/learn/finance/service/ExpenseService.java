package learn.finance.service;

import learn.finance.model.Category;
import learn.finance.model.Expense;
import learn.finance.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    //CREATE
    public Result<Expense> addExpense(Expense expense){
        Result<Expense> result = validate(expense);
        if (!result.isSuccess()) {
            return result;
        }

        if (expense.getExpenseId() != 0) {
            result.addMessage("expenseId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        if (expense.getUserId() < 1) {
            result.addMessage("userId must be set for `add` operation", ResultType.INVALID);
            return result;
        }

        if (expense.getCategoryId() < 1 || expense.getCategoryId() > 5) {
            result.addMessage("categoryId must be set for `add` operation with a valid Id", ResultType.INVALID);
            return result;
        }

        expense = expenseRepository.addExpense(expense);
        result.setPayload(expense);
        return result;
    }

    // READ
    public List<Expense> findAll(){
        return expenseRepository.findAll();
    }

    public List<Expense> findByDateRange(LocalDateTime startDate, LocalDateTime endDdate){
        return expenseRepository.findByDateRange(startDate, endDdate);
    }

    public List<Expense> findByCategory(Category category){
        return expenseRepository.findByCategory(category);
    }

    // UPDATE
    public Result<Expense> updateExpense(Expense expense){
        Result<Expense> result = validate(expense);
        if (!result.isSuccess()) {
            return result;
        }

        if (expense.getUserId() < 1) {
            result.addMessage("userId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (expense.getCategoryId() < 1 || expense.getCategoryId() > 5) {
            result.addMessage("categoryId must be set for `update` operation with a valid Id", ResultType.INVALID);
            return result;
        }

        if (!expenseRepository.updateExpense(expense)) {
            String msg = String.format("expenseId: %s, not found", expense.getExpenseId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    //DELETE
    public boolean deleteExpenseById(int expenseId){
        return expenseRepository.deleteExpenseById(expenseId);
    }

    private Result<Expense> validate(Expense expense) {
        Result<Expense> result = new Result<>();
        if (expense == null) {
            result.addMessage("Expense cannot be null!", ResultType.INVALID);
            return result;
        }

        if (expense.getAmount() <= 0) {
            result.addMessage("Expense amount has to be greater than zero!", ResultType.INVALID);
        }

        if (expense.getReceiptUrl() == null || expense.getReceiptUrl().isEmpty()) {
            result.addMessage("Receipt URL is required", ResultType.INVALID);
        }

        return result;
    }
}
