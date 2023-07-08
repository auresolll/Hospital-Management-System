import merge from "lodash/merge";
const useChart = (options: any) => {
  const baseOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "'Roboto', sans-serif",
      zoom: { enabled: false },
      width: "100%",
      foreColor: "rgb(33, 43, 54)",
      height: "100%",
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    // Datalabels
    dataLabels: { enabled: false },
    // Grid
    grid: {
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    plotOptions: {},
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "rgb(152, 170, 191)",
        },
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        style: {
          colors: "rgb(152, 170, 191)",
        },
      },
    },
    markers: {
      size: 0,
    },

    tooltip: {
      x: {
        show: false,
      },
    },
    legend: {
      show: true,
      fontSize: String(13),
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12, vertical: 0 },
      labels: {
        colors: "rgb(33, 43, 54)",
      },
    },
  };

  return merge(baseOptions, options);
};

export default useChart;
