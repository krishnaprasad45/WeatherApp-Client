/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Suspense } from "react";
import { imageUrls } from "../../constants/strings";
import Spinner from "../../components/spinner/Spinner";


const LazyWeather = React.lazy(() => import("../../components/Weather/Weather"));

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${imageUrls.imageUrl1})`,
        backgroundSize: "cover",
      }}
    >
      <Suspense fallback={<Spinner />}>
        <LazyWeather />
      </Suspense>
    </div>
  );
};

export default React.memo(HomePage);
