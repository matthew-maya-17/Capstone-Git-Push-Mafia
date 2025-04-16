import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const url = "http://localhost:8080/api/expense";
    const navigate = useNavigate();
}

export default ExpenseList;
