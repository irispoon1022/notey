package com.notey.notey.controllers;

import com.notey.notey.model.Tag;
import com.notey.notey.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000" })


@RestController
@RequestMapping("/api/v1/tags")
public class TagController {
    @Autowired
    private TagRepository tagRepository;

    //get all notes
    @GetMapping
    public List<Tag> getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        return tags;
    }

}