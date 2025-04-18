import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const option = {
  plugins: {
    legend: true,
  },
  scales: {
    y: {},
  },
};


const lineGraph = (expenses, selectedYear) => {
    const monthData = {}

    expenses.forEach(expense => {
        const date = new Date(expense.createdAt)
        if(date.getFullYear() === selectedYear){
            const month = date.toLocaleString("default", { month: "short" });
            monthData[month] = (monthData[month] || 0) + expense.amount;
        }
    });

  const allMonths = [
    "Jan","Feb","Mar",
    "Apr","May","Jun",
    "Jul","Aug","Sep",
    "Oct","Nov","Dec"
  ];

  const data = {
    labels: allMonths, 
    datasets: [
      {
        label: "Expenses", 
        data: allMonths.map(month => monthData[month] || 0),
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        borderColor: "black",
        pointBackgroundColor: "aqua",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return { data, option };
};

export default lineGraph;
