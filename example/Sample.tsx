import * as React from 'react';

interface props {
  thisIsIt?: boolean;
}

const Samplee = (props: props) => {
  return (
    <div className="App">
      <h4>Hello this is it :) - {props.thisIsIt}</h4>
    </div>
  );
};

export default Samplee;
