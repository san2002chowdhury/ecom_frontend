import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = ({ loading }) => {
  return (
    <div style={{ margin: "0px auto" }}>
      <ClipLoader
        color="green"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Loading;
