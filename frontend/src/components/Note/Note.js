import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./Note.css";
import ReactMarkdown from "react-markdown";
import CreatableSelect from "react-select/creatable";
import Button from "@material-ui/core/Button";
import FormDialog from "../FormDialog/FormDialog";

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
      rule: props.rule,
      value: props.upnote
    };
    this.handleCLick = this.handleClick.bind(this);
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

  // handleSelect = id => event => {
  //   // this.setState({value: event.target.value},()=>{console.log(this.state.value,id)})
  //   this.setState({ value: event.target.value }, () => {
  //     axios.post(
  //       `http://localhost:8080/api/v1/notes/${id}/upnote/${this.state.value}`
  //     );
  //   });
  // };

  handleDeleteRelationship = (id, upnoteid) => {
    // console.log({id, upnoteid})
    axios
      .delete(`http://localhost:8080/api/v1/notes/${id}/upnote/${upnoteid}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  handleChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({
      value: newValue
    });
  };
  handleClick = id => {
    this.state.value.forEach(valueElement => {
      console.log(id, valueElement.value);
      axios.post(
        `http://localhost:8080/api/v1/notes/${id}/upnote/${valueElement.value}`
      );
    });
  };

  render() {
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
      downnote,
      ruleIsLoading,
      rulenotes,
      handleDelete,
      value
    } = this.props;
    return (
      <Paper style={{ padding: 30, margin: 20 }}>
        <div style={{"padding-bottom":"20px"}}>
          <div style={{ width: "90%", float: "left" }}>
            <CreatableSelect
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
          </div>
          <Button variant="outlined" onClick={this.handleClick.bind(this, id)} style={{ "margin-left": "10px"}}>
            Submit
          </Button>
        </div>
        <ReactMarkdown escapeHtml={false} source={content} />
        {(Array.isArray(upnote) && upnote.length) > 0 &&
          upnote.map(upnotea => {
            return (
              <div>
                <p>Can be explained by: {upnotea.content}</p>

                <Button
                  variant="outlined"
                  onClick={this.handleDeleteRelationship.bind(
                    this,
                    id,
                    upnotea.id
                  )}
                >
                  Delete
                </Button>
              </div>
            );
          })}
        {(Array.isArray(downnote) && downnote.length) > 0 &&
          downnote.map(downnotea => (
            <p>Related example: {downnotea.content}</p>
          ))}
        <button onClick={handleDelete.bind(this, id)}>Delete</button>
        <button
          className={this.state.rule ? "buttonred" : "buttongrey"}
          onClick={this.handleMarkRule.bind(
            this,
            id,
            author,
            content,
            rule,
            date,
            title,
            web,
            upnote,
            downnote
          )}
        >
          Mark as Rule
        </button>
        {/* <button onClick={handleClickOpen.bind(this, id)}>Edit</button> */}
        <FormDialog id={id} content={content} author={author} date={date} title={title} web={web} book={book}></FormDialog>
      </Paper>
    );
  }
}

export default Note;
