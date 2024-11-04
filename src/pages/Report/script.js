import React, { useRef } from 'react';
import ApexCharts from 'react-apexcharts';

function MyChartComponent() {
  const sparklineRef = useRef(null);
  const areaChartRef = useRef(null);

  const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
  const areaChartData = [
    {
      name: "2023 Sales",
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: "2024 Sales",
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ];

  const getSparklineOptions = () => {
    return {
      chart: {
        type: 'bar',
        height: 180,
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 4
        }
      },
      colors: ['#FEB019'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#FF4560'],
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.7,
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth',
        colors: ['#FF4560']
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topRight'
        },
        x: {
          show: false
        },
        y: {
          formatter: (value) => `${value}k`
        }
      },
    };
  };

  const getAreaChartOptions = () => {
    return {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      colors: ['#008FFB', '#00E396'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        type: 'category',
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yaxis: {
        title: {
          text: 'Sales (in thousands)',
          style: {
            color: '#008FFB',
            fontWeight: 600
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value) => `${value}k`
        }
      },
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div ref={sparklineRef} />
      <ApexCharts
        options={getSparklineOptions()}
        series={[{
          name: "Monthly Sales",
          data: sparklineData
        }]}
        type="bar"
        width="300"
        height="180"
        chartContainer={sparklineRef.current}
      />
      <div ref={areaChartRef} />
      <ApexCharts
        options={getAreaChartOptions()}
        series={areaChartData}
        type="area"
        width="500"
        height="350"
        chartContainer={areaChartRef.current}
      />
    </div>
  );
}

export default MyChartComponent;
