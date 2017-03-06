import Person from './person';
import $ from 'jQuery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import elplanetApp from './reducers';
import App from './components/App';
import Calculator from './components/Calculator';
import converterUtils, { toFahrenheit } from './utils/converterUtils';

// import Avatar from './components/avatar';

if (typeof window !== 'undefined') {
  window.React = React;
}

let person = new Person('Den', 'Latov');
let vi = 89;
let store = createStore(elplanetApp);

$(() => {
  console.log('n', toFahrenheit(64));
  d3.select('.cont1').style('background-color', '#e0f010').style('margin-left', '60px').style('padding-left', '30px');
});


// class MyComponent extends React.Component {
//   render() {
//     /* jshint ignore:start */
//     return (
//       <Avatar>
//         <Calculator />
//         <p className="lim">Hey! In {this.props.name} nature {`${person.getFullName()} ${vi}`}</p>
//       </Avatar>
//     );
//     /* jshint ignore:end */
//   }
// }
/* jshint ignore:start */
// ReactDOM.render(<MyComponent name="Vadsa" />, document.getElementById('reapp'));
/* jshint ignore:end */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('reapp')
);