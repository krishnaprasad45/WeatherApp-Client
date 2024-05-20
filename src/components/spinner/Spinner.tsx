import React from 'react';

const Spinner = React.memo(() => (
  <div className="flex items-center justify-center h-screen">
    <div
      className="w-30 h-30 border-8 border-solid border-gray-200 border-t-blue-500 rounded-full animate-spin"
    ></div>
  </div>
));

export default Spinner;
