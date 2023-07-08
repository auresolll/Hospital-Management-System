import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import useChart from "./UseChart";

interface OverviewsAnalyticChartPatientProps {
  chartLabels: string[];
  chartData: number[];
  other: any;
}

const OverviewsAnalyticChartPatient: FC<OverviewsAnalyticChartPatientProps> = ({
  chartData,
  chartLabels,
  ...other
}) => {
  const chartOptions: ApexCharts.ApexOptions = useChart({
    labels: chartLabels,
    ...other.other,
  });

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="radialBar"
      height={340}
    />
  );
};
export default OverviewsAnalyticChartPatient;
