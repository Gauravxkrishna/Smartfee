import React from "react";
import ReactApexChart from "react-apexcharts";
import "font-awesome/css/font-awesome.min.css";
import './script';
const Dashboard = () => {
  const sparkOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "straight",  // Sharp, angular lines
      width: 2,
      colors: ["#808080"], // Gray line color
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.1,
        gradientToColors: ["#808080"], // Soft gray fill under the line
        inverseColors: false,
        opacityFrom: 1, // Light gray fill start
        opacityTo: 0.5,     // Gradual fade-out to fully transparent
        stops: [0, 90, 100]
      }
    },
    series: [{ data: [10, 15, 7, 12, 8, 13] }],
  };
  
  
  

  const barOptions = {
    chart: { type: "bar" },
    series: [{ name: "Sales", data: [30, 40, 45, 50, 49, 60,80,100,90,105,110,150] }],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July","Aug","Sep","oct","Nov","Dec"] },
  };

  const donutOptions = {
    chart: { type: "donut" },
    series: [44, 55, 41, 17],
    labels: ["Team A", "Team B", "Team C", "Team D"],
  };

  const areaOptions = {
    chart: { type: "area" },
    series: [{ name: "Views", data: [31, 40, 28, 51, 42, 109, 100] }],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
  };

  const lineOptions = {
    chart: { type: "line" },
    series: [{ name: "Revenue", data: [10, 15, 7, 12, 8, 13, 15] }],
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
  };

  return (
    <div className="container mx-auto px-4 bg-gray-200 p-2">
      {/* <div className="flex justify-end mt-6 mb-6">
        <a
          href="https://github.com/apexcharts/apexcharts.js/tree/master/samples/vanilla-js/dashboards/modern"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary mr-2 bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-md transition"
        >
          <span className="btn-text">View Code</span>
        </a>
      </div> */}
      <div className="main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <ReactApexChart options={sparkOptions} series={sparkOptions.series} type="line" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <ReactApexChart options={barOptions} series={barOptions.series} type="bar" />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <ReactApexChart options={donutOptions} series={donutOptions.series} type="donut" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <ReactApexChart options={areaOptions} series={areaOptions.series} type="area" />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <ReactApexChart options={lineOptions} series={lineOptions.series} type="line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
