import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }
  

    componentDidMount() {
      fetch("https://reqres.in/api/users?page=2")
        .then(response => response.json())
        .then(body => {
          this.setState({ data: body.data });
        });
    }
    render() {
      const { data } = this.state;
      console.log(data);
      return (
        <h1>sj</h1>
      );
    }

}

export default App;