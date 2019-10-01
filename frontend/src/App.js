import React, { Component } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import SearchAppBar from "./SearchAppBar";

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
          isLoading: false
        });
      });
  }
  render() {
    const { isLoading, data } = this.state;
    return (
      <React.Fragment>
        <SearchAppBar />
        {!isLoading ? (
          data.map(datum => {
            const { id, content, upnote, downnote } = datum;

            return (
              <div key={id}>
                {(Array.isArray(upnote) && upnote.length) > 0 &&
                  upnote.map(upnotea => <p>upnote:{upnotea.content}</p>)}
                <p>{id}</p>
                <p>{content}</p>
                {(Array.isArray(downnote) && downnote.length) > 0 &&
                  downnote.map(downnotea => (
                    <p>downnote:{downnotea.content}</p>
                  ))}
                <Button variant="contained" color="primary">
                  Hello World
                </Button>
                <hr />
              </div>
            );
          })
        ) : (
          // If there is a delay in data, let's let the user know it's loading
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

export default App;
