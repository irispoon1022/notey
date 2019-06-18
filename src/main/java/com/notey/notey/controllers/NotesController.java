package com.notey.notey.controllers;

import com.notey.notey.model.Note;
import com.notey.notey.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
public class NotesController {
    @Autowired
    private NoteRepository noteRepository;

    //get all notes
    @GetMapping
    public List<Note> getAllNotes(){
        List<Note> notes = noteRepository.findAll();
        return notes;
    }

    @GetMapping("/test")
    public String getTest(){
        return "Hello";
    }
    //create a new note
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void createNote(@RequestBody Note note){

    }

    //get a note by {id}
    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable("id") long id) {
        return new Note();
    }
}