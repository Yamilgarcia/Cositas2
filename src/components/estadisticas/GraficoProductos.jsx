import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { useTranslation } from "react-i18next";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficoProductos = ({ nombres, precios }) => {
  const { t } = useTranslation();

  const data = {
    labels: nombres,
    datasets: [
      {
        label: t("estadisticas.precio"),
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
      <h5 className="text-center">{t("estadisticas.titulo")}</h5>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoProductos;
