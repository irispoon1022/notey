package com.notey.notey.controllers;

import com.notey.notey.model.Note;
import com.notey.notey.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
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

    //create a new note
    @PostMapping
    public Note createNote(@RequestBody Note note){
        return noteRepository.save(note);
    }

    //get a note by {id}
    @GetMapping("/{id}")
    public Note getNote(@PathVariable long id){
        Optional<Note> note= noteRepository.findById(id);
        return note.get();
    }

    // API test endpoint
    @GetMapping("/test")
    public Map<String, String> getTest(){
        Map<String, String> response = new HashMap<>();
        response.put("data", "Hello");
        return response;
    }

}