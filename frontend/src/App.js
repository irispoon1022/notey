import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: []
      };
    }
  

    componentDidMount() {
      fetch("http://localhost:8080/api/v1/notes")
        .then(response => response.json())
        .then(body => {
          this.setState({ 
            data: body,
          isLoading:false, });
        });
    }
    render() {
      const { isLoading, data } = this.state;
      return (<React.Fragment>
        <h1>Random User</h1>
        {!isLoading ? (
          data.map(datum => {
            const { id,content } = datum;
            return (
              <div key={id}>
                <p>Name: {content}</p>
                <hr />
              </div>
            );
          })
        // If there is a delay in data, let's let the user know it's loading
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
      );
    }

}

export default App;