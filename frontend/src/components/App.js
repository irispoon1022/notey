import React, { Component } from "react";
import "./App.css";
import SearchAppBar from "./SearchAppBar/SearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';

// generage select dropdown option list dynamically
function Options({ options }) {
  return options.map(option => (
    <option key={option.id} content={option.content}>
      {option.content}
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
      data: [],
      ruleIsLoading: true,
      rulenotes: []
    };
  }

  componentDidMount() {

        axios.get('http://localhost:8080/api/v1/notes')
        .then(response => {
          this.setState(
            {data: response.data,
            isLoading: false
            });
        })
        .catch(error => console.log(error))

      axios.get('http://localhost:8080/api/v1/notes/rulenotes')
      .then(response => {
        this.setState(
          {rulenotes: response.data,
            ruleIsLoading: false
          });
      })
      .catch(error => console.log(error))
  }

  render() {
    const { isLoading, data, rulenotes, ruleIsLoading } = this.state;

    return (
      <React.Fragment>
        <SearchAppBar />

        {!isLoading ? (
          data.map(datum => {
            const { id, content, upnote, downnote } = datum;

            return (
              <div key={id}>
                <Paper style={{ padding: 30, margin: 20 }}>
                  <select name="animal">
                    <Options options={!ruleIsLoading ? rulenotes : []} />
                  </select>
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
