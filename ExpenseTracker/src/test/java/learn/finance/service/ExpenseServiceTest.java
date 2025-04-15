package learn.finance.service;

import learn.finance.model.Expense;
import learn.finance.repository.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.sql.Timestamp;
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
                new Expense(1, 1, 1, 100.0, null, LocalDateTime.parse("2025-04-06 06:03:49") , null, false, false, "https://www.example.org/"),
                new Expense(2, 32, 4, 100.0, null, LocalDateTime.parse("2025-04-06 06:03:49") , null, false, false, "http://www.example.com/#actor")
                );
        when(repository.findAll()).thenReturn(expected);
        List<Expense> actual = service.findAll();
        assertEquals(expected, actual);
    }

}