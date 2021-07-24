import React from 'react';
const SampleList = ({samples}) => {
  if (!samples || samples.length === 0) return <p>No Project Samples</p>;
  console.log(samples);
  return (
    <ul>
      {Object.keys(samples).map((samp) => {
        return (
          <li key={samples[samp].id} className='list'>
            <span className='sample-text'>{samples[samp].filename} </span>
          </li>
        );
      })}
    </ul>
  );
};
export default SampleList