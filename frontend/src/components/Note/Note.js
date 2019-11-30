import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./Note.css";
import ReactMarkdown from "react-markdown";
import CreatableSelect from "react-select/creatable";
import Button from "@material-ui/core/Button";
import FormDialog from "../FormDialog/FormDialog";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";

import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

import Grid from "@material-ui/core/Grid";

// generage select dropdown option list dynamically
function Options({ options }) {
  return options.map(option => (
    <option
      key={option.id}
      content={option.content}
      label={option.content}
      value={option.id}
    >
      {option.content}
    </option>
  ));
}

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: this.props.rule,
      value: this.props.upnote,
      author: this.props.author,
      content: this.props.content,
      date: this.props.date,
      title: this.props.title,
      web: this.props.web,
      book: this.props.book,
      isLoading: false
    };
  }

  handleMarkRule = (
    id,
    author,
    content,
    rule,
    date,
    title,
    web,
    upnote,
    downnote
  ) => {
    this.setState(
      prevState => ({
        rule: !prevState.rule
      }),
      () => {
        const a = {
          id: id,
          author: author,
          content: content,
          rule: this.state.rule,
          date: date,
          title: title,
          web: web,
          upnote: upnote,
          downnote: downnote
        };
        axios.put(`http://localhost:8080/api/v1/notes/${id}`, a);
      }
    );
  };

  handleDeleteRelationship = (id, upnoteid) => {
    // console.log({id, upnoteid})
    axios
      .delete(`http://localhost:8080/api/v1/notes/${id}/upnote/${upnoteid}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({
      value: newValue
    });
  };

  // Submit button for upnote
  handleClick = (id, onRefresh) => {
    this.state.value.forEach(valueElement => {
      console.log(id, valueElement.value);
      axios.post(
        `http://localhost:8080/api/v1/notes/${id}/upnote/${valueElement.value}`
      );
      // .then ({onRefresh(id)})
    });
  };

  handleNoteRefresh = id => {
    axios
      .get(`http://localhost:8080/api/v1/notes/${id}`)
      .then( response => {
        this.setState({
          rule: response.data.rule,
          value: response.data.upnote,
          author: response.data.author,
          content: response.data.content,
          date: response.data.date,
          title: response.data.title,
          web: response.data.web,
          book: response.data.book,
          isLoading: false
        })
      }
      );
  };

  setLoading = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const {
      id,
      upnote,
      downnote,
      ruleIsLoading,
      rulenotes,
      handleDelete
    } = this.props;

    const { rule, value, author, content, date, title, web, book } = this.state;
    return (
      <Grid container spacing={0} alignItems="center" direction="column">
        <Grid item xs={12} sm={6}>
          <Paper style={{ padding: 30, margin: "20px", width: "680px" }}>
          {this.state.isLoading? <p>loading</p>: (
            <div>
            <div style={{ "padding-bottom": "20px" }}>
                <CreatableSelect
                  style={{ width: "90%", float: "left" }}
                  isMulti
                  defaultValue={{ value: 1, label: "hi" }}
                  onChange={this.handleChange}
                  value={this.state.value}
                  options={
                    !ruleIsLoading
                      ? rulenotes.map(rulenote => {
                          var emptyObj = {};
                          emptyObj.value = rulenote.id;
                          emptyObj.label = rulenote.title;
                          return emptyObj;
                        })
                      : []
                  }
                />
              <Button
                variant="outlined"
                onClick={() => {
                  this.handleClick(id);
                }}
                style={{ "margin-left": "10px" }}
              >
                Submit
              </Button>
            </div>
            
            <ReactMarkdown
              escapeHtml={false}
              source={content}
              className="note"
            />
            <span className="author">{`${
              author == null ? "" : this.state.author
            } ${book == null ? "" : ` in ${book} `}`}</span>
            {(Array.isArray(upnote) && upnote.length) > 0 &&
              upnote.map(upnotea => {
                return (
                  <div>
                    <div style={{ width: "90%", float: "left" }}>
                      Can be explained by: {upnotea.content}
                    </div>
                    <IconButton
                      aria-label="delete"
                      style={{ "padding-top": 0 }}
                      onClick={() => {
                        this.handleDeleteRelationship(id, upnotea.id);
                      }}
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </div>
                );
              })}
            {(Array.isArray(downnote) && downnote.length) > 0 &&
              downnote.map(downnotea => (
                <p>Related example: {downnotea.content}</p>
              ))}
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleDelete(id);
              }}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>

            <IconButton
              aria-label="star"
              onClick={() => {
                this.handleMarkRule(
                  id,
                  author,
                  content,
                  rule,
                  date,
                  title,
                  web,
                  upnote,
                  downnote
                );
              }}
            >
              {this.state.rule ? (
                <StarRoundedIcon />
              ) : (
                <StarBorderRoundedIcon />
              )}
            </IconButton>
            <FormDialog
              id={id}
              content={content}
              author={author}
              date={date}
              title={title}
              web={web}
              book={book}
              handleNoteRefresh={this.handleNoteRefresh}
              setLoading={this.setLoading}
            ></FormDialog>
          </div>)}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Note;
