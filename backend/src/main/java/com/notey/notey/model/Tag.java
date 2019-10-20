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
}
