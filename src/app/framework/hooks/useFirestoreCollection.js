import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActionEnd, asyncActionError, asyncActionStart } from '../async/asyncReducer';
import { dataFromSnapshot } from '../firestore/firestoreService';

export default function useFirestoreCollection({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionEnd());
      },
      error => asyncActionError(error)
    );
    return () => {
      unsubscribe()
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}