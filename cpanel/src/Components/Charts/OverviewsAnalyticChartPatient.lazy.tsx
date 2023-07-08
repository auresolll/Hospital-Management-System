import React, { lazy, Suspense } from "react";

const LazyOverviewsAnalyticChartPatient = lazy(
  () => import("./OverviewsAnalyticChartPatient")
);

const OverviewsAnalyticChartPatient = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyOverviewsAnalyticChartPatient {...props} />
  </Suspense>
);

export default OverviewsAnalyticChartPatient;
