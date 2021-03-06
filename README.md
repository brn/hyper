# rxx

rxx is Model-View-Intent based minimal framework with Reactjs and RxJS.

- We built more redux user friendly Model-View-Intent framework than [cyclejs](http://cycle.js.org/).
- Asynchronous process is no more problem, StateHandler make it easy and clean.
- Command line tool has been prepared! as `@rxx/cli`

Inspired by  
[cyclejs](http://cycle.js.org/)  
[redux](https://github.com/reactjs/redux)  
[react-combinators](https://github.com/milankinen/react-combinators)  
[react-reactive-toolkit](https://github.com/milankinen/react-reactive-toolkit)

## First look !

```javascript

import React from 'react';
import { Observable } from 'rxjs';
import { connect, reducer } from '@rxx/core';

function stream(source, initialState) {
  return {
    view: reducer(
      source,
      (states, payload) => {
        switch (payload.type) {
          case 'COUNTER::PLUS':
            return { ...states, count: states.count + 1 };
          case 'COUNTER::MINUS':
            return { ...states, count: states.count - 1 };
          default:
            return states;
        }
      },
      initialState
    )
  }
}

/**
 * Root component must decorated by connect like redux.
 */
@connect({
  mapIntentToProps(intent) {
    return {
      onPlus: intent.callback('COUNTER::PLUS'),
      onMinus: intent.callback('COUNTER::MINUS'),
    }
  },
  mapStateToProps(state) {
    return {
      value: state.counter.count
    }
  }
})
class View extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onPlus}>Plus</button>
        <button onClick={this.props.onMinus}>Minus</button>
        <div>conter value is {this.props.value}</div>
      </div>
    );
  }
}

const view = makeView(<View/>);
const app = makeApp({counter: stream});
const Component = app(view({counter: {count: 0}}));

render(
  <Component />
  document.querySelector('#app')
);

```

## Installation and setup

```
npm install @rxx/core
```


## Guide

- Examples
    - [Simple Counter Program](./docs/basic_guide.md)
    - [Single Page Application with react-router](./docs/spa.md)
- Basics
    - [Setup](./docs/setup.md)
    - [Create connected component](./docs/basics/create_connected_component.md)
    - [Create component with context](./docs/basics/create_component.md)
    - [Create store](./docs/basics/create_store.md)
    - [Create intent](./docs/basics/create_intent.md)
    - [StaeHandler](./docs/basics/state_handler.md)
- Advanced Usage
    - [Create your own StateHandler](./docs/au/create_yow_state_handler.md)

## Architecture

![architecture](./images/rxx.png)

## Requirements

- react >= 16.6.0
- react-dom >= 16.6.0
- rxjs >= 6.0.0 <= 6.3.3

## Modules

- [@rxx/core](modules/core)
- [@rxx/http](modules/http)
- [@rxx/testing](modules/testing)
- [@rxx/cli](modules/cli)
