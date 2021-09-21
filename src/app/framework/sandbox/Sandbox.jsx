import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';
import { openModal } from '../modals/modalReducer';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.test.data);
  const [target, setTarget] = useState(null);
  const { loading } = useSelector(state => state.async);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } })
  }

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: { data }</h3>
      <Button name='increment' loading={ loading && target === 'increment' } color='green' content='Increment'
              onClick={ e => {
                dispatch(increment(20));
                setTarget(e.target.name);
              } }/>
      <Button name='decrement' loading={ loading && target === 'decrement' } color='red' content='Decrement'
              onClick={ e => {
                dispatch(decrement(20));
                setTarget(e.target.name);
              } }/>
      <Button color='teal' content='Open Modal' onClick={ () => dispatch(openModal({
        modalType: 'TestModal',
        modalProps: { data }
      })) }/>
      <div style={ { marginTop: 15 } }>
        <TestPlaceInput setLocation={ handleSetLocation }/>
      </div>
      <div>
        <TestMap location={ location }/>
      </div>
    </>
  )
}