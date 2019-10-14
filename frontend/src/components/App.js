import React, { Component } from "react";
import "./App.css";
import SearchAppBar from "./SearchAppBar/SearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Note from "./Note/Note";

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
    axios
      .get("http://localhost:8080/api/v1/notes")
      .then(response => {
        this.setState({ data: response.data, isLoading: false });
      })
      .catch(error => console.log(error));

    axios
      .get("http://localhost:8080/api/v1/notes/rulenotes")
      .then(response => {
        this.setState({ rulenotes: response.data, ruleIsLoading: false });
      })
      .catch(error => console.log(error));
  }
  handleDelete = id => {
    axios.delete(`http://localhost:8080/api/v1/notes/${id}`).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };
  handleMarkRule = id => {};

  render() {
    const { isLoading, data, rulenotes, ruleIsLoading } = this.state;

    return (
      <React.Fragment>
        <SearchAppBar />
        {!isLoading ? (
          data.map(datum => {
            const { id, author, content, rule, date, title, web, upnote, downnote, } = datum;

            return (
              <div key={id}>
                <Note
                  id={id}
                  author={author}
                  content={content}
                  rule={rule}
                  date={date}
                  title={title}
                  web={web}
                  upnote={upnote}
                  downnote={downnote}
                  ruleIsLoading={ruleIsLoading}
                  rulenotes={rulenotes}

                  handleDelete={this.handleDelete}
                />
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
