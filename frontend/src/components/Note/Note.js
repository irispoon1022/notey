import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

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
            rule:true
        }
    }
    handleMarkRuleAPI = (id, author, content, date, title, web,) => {
        const obj = {
            id: {id},
            author: {author},
            content:{content},
            rule: this.state.rule,
            date:{date},
            title:{title},
            web:{web}
          };
          axios.post(`/api/v1/notes/${id}`, obj)
              .then(res => console.log(res.data));
        // console.log({id});
        // console.log(`http://localhost:8080/api/v1/notes/${id}`);

    }

    handleMarkRule = (id, author, content, date, title, web) => {
        this.setState((prevState => ({
            rule: !prevState.rule
          })),this.handleMarkRuleAPI(id, author, content, date, title, web)

        )
    };

  render() {
    const { id, author, content, rule, date, title, web, upnote, downnote, ruleIsLoading, rulenotes, handleDelete } = this.props;
    return (
      <Paper style={{ padding: 30, margin: 20 }}>
        <select name="animal">
          <Options options={!ruleIsLoading ? rulenotes : []} />
        </select>
        <p>{content}</p>
        {(Array.isArray(upnote) && upnote.length) > 0 &&
          upnote.map(upnotea => <p>Can be explained by: {upnotea}</p>)}
        {(Array.isArray(downnote) && downnote.length) > 0 &&
          downnote.map(downnotea => <p>Related example: {downnotea}</p>)}
        <button onClick={handleDelete.bind(this, id)}>Delete</button>
        <button onClick={this.handleMarkRule.bind(this, id, author, content, rule, date, title, web)}>
          Mark as Rule
        </button>
      </Paper>
    );
  }
}

export default Note;
