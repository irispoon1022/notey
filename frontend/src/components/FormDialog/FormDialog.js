import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
    const a = {
      id: props.id,
      author: values.author || props.author,
      content: values.content || props.content,
      date: values.date || props.date,
      title: values.title || props.title,
      web: values.web || props.web,
      book: values.book || props.book
    };
    console.log(a)
    axios.put(`http://localhost:8080/api/v1/notes/${props.id}`, a);
  };
  const [values, setValues] = React.useState({
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });

  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit note</DialogTitle>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}