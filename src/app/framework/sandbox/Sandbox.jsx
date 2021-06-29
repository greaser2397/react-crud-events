import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';
import { openModal } from '../modals/modalReducer';

export default function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.test.data);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: { data }</h3>
      <Button color='green' content='Increment' onClick={ () => dispatch(increment(20)) }/>
      <Button color='red' content='Decrement' onClick={ () => dispatch(decrement(10)) }/>
      <Button color='teal' content='Open Modal' onClick={ () => dispatch(openModal({
        modalType: 'TestModal',
        modalProps: { data }
      })) }/>
    </>
  )
}