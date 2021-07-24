import React from 'react';

function WithListLoading(Component) {
  return function WithLoadingComponent({ isLoading, samples }) {
    if (!isLoading) return <Component samples={samples} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Fetching Data
      </p>
    );
  };
}
export default WithListLoading;