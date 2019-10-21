package com.notey.notey.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
/* @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) */
@Table(name = "Tag")
//@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class)
public class Tag
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(mappedBy = "tag")
    @JsonSerialize(using = CustomListSerializer.class)
    private List<Note> note;


    @JoinTable(name = "tagup_tagdown", joinColumns = {
            @JoinColumn(name = "tagup", referencedColumnName = "id", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "tagdown", referencedColumnName = "id", nullable = false)})
    @ManyToMany
    private List<Tag> tagdown;


    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Note> getNote() {
        return note;
    }

    public void setNote(List<Note> note) {
        this.note = note;
    }

    public List<Tag> getTagdown() {
        return tagdown;
    }

    public void setTagdown(List<Tag> tagdown) {
        this.tagdown = tagdown;
    }
}
