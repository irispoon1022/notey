import React, { Component } from "react";
import "./App.css";
import SearchAppBar from "./SearchAppBar/SearchAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Note from "./Note/Note";
import Chip from "@material-ui/core/Chip";
import LazyLoad from "react-lazyload";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      ruleIsLoading: true,
      rulenotes: [],
      tagIsLoading: true,
      tags: []
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

    axios
      .get("http://localhost:8080/api/v1/tags")
      .then(response => {
        this.setState({ tags: response.data, tagIsLoading: false });
      })
      .catch(error => console.log(error));
  }

  handleDelete = id => {
    const updatedData = this.state.data.filter(function isNotId(datum) {
      return datum.id !== id;
    });

    this.setState({
      data: updatedData
    });

    axios.delete(`http://localhost:8080/api/v1/notes/${id}`).then();
  };
  handleMarkRule = id => {};

  handleClick = (tagId, tags) => {
    console.log(tagId, tags);

    function a(tag) {
      return tag.id === tagId;
    }
    let noteIdList = tags.filter(a)[0].note.map(item => item.id);
    console.log(noteIdList);
    const updatedData = this.state.data.filter(function matchId(datum) {
      return noteIdList.includes(datum.id);
    });
    this.setState({
      data: updatedData
    });
  };


  render() {
    const {
      isLoading,
      data,
      rulenotes,
      ruleIsLoading,
      tags,
      tagIsLoading
    } = this.state;
    const array = [1, 2];
    return (
      <React.Fragment>
        <SearchAppBar />
        <div style={{ padding: "16px", backgroundColor: "#F9FCFF" }}>
          {<span>Tags:</span>}
          {!tagIsLoading ? (
            tags.map(tag => (
              <Chip
                style={{ margin: "8px" }}
                label={tag.name}
                onClick={() => {this.handleClick(tag.id, tags)}}
              ></Chip>
            ))
          ) : (
            <p>Tag is loading</p>
          )}

          {data.map(datum => {
            const {
              id,
              author,
              content,
              rule,
              date,
              title,
              web,
              book,
              upnote,
              downnote
            } = datum;

            return (
              <LazyLoad key={id} placeholder={<p>loading</p>}>
                <div key={id}>
                  <Note
                    id={id}
                    author={author}
                    content={content}
                    rule={rule}
                    date={date}
                    title={title}
                    web={web}
                    book={book}
                    upnote={upnote}
                    downnote={downnote}
                    ruleIsLoading={ruleIsLoading}
                    rulenotes={rulenotes}
                    onRefresh={this.handleRefreshCard}
                    handleDelete={this.handleDelete}
                  />
                </div>
              </LazyLoad>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
