package com.notey.notey.controllers;

import com.notey.notey.model.Note;
import com.notey.notey.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.*;

@CrossOrigin(origins = { "http://localhost:3000" })


@RestController
@RequestMapping("/api/v1/notes")
public class NotesController {
    @Autowired
    private NoteRepository noteRepository;



    //create a new note
    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteRepository.save(note);
    }

    //get all notes
    @GetMapping
    public List<Note> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        return notes;
    }

    //get a note by {id}
    @GetMapping("/{id}")
    public Note getNote(@PathVariable int id) {
        Optional<Note> note = noteRepository.findById(id);
        return note.get();
    }

    //update a note by {id}
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateNote(@RequestBody Note note, @PathVariable int id) {

        Optional<Note> noteOptional = noteRepository.findById(id);

        if (!noteOptional.isPresent())
            return ResponseEntity.notFound().build();

        note.setId(id);

        final Note updatedNote = noteRepository.save(note);

        return ResponseEntity.ok(updatedNote);
    }

    //delete a note by {id}
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable int id) {
        noteRepository.deleteById(id);
    }

    //get rule notes
    @GetMapping("/rulenotes")
    public List<Note> getRuleNotes() {
        return noteRepository.findByRuleTrue();
    }

    // API test endpoint
    @GetMapping("/test")
    public Map<String, String> getTest() {
        Map<String, String> response = new HashMap<>();
        response.put("data", "Hello");
        return response;
    }

    // add upnote
    @PostMapping("/{id}/upnote/{upnoteid}")
    public String sayHello(@PathVariable("id") int id,@PathVariable("upnoteid") int upnoteid){
        noteRepository.insertRelationship(id,upnoteid);
        return "id:"+id+ "upnoteid"+upnoteid;
    }


}