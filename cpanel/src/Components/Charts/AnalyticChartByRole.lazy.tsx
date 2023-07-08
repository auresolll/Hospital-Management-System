import React, { lazy, Suspense } from "react";

const LazyAnalyticChartByRole = lazy(() => import("./AnalyticChartByRole"));

const AnalyticChartByRole = (
  props: JSX.IntrinsicAttributes & {
    children?: React.ReactNode;
    chartLabels: string[];
    chartData: {
      name: string;
      type: string;
      fill: string;
      data: number[];
    }[];
    other: any;
  }
) => (
  <Suspense fallback={null}>
    <LazyAnalyticChartByRole {...props} />
  </Suspense>
);

export default AnalyticChartByRole;
