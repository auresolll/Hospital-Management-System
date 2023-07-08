import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import useChart from "./UseChart";

export interface AnalyticChartByRoleProps {
  chartLabels: string[];
  chartData: {
    name: string;
    type: string;
    fill: string;
    data: number[];
  }[];
  other: any;
}

const AnalyticChartByRole: FC<AnalyticChartByRoleProps> = ({
  chartLabels,
  chartData,
  ...other
}) => {
  const chartOptions: ApexCharts.ApexOptions = useChart({
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    ...other.other,
  });

  return (
    <ReactApexChart options={chartOptions} series={chartData} type="line" />
  );
};

export default AnalyticChartByRole;
