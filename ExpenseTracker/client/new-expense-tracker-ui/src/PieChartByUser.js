export default function PieChartByUser(expenses) {
  const userMap = {};

  expenses.forEach((exp) => {
    if (!userMap[exp.userId]) {
      userMap[exp.userId] = 0;
    }
    userMap[exp.userId] += Number(exp.amount);
  });

  const labels = Object.keys(userMap);
  const data = Object.values(userMap);

  return {
    labels,
    datasets: [
      {
        label: "Expense by User",
        data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#B3E283",
          "#FF6384",
        ],
      },
    ],
  };
}
