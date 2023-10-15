import React from 'react';

export default class Statistics extends React.Component {
  render() {
    return (
      <div style={{width: '100%', height: '100%', 'overflow-y': 'scroll'}}>
        <iframe src={'/stats.html'} style={styles.map} />
        <br/> 
        <br/> 
        <br/> 
        
      </div>
    );
  }
}

const styles = {
  map: {
    width: '100%',
    height: '82vh',
    border: 'none'
  }
};
