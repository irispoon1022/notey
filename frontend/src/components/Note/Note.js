import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

// generage select dropdown option list dynamically
function Options({ options }) {
  return options.map(option => (
    <option key={option.id} content={option.content}>
      {option.content}
    </option>
  ));
}

class Note extends Component {

  render() {
    const { id, content, upnote, downnote, ruleIsLoading, rulenotes, handleDelete, handleMarkRule } = this.props;
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
        <button onClick={handleMarkRule.bind(this, id)}>
          Mark as Rule
        </button>
      </Paper>
    );
  }
}

export default Note;
