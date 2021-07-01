import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export default configureStore;