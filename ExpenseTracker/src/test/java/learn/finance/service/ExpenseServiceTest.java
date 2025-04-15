package learn.finance.service;

import learn.finance.model.Expense;
import learn.finance.repository.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ExpenseServiceTest {
    @Autowired
    ExpenseService service;

    @MockBean
    ExpenseRepository repository;

    @Test
    void shouldFindAll(){
        List<Expense> expected = List.of(
                new Expense(1, 1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/"),
                new Expense(2, 32, 4, 100.0, null, LocalDateTime.parse("2025-10-15T14:30:00") , null, false, false, "http://www.example.com/#actor")
                );
        when(repository.findAll()).thenReturn(expected);
        List<Expense> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddZeroOrNegativeAmount() {
        Expense expense = new Expense(1, 1, 1, -100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        when(repository.addExpense(expense)).thenReturn(expense);
        Result<Expense> result = service.addExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddMissingReceiptUrl() {
        Expense expense = new Expense(1, 1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, null);
        when(repository.addExpense(expense)).thenReturn(expense);
        Result<Expense> result = service.addExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAddValid() {
        Expense expense = new Expense(0, 1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        Expense expected = new Expense(0, 1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        when(repository.addExpense(expense)).thenReturn(expected);
        Result<Expense> result = service.addExpense(expense);
        assertTrue(result.isSuccess());
    }
    @Test
    void shouldNotUpdateNull() {
        Expense expense = null;
        Result<Expense> result = service.updateExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotUpdateNoUserId() {
        Expense expense = new Expense(0, 0, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        Result<Expense> result = service.updateExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }
    @Test
    void shouldNotUpdateNoCategoryId() {
        Expense expense = new Expense(0, 1, 0, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        Result<Expense> result = service.updateExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }

}