import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionEnd, asyncActionError, asyncActionStart } from '../../async/asyncReducer';
import { dataFromSnapshot } from '../../firestore/firestoreService';

export default function useFirestoreDoc({ query, data, deps, shouldExecute = true }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;

    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      snapshot => {
        if (!snapshot.exists) {
          dispatch(asyncActionError({ code: 'not-found', message: 'Could not find a document.' }));
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionEnd());
      },
      error => asyncActionError(error)
    );
    return () => {
      unsubscribe()
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}