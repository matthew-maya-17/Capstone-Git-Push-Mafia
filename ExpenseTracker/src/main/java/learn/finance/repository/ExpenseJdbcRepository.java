package learn.finance.repository;

import learn.finance.model.Category;
import learn.finance.model.Expense;
import learn.finance.repository.mappers.ExpenseMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.sql.Timestamp;
import java.util.List;

import static java.time.LocalDateTime.now;

@Repository
public class ExpenseJdbcRepository implements ExpenseRepository {
    private final JdbcTemplate jdbcTemplate;

    public ExpenseJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Expense> findAll() {
        final String sql = "SELECT expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url FROM expense;";
        return jdbcTemplate.query(sql, new ExpenseMapper());
    }

    @Override
    public List<Expense> findExpensesByUserId(int userId){
            final String sql = "SELECT expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url " +
                    "FROM expense " +
                    "WHERE user_id = ?;";
            return jdbcTemplate.query(sql, new ExpenseMapper(), userId);
    }

    @Override
    public Expense findByExpenseId(int expenseId){
        final String sql = "SELECT expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url " +
                "FROM expense " +
                "WHERE expense_id = ?;";
        return jdbcTemplate.query(sql, new ExpenseMapper(), expenseId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<Expense> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        final String sql = "SELECT expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url FROM expense " +
                "WHERE created_at BETWEEN ? AND ? ;";
        return jdbcTemplate.query(sql, new ExpenseMapper(), startDate, endDate);
    }

    @Override
        public List<Expense> findByCategory(Category category) {
        final String sql = "SELECT expense_id, user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url FROM expense " +
                "WHERE category_id = ?;";
        return jdbcTemplate.query(sql, new ExpenseMapper(), category.getCategoryId());
    }

    @Override
    public Expense addExpense(Expense expense) {
       final String sql = "INSERT INTO expense (user_id, category_id, amount, description, created_at, updated_at, approved, reimbursed, receipt_url) " +
               "VALUES (?,?,?,?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, expense.getUserId());
            ps.setInt(2, expense.getCategoryId());
            ps.setDouble(3, expense.getAmount());
            ps.setString(4, expense.getDescription());
            ps.setTimestamp(5, new Timestamp(System.currentTimeMillis()));
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
        final String sql = "UPDATE expense SET " +
                "user_id = ?, " +
                "category_id = ?, " +
                "amount = ?, " +
                "description = ?, " +
                "created_at = ?, " +
                "updated_at = ?, " +
                "approved = ?, " +
                "reimbursed = ?, " +
                "receipt_url = ? " +
                "WHERE expense_id = ?";

        return jdbcTemplate.update(sql,
                expense.getUserId(),
                expense.getCategoryId(),
                expense.getAmount(),
                expense.getDescription(),
                expense.getCreatedAt(),
                Timestamp.valueOf(now()),
                expense.isApproved(),
                expense.isReimbursed(),
                expense.getReceiptUrl(),
                expense.getExpenseId()) > 0;
    }

    @Override
    public boolean deleteExpenseById(int expenseId){
        final String sql = "DELETE FROM expense WHERE expense_id = ?";
        return jdbcTemplate.update(sql, expenseId) > 0;
    }
}
