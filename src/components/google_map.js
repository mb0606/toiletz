import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import axios from 'axios';
// import { getStreetView } from '../actions/index.js';
//import API_KEY from '../../keys.js';

import {connect} from 'react-redux';

const image = '../src/assets/toilet_icon.png';

export default class SimpleMap extends Component{

  constructor(props) {
    super(props);
    this.state = { hide: true };
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: false,
      streetViewControl: true,
      streetViewControlOptions:true,
      zoomControl:true,
      zoomControlOptions: true,
      panControl:true,
      panControlOptions: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick(index) {
    console.log('state before:', this.state);
    console.log('onCloseClick');
    var obj = {};
              obj['marker' + index] = false;
              this.setState(obj);
    console.log('state after:', this.state);
  }

  onClick(e) {
    //const dataURI = new Datauri();
    // let currentToilet = this.props.toilets[e];
    // let currentLocation = `${currentToilet.latitude}, ${currentToilet.longitude}`;
    // console.log('currentToilet:', currentToilet);
    // console.log('params:', 'key:', API_KEY, 'location:', currentLocation);
    // axios({
    //   url: 'https://maps.googleapis.com/maps/api/streetview',
    //   method: 'get',
    //   params: {
    //     key: API_KEY,
    //     size:'400x400',
    //     location: currentLocation
    //   },
    //   transformResponse: [ (data) => {
    //     return data;
    //   }]
    // }).then( (data) => {
    //   console.log("data from pic request:", data);
    //   //dataURI.format('.jpg', data);
    //   let b64Response = btoa(unescape(encodeURIComponent(data.data)));
    //   let dataURI = 'data:img/jpeg;base64,'+b64Response;
    //   console.log('dataURI:', dataURI);
    //   console.log('e',e)
    //   window.localStorage.setItem('dataURI', dataURI);
    //   console.log('streetview:', localStorage.getItem('dataURI'));
      this.props.toilets.map((toilet, index) => {
        var obj = {};
        obj['marker' + index] = false;
        this.setState(obj);
        console.log('this.state in toilets.map:', this.state)
      });
      var obj = {};
      obj['marker' + e] = true;
      this.setState(obj);
    // }).catch(function(err) {
    //   console.log('ERROR ERROR', err);
    // });

  }

  renderMarkers() {
    console.log('mapping markers...', this.props.toilets);
    return this.props.toilets.map((toilet, index) => {
          return (
            <Marker
              key={index}
              lat={toilet.latitude}
              lng={toilet.longitude}
              title={toilet.description}
              draggable={false}
              icon = {image}
              onClick={this.onClick.bind(this, index)}
            />
          )
    })
  }

  renderInfoWindows() {
    console.log('inside renderInfoWindows', this.props.toilets);
    return this.props.toilets.map((toilet, index) => {
          if (!this.state['marker' + index]) {
            return (null);
          } else {
            let loc = toilet.address;
            let url = `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${loc}&pitch=-0.90`
            return (
              <InfoWindow
                className='testing'
                key={index}
                lat={toilet.latitude}
                lng={toilet.longitude}
                content={'<img src="' + url + '" /><div>' + toilet.name+' -- '+toilet.description+' -- '+toilet.address + '</div>' }
                onCloseClick={this.onCloseClick.bind(this, index)}
              />
            )
          }
      })
  }


  render() {

    if(!this.props.toilets){
      return null;
    }

    let markers = this.renderMarkers();
    let infoWindows = this.renderInfoWindows();
    if(typeof this.props.toilets === "string"){
      console.log("inside if")
      return (
        <div>
        <h3>{this.props.toilets}</h3>
        </div>
      )
    }
    console.log("Gmap", this.props.toilets)

    return (
        <Gmaps
          width={'100%'}
          height={'600px'}
          lat={34.016484}
          lng={-118.496216}
          zoom={13}
          loadingMessage={'Loading...'}
          params={{v: '3.exp', key: 'AIzaSyB85KqmtnH-PdxoaFTRZRWZJLI6H48oa-Q'}}
          onMapCreated={this.onMapCreated}
        >
          {markers}
          {infoWindows}
        </Gmaps>
    );
  }

};


function mapStateToProps(state){
  return{
    toilets:state.toilets //from rootReducer (index.js in reducers)
  }
}


export default connect (mapStateToProps)(SimpleMap);
