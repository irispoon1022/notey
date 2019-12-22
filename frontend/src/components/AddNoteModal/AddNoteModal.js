import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function AddNoteModal(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    // props.setLoading();
    
    const a = {
      author: values.author || props.author,
      content: values.content || props.content,
      date: values.date || props.date,
      title: values.title || props.title,
      web: values.web || props.web,
      book: values.book || props.book
    };
    console.log(a)
    axios.post(`http://localhost:8080/api/v1/notes`, a)
    // .then(() => {props.handleNoteRefresh(props.id)})
  };
 

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });

  };

  const handleClone = () => {
    const a = {
      author: values.author || props.author,
      content: values.content || props.content,
      date: values.date || props.date,
      title: values.title || props.title,
      web: values.web || props.web,
      book: values.book || props.book
    };
    console.log(a)
    axios.post(`http://localhost:8080/api/v1/notes`, a)
    .then( () => {setValues ({...values})})

  }

  return (
    <React.Fragment>
        <Fab color="primary" aria-label="add" style={{position:"fixed", bottom:"24px", right:"24px"}} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            fullWidth
            multiline
            defaultValue={props.content}
            value={values.name}
            onChange={handleChange('content')}
          />
          <TextField
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            multiline
            defaultValue={props.title}
            value={values.name}
            onChange={handleChange('title')}
          />
          <TextField
            margin="dense"
            id="name"
            label="Author"
            fullWidth
            defaultValue={props.author}
            value={values.name}
            onChange={handleChange('author')}
          />
          <TextField
            margin="dense"
            id="name"
            label="Book"
            fullWidth
            defaultValue={props.book}
            value={values.name}
            onChange={handleChange('book')}
          />
          <TextField
            margin="dense"
            id="name"
            label="Web"
            fullWidth
            defaultValue={props.web}
            value={values.name}
            onChange={handleChange('web')}
          />
          <TextField
            margin="dense"
            id="name"
            label="Date"
            fullWidth
            defaultValue={props.date}
            value={values.name}
            onChange={handleChange('date')}
          />
        </DialogContent>

        <DialogActions>
        <Button onClick={handleClone} color="primary">
            Clone
          </Button>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}