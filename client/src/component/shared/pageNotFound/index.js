import React, { useEffect } from "react";

const PageNotFound = (props) => {
  useEffect(function () {
    document.title = "Page not found";
  }, []);
  return (
    <div>
      <h1 className="text-center font-weight-lighter">404</h1>
      <h2 className="text-center font-weight-normal">Page not found</h2>
    </div>
  );
};

export default PageNotFound;
