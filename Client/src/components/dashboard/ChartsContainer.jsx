import React from "react";

import { Chart } from "react-google-charts";

const dataAccesosPorDia = [
  ["Día", "Accesos"],
  ["01/06", 30],
  ["02/06", 50],
  ["03/06", 40],
  ["04/06", 60],
  ["04/06", 60],
  ["04/06", 60],
];

const optionsAccesosPorDia = {
  title: "Entradas por Día",
  hAxis: { title: "Día", minValue: 0 },
  vAxis: { title: "Accesos", minValue: 0 },
  chartArea: { width: "50%" },
  legend: "none",
  colors: ["#3335fb"],
};

const dataAccesosPorTipo = [
  ["Tipo de Acceso", "Cantidad"],
  ["Residente", 400],
  ["Visitante", 200],
  ["Anonima", 150],
];

const optionsAccesosPorTipo = {
  title: "Distribución de Tipos de Acceso",
  pieHole: 0.75,
  is3D: false,
  chartArea: { width: "100%" },
  colors: ["#3335fb", "#5557fb", "#7779fb", "#999bfb"],
};

const ChartsContainer = () => {
  return (
    <div className="grid gap-4 py-4 md:grid-cols-2">
      <div className="rounded-xl bg-white p-[1.375rem] shadow-card">
        <Chart
          chartType="PieChart"
          data={dataAccesosPorTipo}
          options={optionsAccesosPorTipo}
          width="100%"
          height="20rem"
        />
      </div>

      <div className="rounded-xl bg-white p-[1.375rem] shadow-card">
        <Chart
          chartType="Bar"
          data={dataAccesosPorDia}
          options={optionsAccesosPorDia}
          width="100%"
          height="20rem"
        />
      </div>
    </div>
  );
};

export default ChartsContainer;
