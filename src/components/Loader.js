import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="blue" strokeWidth="3" fill="none" />
      </svg>
    </div>
    // <div className="d-flex justify-content-center mt-5">
    //   <img
    //     src="https://img.icons8.com/material-outlined/48/000000/iphone-spinner--v2.png"
    //     alt="Please wait hile we fetch you data..."
    //   />
    // </div>
  );
};
export default Loader;
