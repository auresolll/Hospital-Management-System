import React, { lazy, Suspense } from "react";

const LazyAuthentication = lazy(() => import("./Authentication"));

const Authentication = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyAuthentication {...props} />
  </Suspense>
);

export default Authentication;
