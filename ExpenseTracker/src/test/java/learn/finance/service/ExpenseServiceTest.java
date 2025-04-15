package learn.finance.service;

import learn.finance.model.Category;
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
                new Expense(2, 32, 4, 100.0, null, LocalDateTime.parse("2025-04-06T06:03:49") , null, false, false, "http://www.example.com/#actor")
                );
        when(repository.findAll()).thenReturn(expected);
        List<Expense> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindByDateRange(){
        LocalDateTime start = LocalDateTime.parse("2025-04-06T06:03:49");
        LocalDateTime end = LocalDateTime.parse("2025-04-06T06:03:49");

        List<Expense> expenses = List.of(
                new Expense(1, 1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/"),
                new Expense(2, 32, 4, 100.0, null, LocalDateTime.parse("2025-04-06T06:03:49") , null, false, false, "http://www.example.com/#actor")
        );

        when(repository.findByDateRange(start, end)).thenReturn(expenses);
        List<Expense> result = service.findByDateRange(start,end);
        assertEquals(expenses, result);
    }

    @Test
    void shouldFindByCategory(){
        List<Expense> expenses = List.of(
                new Expense(1, 1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/"),
                new Expense(2, 32, 1, 100.0, null, LocalDateTime.parse("2025-04-06T06:03:49") , null, false, false, "http://www.example.com/#actor")
        );

        when(repository.findByCategory(Category.LABOR)).thenReturn(expenses);

        List<Expense> result = service.findByCategory(Category.LABOR);
        assertEquals(expenses, result);
    }

    @Test
    void shouldNotAddNull(){
        Expense expense = null;
        Result<Expense> result = service.addExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNoUserId(){
        Expense expense = new Expense(0, -1, 1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        Result<Expense> result = service.addExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddNoCategoryId(){
        Expense expense = new Expense(0, 1, -1, 100.0, null, LocalDateTime.parse("2025-07-15T14:30:00") , null, false, false, "https://www.example.org/");
        Result<Expense> result = service.addExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddMissingCreatedAt(){
        Expense expense = new Expense(0, 1, 1, 100.0, null, null , null, false, false, "https://www.example.org/");
        Result<Expense> result = service.addExpense(expense);
        assertEquals(ResultType.INVALID, result.getType());
    }
}