package learn.finance.repository;

import learn.finance.model.Category;
import learn.finance.model.Expense;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
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

        LocalDateTime start = LocalDateTime.parse("2025-02-01T00:00:00");
        LocalDateTime end = LocalDateTime.parse("2025-03-01T00:00:00");

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
        Expense expense = new Expense(0,1,1,123.45,"testing expense",LocalDateTime.now(),LocalDateTime.now(),false,false, "http://test.com");
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