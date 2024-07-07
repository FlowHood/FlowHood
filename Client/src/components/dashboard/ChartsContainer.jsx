import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchDashboardData } from "../../services/dashboard.service";

const COLOR_ACTUAL = "#ff5733";
const COLOR_ANTERIOR = "#3335fb";
const LOADING_TEXT = "Cargando datos...";

const ChartsContainer = () => {
  const [dataAccesosPorSemana, setDataAccesosPorSemana] = useState([["Día", "Semana Anterior", "Semana Actual"]]);
  const [dataAccesosPorTipo, setDataAccesosPorTipo] = useState([["Tipo de Acceso", "Cantidad"]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      const data = await fetchDashboardData();
      
      if (data) {
        // Procesar datos para el gráfico de accesos por semana
        const accesosPorSemana = [
          ["Día", "Semana Anterior", "Semana Actual"],
          ["Lunes", data.lastWeekUsedRequestRes.monday, data.currentWeekUsedRequestRes.monday],
          ["Martes", data.lastWeekUsedRequestRes.tuesday, data.currentWeekUsedRequestRes.tuesday],
          ["Miércoles", data.lastWeekUsedRequestRes.wednesday, data.currentWeekUsedRequestRes.wednesday],
          ["Jueves", data.lastWeekUsedRequestRes.thursday, data.currentWeekUsedRequestRes.thursday],
          ["Viernes", data.lastWeekUsedRequestRes.friday, data.currentWeekUsedRequestRes.friday],
          ["Sábado", data.lastWeekUsedRequestRes.saturday, data.currentWeekUsedRequestRes.saturday],
          ["Domingo", data.lastWeekUsedRequestRes.sunday, data.currentWeekUsedRequestRes.sunday],
        ];
        setDataAccesosPorSemana(accesosPorSemana);

        // Procesar datos para el gráfico de accesos por tipo
        const accesosPorTipo = [
          ["Tipo de Acceso", "Cantidad"],
          ["Normal", data.todayByForm.normalRequest],
          ["Anónima", data.todayByForm.anonymousRequest],
        ];
        setDataAccesosPorTipo(accesosPorTipo);
      }

      setLoading(false);
    };

    getDashboardData();
  }, []);

  const optionsAccesosPorSemana = {
    title: "Comparación de Accesos por Semana",
    hAxis: { title: "Día" },
    vAxis: { title: "Accesos" },
    legend: { position: "bottom" },
    colors: [COLOR_ANTERIOR, COLOR_ACTUAL],
    series: {
      1: { lineWidth: 2, pointSize: 5 },
      0: { lineWidth: 2, pointSize: 5 },
    },
  };

  const optionsAccesosPorTipo = {
    title: "Distribución de Tipos de Acceso",
    pieHole: 0.4,
    is3D: false,
    colors: [COLOR_ANTERIOR, COLOR_ACTUAL],
  };

  return (
    <div className="grid gap-4 py-4 md:grid-cols-2">
      {loading ? (
        <div className="text-center col-span-2">{LOADING_TEXT}</div>
      ) : (
        <>
          <div className="rounded-xl bg-white p-[1.375rem] shadow-card">
            <Chart
              chartType="LineChart"
              data={dataAccesosPorSemana}
              options={optionsAccesosPorSemana}
              width="100%"
              height="400px"
            />
          </div>

          <div className="rounded-xl bg-white p-[1.375rem] shadow-card">
            <Chart
              chartType="PieChart"
              data={dataAccesosPorTipo}
              options={optionsAccesosPorTipo}
              width="100%"
              height="400px"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChartsContainer;
