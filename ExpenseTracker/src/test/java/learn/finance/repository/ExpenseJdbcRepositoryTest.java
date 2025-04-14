package learn.finance.repository;

import learn.finance.model.Category;
import learn.finance.model.Expense;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ExpenseJdbcRepositoryTest {

    @Autowired
    ExpenseJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<Expense> expenses = repository.findAll();
        assertNotNull(expenses);
        assertTrue(expenses.size() > 0);
    }

    @Test
    void findByDateRange() {
        Date start = java.sql.Timestamp.valueOf("2025-02-01 00:00:00");
        Date end = java.sql.Timestamp.valueOf("2025-03-01 00:00:00");

        List<Expense> expenses = repository.findByDateRange(start,end);
        assertNotNull(expenses);
        assertTrue(expenses.size() > 0);
    }

    @Test
    void findByCategory() {
        List<Expense> expenses = repository.findByCategory(Category.LABOR);
        assertNotNull(expenses);
        assertTrue(expenses.size() > 0);
    }

    @Test
    void addExpense() {
        Expense expense = new Expense();
        expense.setUserId(1);
        expense.setCategoryId(1);
        expense.setAmount(123.45);
        expense.setDescription("testing expense");
        expense.setApproved(false);
        expense.setReimbursed(false);
        expense.setCreatedAt(LocalDateTime.now());
        expense.setUpdatedAt(LocalDateTime.now());
        expense.setReceiptUrl("http://test.com");

        Expense addedExpense = repository.addExpense(expense);
        assertNotNull(addedExpense);
        assertTrue(addedExpense.getExpenseId() > 0);
    }

    @Test
    void updateExpense() {
        Expense expense = repository.findAll().get(0);
        expense.setAmount(999.99);
        boolean updated = repository.updateExpense(expense);
        assertTrue(updated);
    }

    @Test
    void updateStatus() {
        boolean success = repository.updateStatus(1);
        assertTrue(success);
    }
}