import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { red } from "@material-ui/core/colors";
import './Note.css'
import ReactMarkdown from 'react-markdown';

// generage select dropdown option list dynamically
function Options({ options }) {
  return options.map(option => (
    <option key={option.id} content={option.content}>
      {option.content}
    </option>
  ));
}

class Note extends Component {
    constructor(props){
        super(props);
        this.state={
            rule:props.rule

        }
    }

    handleMarkRule = (id, author, content, rule, date, title, web, upnote, downnote) => {
        this.setState((prevState => ({
            rule: !prevState.rule
          })),() => {
              const a={
                  id: id,
                  author:author,
                  content:content,
                  rule:this.state.rule,
                  date:date,
                  title:title,
                  web:web,
                  upnote:upnote,
                  downnote:downnote
              }
              axios.put(`http://localhost:8080/api/v1/notes/${id}`, a)
          }

        )
    };

  render() {
    const { id, author, content, rule, date, title, web, upnote, downnote, ruleIsLoading, rulenotes, handleDelete } = this.props;
    return (
      <Paper style={{ padding: 30, margin: 20 }}>
        <select name="animal">
          <Options options={!ruleIsLoading ? rulenotes : []} />
        </select>
        <ReactMarkdown escapeHtml= {false} source={content}/>
        {(Array.isArray(upnote) && upnote.length) > 0 &&
          upnote.map(upnotea => <p>Can be explained by: {upnotea}</p>)}
        {(Array.isArray(downnote) && downnote.length) > 0 &&
          downnote.map(downnotea => <p>Related example: {downnotea}</p>)}
        <button onClick={handleDelete.bind(this, id)}>Delete</button>
        <button 
        className={this.state.rule?"buttonred":"buttongrey"}
        onClick={this.handleMarkRule.bind(this, id, author, content, rule, date, title, web, upnote, downnote)}>
          Mark as Rule
        </button>
      </Paper>
    );
  }
}

export default Note;
