import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Segment } from 'semantic-ui-react';

export default function EventMap({ latLng }) {
  const zoom = 14;

  function Marker() {
    return (<Icon name='marker' size='big' color='red'/>)
  }

  return (
    <Segment attached='bottom' style={ { padding: 0 } }>
      <div style={ { height: 300, width: '100%' } }>
        <GoogleMapReact
          bootstrapURLKeys={ { key: "AIzaSyBu5XwhW94VtB5_Pozt1v9AFIblbW9fu_E" } }
          center={ latLng }
          zoom={ zoom }
        >
          <Marker lat={ latLng.lat } lng={ latLng.lng } text="My Marker"/>
        </GoogleMapReact>
      </div>
    </Segment>
  )
}