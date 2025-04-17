package learn.finance.repository;

import learn.finance.model.Category;
import learn.finance.model.Expense;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ExpenseRepository {
    List<Expense> findAll();
    List<Expense> findExpensesByUserId(int userId);
    Expense findByExpenseId(int expenseId);
    List<Expense> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    List<Expense> findByCategory(Category category);
    Expense addExpense(Expense expense);
    boolean updateExpense(Expense expense);
    boolean deleteExpenseById(int expenseId);
}
