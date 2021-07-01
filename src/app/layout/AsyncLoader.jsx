import React from 'react';
import { Dimmer } from 'semantic-ui-react';

export default function Loader({ inverted = true, content = 'Loading...' }) {
  return (
    <Dimmer inverted={ inverted } active={true}>

    </Dimmer>
  )
}