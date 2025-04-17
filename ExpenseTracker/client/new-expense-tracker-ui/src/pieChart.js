import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CATEGORY_MAP = {
    1: "Labor",
    2: "Materials",
    3: "Transportation",
    4: "Equipment Rental",
    5: "Misc",
};

function pieChart(expenses) {
  const categoryTotals = {};

  Object.keys(CATEGORY_MAP).forEach((key) => {
    categoryTotals[CATEGORY_MAP[key]] = 0;
  });

  expenses.forEach((expense) => {
    categoryTotals[CATEGORY_MAP[expense.categoryId]] += expense.amount;
  });

  return {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };
}

export default pieChart;
