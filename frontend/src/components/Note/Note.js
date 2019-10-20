import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { red } from "@material-ui/core/colors";
import './Note.css'
import ReactMarkdown from 'react-markdown';
import Select from 'react-select';



// generage select dropdown option list dynamically
function Options({ options }) {
  return options.map(option => (
    <option key={option.id} content={option.content} label={option.content} value={option.id}>
      {option.content}
    </option>
  ));
}

class Note extends Component {
    constructor(props){
        super(props);
        this.state={
            rule:props.rule,
            value:props.upnote
        };
        this.handleSelect=this.handleSelect.bind(this);
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
    }

   handleSelect = (id) => (event) => {
      // this.setState({value: event.target.value},()=>{console.log(this.state.value,id)})
      this.setState({value: event.target.value},()=>{axios.post(`http://localhost:8080/api/v1/notes/${id}/upnote/${this.state.value}`)})
    }

    handleDeleteRelationship = (id, upnoteid) => {
      // console.log({id, upnoteid})
      axios.delete(`http://localhost:8080/api/v1/notes/${id}/upnote/${upnoteid}`).then(res => {
        console.log(res);
        console.log(res.data);
      });
    };

  render() {
    const { id, author, content, rule, date, title, web, upnote, downnote, ruleIsLoading, rulenotes, handleDelete } = this.props;
    return (
      <Paper style={{ padding: 30, margin: 20 }}>
        <select style={{ width:"80%"}} name="animal" value={this.state.value} onChange={this.handleSelect(id)}>
          <Options options={!ruleIsLoading ? rulenotes : []} />
        </select> 
        
        <ReactMarkdown escapeHtml= {false} source={content}/>
        {(Array.isArray(upnote) && upnote.length) > 0 &&
          upnote.map(upnotea => {
            return(
              <div>
                <p>Can be explained by: {upnotea.content}</p>
                <button onClick={this.handleDeleteRelationship.bind(this, id, upnotea.id)}>Delete relationship</button>
              </div>
        
          )})
        }
        {(Array.isArray(downnote) && downnote.length) > 0 &&
          downnote.map(downnotea => <p>Related example: {downnotea.content}</p>)}
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
