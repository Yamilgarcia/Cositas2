import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficoProductos = ({ nombres, precios }) => {
  const data = {
    labels: nombres,
    datasets: [
      {
        label: "Precio de productos",
        data: precios,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="card p-3">
      <h5 className="text-center">Estadísticas de Productos</h5>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoProductos;
