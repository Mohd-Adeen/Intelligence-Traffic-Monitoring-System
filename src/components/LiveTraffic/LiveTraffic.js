import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Trafficlight from './Trafficlight';

export default class LiveTraffic extends Component {
  // center: { lat: 30.717916, lng: 76.812376 },
  static defaultProps = {
    center: {lat: 19.059517, lng: 72.836909},
    zoom: 18
  };
  constructor(){
    super()
    this.countdown = this.countdown.bind(this);
    this.state = {
      countdown: 0,
      l1: 'red',
      l2: 'red',
      l3: 'red',
      l4: 'red',
      c1: 0,
      c2: 0,
      c3: 0,
      c4: 0
    }
  }
  carf(total) {
    return total < 20
      ? 20
      : total < 40
        ? 40
        : total < 60 ? 60 : total < 80 ? 80 : total < 100 ? 100 : 120;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  countdown(time){
    let timer = setInterval(() => {
      if(this.state.countdown > 0){
        this.setState({
          countdown: this.state.countdown - 1
        })
      }
      else {
        clearInterval(timer)
        this.setState({
        countdown: time
      })
    }
    }, 1000);
  }

  componentDidMount(){
    const rand = (num) => Math.floor(Math.random() * num) + 1;
    const change = async () => {
      const lanes = 4;
      let n = 4, m = 0, flag = 1;
      let burst_time;
      while (1) {
        if(flag){
          burst_time = [rand(20), rand(20), rand(20), rand(20)];
          flag = !flag
        }
        for(let k = 0; k < 4; k++){
          this.setState({
            [`c${k+1}`]: burst_time[k]
          })
        }
        const changeTraffic = i => {
          for(let k = 0; k < 4; k++){
            if(i == k){
              burst_time[i] -= rand(Math.ceil(burst_time[i]/2));
              this.setState({
                [`c${i+1}`]: burst_time[i]
              })
            }
            else {
              console.log(k, 'groww');
              burst_time[k] += rand(3);
              this.setState({
                [`c${k+1}`]: burst_time[k]
              });
          }
        }
      }
        let totalNoOfCars = await burst_time.reduce((i, val) => val + i);
        let totalTime = await this.carf(totalNoOfCars);
        let laneTime = [];
        for (let i = 0; i < n; i++) {
          laneTime.push(Math.ceil(burst_time[i] / totalNoOfCars * totalTime));
          console.log(laneTime[i]);
        }

        if(m>3){
          m -= 4;
        }
          let y = laneTime[m];
          if (y < totalTime / 10) {
            y = totalTime / 10;
          }
          if (y > totalTime / 3) {
            y = totalTime / 3;
          }
          // this.countdown(Math.floor(y));
          let x = 0;
          console.log(`Lane ${m + 1} is green`);
          this.setState({
            [`l${m+1}`]: 'green'
          });
          while (burst_time[m] != 0 && x <= y) {
            await this.sleep(3000);
            changeTraffic(m);
            x += 3;
          }
            console.log(`Lane ${m + 1} is Yellow`);
            this.setState({
              [`l${m+1}`]: 'yellow'
            });
            console.log(this.state)

            await this.sleep(3000);
            console.log(`Lane ${m + 1} is Red`);
            this.setState({
              [`l${m+1}`]: 'red'
            });
            m +=1
      }
    }
    change();
  }
  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        layerTypes={['TrafficLayer']}
        options={{ styles: style }}
        bootstrapURLKeys={{
          key: 'AIzaSyAtx_lIJ0GsFLKtlaCsMyo7K7Rq8IeTCx4'
        }}
      >
      <div> {this.state.countdown} </div>
      
        {/* Bandra Junction Traffic Lights*/} 
        <Trafficlight color={this.state.l1} count={this.state.c1} lat={19.059465162956947} lng={72.83682229058506} />
        <Trafficlight color={this.state.l2} count={this.state.c2} lat={19.059715} lng={72.836869} />
        <Trafficlight color={this.state.l3} count={this.state.c3} lat={19.059592} lng={72.836801} />
        <Trafficlight color={this.state.l4} count={this.state.c4} lat={19.059473} lng={72.836993} />
        <Trafficlight color={this.state.l1} count={this.state.c1} lat={19.059644} lng={72.837002} />
        {/*Raymond Corner*/}
        <Trafficlight color={this.state.l2} count={this.state.c2} lat={19.059316} lng={72.834170} />
        <Trafficlight color={this.state.l3} count={this.state.c3} lat={19.059451} lng={72.834154} />
        <Trafficlight color={this.state.l4} count={this.state.c4} lat={19.059294} lng={72.834149} />
        <Trafficlight color={this.state.l2} count={this.state.c2+3} lat={19.059417} lng={ 72.834112}/>
        {/*Mangal Mahal Corner*/}
        <Trafficlight color={this.state.l2} count={this.state.c2} lat={19.059544} lng={72.829552} />
        <Trafficlight color={this.state.l3} count={this.state.c3} lat={19.059562} lng={72.829500} />
        <Trafficlight color={this.state.l4} count={this.state.c4} lat={19.059573} lng={72.829538} />
        <Trafficlight color={this.state.l2} count={this.state.c2+3} lat={19.059528} lng={72.829519}/>
        {/*National College*/}
        <Trafficlight color={this.state.l2} count={this.state.c2} lat={19.063683} lng={72.835052} />
        <Trafficlight color={this.state.l3} count={this.state.c3} lat={19.063779} lng={72.835125} />
        <Trafficlight color={this.state.l4} count={this.state.c4} lat={19.063693} lng={72.834977} />
        {/*Bandra Station*/}
        <Trafficlight color={this.state.l2} count={this.state.c2} lat={19.054016} lng={72.837792} />
        <Trafficlight color={this.state.l3} count={this.state.c3} lat={19.054182} lng={72.837862} />
        <Trafficlight color={this.state.l4} count={this.state.c4} lat={19.054169} lng={72.837726} />
        <Trafficlight color={this.state.l1} count={this.state.c1} lat={19.054038} lng={72.837930} />
      </GoogleMapReact>
    );
  }
}

const style = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7c93a3'
      },
      {
        lightness: '-10'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#a0a4a5'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#62838e'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde3e3'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#3f4a51'
      },
      {
        weight: '0.30'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: '-100'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#bbcacf'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        lightness: '0'
      },
      {
        color: '#bbcacf'
      },
      {
        weight: '0.50'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#a9b4b8'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        invert_lightness: true
      },
      {
        saturation: '-7'
      },
      {
        lightness: '3'
      },
      {
        gamma: '1.80'
      },
      {
        weight: '0.01'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a3c7df'
      }
    ]
  }
];
