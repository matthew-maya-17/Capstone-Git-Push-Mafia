package learn.finance.repository.mappers;

import learn.finance.model.Expense;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ExpenseMapper implements RowMapper<Expense> {

    @Override
    public Expense mapRow(ResultSet resultSet, int i) throws SQLException {
        Expense expense = new Expense();
        expense.setExpenseId(resultSet.getInt("expense_id"));
        expense.setUserId(resultSet.getInt("user_id"));
        expense.setCategoryId(resultSet.getInt("category_id"));
        expense.setAmount(resultSet.getDouble("amount"));
        expense.setDescription(resultSet.getString("description"));
        if (resultSet.getDate("created_at") != null) {
            expense.setCreatedAt(resultSet.getTimestamp("created_at").toLocalDateTime());
        }
        if (resultSet.getDate("updated_at") != null) {
            expense.setUpdatedAt(resultSet.getTimestamp("updated_at").toLocalDateTime());
        }
        expense.setApproved(resultSet.getBoolean("approved"));
        expense.setReimbursed(resultSet.getBoolean("reimbursed"));
        expense.setReceiptUrl(resultSet.getString("receipt_url"));
        return expense;
    }
}
