import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const LazyWrapper = ({ children }) => {
  const isReduxLoading = useSelector((state) => state.loadingReducer.isLoading);
  const [isLazyLoading, setIsLazyLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLazyLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  const showSpinner = isReduxLoading || isLazyLoading;

  return (
    <Suspense fallback={null}>{showSpinner ? <Spinner /> : children}</Suspense>
  );
};

export default LazyWrapper;
