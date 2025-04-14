package learn.finance.repository;

import learn.finance.model.Category;
import learn.finance.model.Expense;
import learn.finance.repository.mappers.ExpenseMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class ExpenseJdbcRepository implements ExpenseRepository {
    private final JdbcTemplate jdbcTemplate;

    public ExpenseJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Expense> findAll() {
        final String sql = "select expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url from expense;";
        return jdbcTemplate.query(sql, new ExpenseMapper());
    }

    @Override
    public List<Expense> findByDateRange(Date startDate, Date endDdate) {
        final String sql = "select expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url from expense" +
                "where create_at between ? and ? ;";
        return jdbcTemplate.query(sql, new ExpenseMapper(), startDate, endDdate);
    }

    @Override
    public List<Expense> findByCategory(Category category) {
        final String sql = "select expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url from expense" +
                "where category_id = ? ;";
        return jdbcTemplate.query(sql, new ExpenseMapper(), category.getCategoryId());
    }

    @Override
    public Expense addExpense(Expense expense) {
       final String sql = "insert into expense (user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url) " +
               "values (?,?,?,?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, expense.getUserId());
            ps.setInt(2, expense.getCategoryId());
            ps.setDouble(3, expense.getAmount());
            ps.setString(4, expense.getDescription());
            ps.setTimestamp(5, expense.getCreatedAt() == null ? null : Timestamp.valueOf(expense.getCreatedAt()));
            ps.setTimestamp(6, expense.getUpdatedAt() == null ? null : Timestamp.valueOf(expense.getUpdatedAt()));
            ps.setBoolean(7, expense.isApproved()); // for BIT -> boolean
            ps.setBoolean(8, expense.isReimbursed()); // for BIT -> boolean
            ps.setString(9, expense.getReceiptUrl());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        expense.setExpenseId(keyHolder.getKey().intValue());
        return expense;

    }

    @Override
    public boolean updateExpense(Expense expense) {
        final String sql = "update expense set " +
                "user_id = ?, " +
                "category_id = ?, " +
                "amount = ?, " +
                "description = ?, " +
                "created_at = ?, " +
                "updated_at = ?, " +
                "approved = ?, " +
                "reimbursed = ?, " +
                "receipt_url = ? " +
                "where expense_id = ?";

        return jdbcTemplate.update(sql,
                expense.getUserId(),
                expense.getCategoryId(),
                expense.getAmount(),
                expense.getDescription(),
                expense.getCreatedAt(),
                expense.getUpdatedAt(),
                expense.isApproved(),
                expense.isReimbursed(),
                expense.getReceiptUrl(),
                expense.getExpenseId()) > 0;
    }

    @Override
    public boolean updateStatus(int expenseId) {
        final String sql = "UPDATE expense SET approved = true WHERE expense_id = ?";
        return jdbcTemplate.update(sql, expenseId) > 0;
    }
}
