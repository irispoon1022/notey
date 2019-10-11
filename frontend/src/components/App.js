import React, { Component } from "react";
import "./App.css";
import SearchAppBar from "./SearchAppBar/SearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const animalsList = [
  {
    id: 1,
    value: "Tiger"
  },
  {
    id: 2,
    value: "Lion"
  },
  {
    id: 3,
    value: "Dog"
  },
  {
    id: 4,
    value: "Cat"
  }
];

// generage select dropdown option list dynamically
function Options({ options }) {
  return options.map(option => (
    <option key={option.id} value={option.value}>
      {option.value}
    </option>
  ));
}
// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3, 2),
//   },
// }));

// const classes = useStyles();

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

        <select name="animal">
          <Options options={animalsList} />
        </select>

        {!isLoading ? (
          data.map(datum => {
            const { id, content, upnote, downnote } = datum;

            return (
              <div key={id}>
                <Paper style={{ padding: 30, margin: 20 }}>
                  <p>{content}</p>
                  {(Array.isArray(upnote) && upnote.length) > 0 &&
                    upnote.map(upnotea => (
                      <p>Can be explained by: {upnotea}</p>
                    ))}
                  {(Array.isArray(downnote) && downnote.length) > 0 &&
                    downnote.map(downnotea => (
                      <p>Related example: {downnotea}</p>
                    ))}
                </Paper>
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
