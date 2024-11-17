import { useState, useEffect } from "react";

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async (range) => {
    setRange(range);
    let startDate = "";
    let endDate = "";

    switch (range) {
      case "today":
        startDate = new Date().toISOString().split("T")[0];
        endDate = startDate;
        break;
      case "7days":
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        startDate = last7Days.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "30days":
        const last30Days = new Date();
        last30Days.setDate(new Date().getDate() - 30);
        startDate = last30Days.toISOString().split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      default:
        break;
    }

    setStartDate(startDate);
    setEndDate(endDate);

    try {
      const response = await fetch(`/api/analytics?range=${range}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos de Google Analytics:", error);
    }
  };

  useEffect(() => {
    fetchData("today");
  }, []);

  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calcular promedios
  const calculateAverages = (rows) => {
    let totalSessions = 0;
    let totalPageViews = 0;
    let totalEvents = 0;

    rows.forEach(row => {
      totalSessions += parseInt(row.metricValues[0].value, 10);
      totalPageViews += parseInt(row.metricValues[3].value, 10);
      totalEvents += parseInt(row.metricValues[5].value, 10);
    });

    return {
      averagePageViews: Math.round(totalPageViews / totalSessions),
      averageEvents: Math.round(totalEvents / totalSessions)
    };
  };

  const averages = data ? calculateAverages(data.rows) : { averagePageViews: 0, averageEvents: 0 };
  
  const formatDuration = (seconds) => { 
    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = Math.floor(seconds % 60); 
    return `${minutes} min ${remainingSeconds} sec`; 
  };

  return (
  <div className="w-auto p-3 inline-flex flex-col gap-2 bg-[rgba(256,256,256,.2)] border border-gray-400 rounded">
    <p className="w-auto font-bold text-gray-800 text-lg">Análisis de tráfico</p>
    <div className="w-auto inline-flex gap-3"> 
        <button className="text-gray-800 underline font-normal" onClick={() => fetchData("today")}>Hoy</button> 
        <button className="text-gray-800 underline font-normal" onClick={() => fetchData("7days")}>Última semana</button> 
        <button className="text-gray-800 underline font-normal" onClick={() => fetchData("30days")}>Último mes</button> 
    </div>
    <div className="w-auto p-2 bg-[rgba(256,256,256,.1)] rounded border border-gray-300">
        { range === 'today' ? (
          <p className="font-semibold text-gray-800 pb-2">{currentDate}:</p>
          ) : (
          <p className="font-semibold text-gray-800 pb-2">Del {startDate.split('-').reverse().join("/")} al {endDate.split('-').reverse().join('/')}:</p>
          )
        }

      {data ? (
        <div className="w-auto inline-flex flex-wrap gap-3">  
          <div className="w-auto p-4 rounded bg-[rgba(0,0,0,.05)] border border-gray-300">
               <h3 className="text-lg font-semibold text-gray-700">Visitas: <span className="text-[#1b7b7e]">{data.rows.length > 0 ? data.rows[0].metricValues[0].value : '0'}</span></h3>
            </div>
            <div className="w-auto p-4 rounded bg-[rgba(0,0,0,.05)] border border-gray-300">
               <h3 className="text-lg font-semibold text-gray-700">Nuevos usuarios: <span className="text-[#1b7b7e]">{data.rows.length > 0 ? data.rows[0].metricValues[1].value : '0'}</span></h3>
            </div>
            <div className="w-auto p-4 rounded bg-[rgba(0,0,0,.05)] border border-gray-300">
               <h3 className="text-lg font-semibold text-gray-700">Promedio de visita: <span className="text-[#1b7b7e]">{data.rows.length > 0 ? formatDuration(data.rows[0].metricValues[2].value) : '0'}</span></h3>
            </div>
            <div className="w-auto p-4 rounded bg-[rgba(0,0,0,.05)] border border-gray-300">
               <h3 className="text-lg font-semibold text-gray-700">Páginas vistas por visita: <span className="text-[#1b7b7e]">{isNaN(averages.averagePageViews) ? '0' : averages.averagePageViews}</span></h3>
            </div>
            <div className="w-auto p-4 rounded bg-[rgba(0,0,0,.05)] border border-gray-300">
               <h3 className="text-lg font-semibold text-gray-700">Acciones por visita: <span className="text-[#1b7b7e]">{isNaN(averages.averageEvents) ? '0' : averages.averageEvents}</span></h3>
            </div>
        </div>
      ) : (
        <div>Cargando datos...</div>
      )}
    </div>
    </div>
  );
};

export default AnalyticsDashboard;

