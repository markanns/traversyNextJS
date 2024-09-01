"use client";

import ClipLoader from "react-spinners/ClipLoader";

const LoadingPage = () => {
  return (
    <div>
      <ClipLoader color="#000" loading={true} size={150} />
    </div>
  );
};

export default LoadingPage;
