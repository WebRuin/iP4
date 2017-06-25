import React from 'react';
import GoogleMapReact from 'google-map-react';

import Todo from '../components/Todo';
import * as TodoActions from '../actions/TodoActions';
import TodoStore from '../stores/TodoStore';
import styles from './styles/map.scss'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Todos extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  }

  componentWillMount() {
    TodoStore.on('change', this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener('change', this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyC9hqsjWIc-BV6-TT16OrK2RqpwgLNnQ6Q'
          }}
          className='map'
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
