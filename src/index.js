import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.scss';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import './i18n/config';

const render = function () {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./app/layout/App', function () {
    setTimeout(render);
  })
}

render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
