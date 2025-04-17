
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function lineGraph(expenses) {
    const monthlyTotals = {};

    expenses.array.forEach(element => {
        const date = new Date(expenses.createdAt)
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2.)}`
    });

}

export default lineGraph;
