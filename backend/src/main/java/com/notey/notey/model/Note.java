package com.notey.notey.model;

import javax.persistence.*;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Type;

@Entity
/* @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) */
@Table(name = "quotes1")
//@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class)
public class Note
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Lob
    @Type(type="org.hibernate.type.TextType")

    private String content;

    private String author;

    private Boolean rule;

    private String book;

    private String web;

    private String date;

    @JoinTable(name = "up_down", joinColumns = {
            @JoinColumn(name = "up", referencedColumnName = "id", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "down", referencedColumnName = "id", nullable = false)})
    @ManyToMany
    @JsonSerialize(using = CustomListSerializer.class)
    private List<Note> downnote;
    
    @ManyToMany(mappedBy = "downnote")
    @JsonSerialize(using = CustomListSerializer.class)
    private List<Note> upnote;

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }


    public String getAuthor() {
        return author;
    }

    public String getBook() {
        return book;
    }

    public String getWeb() {
        return web;
    }

    public String getDate() {
        return date;
    }


    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setBook(String book) {
        this.book = book;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Note> getDownnote() {
        return downnote;
    }

    public void setDownnote(List<Note> downnote) {
        this.downnote = downnote;
    }

    public List<Note> getUpnote() {
        return upnote;
    }

    public void setUpnote(List<Note> upnote) {
        this.upnote = upnote;
    }

    public Boolean getRule() {
        return rule;
    }

    public void setRule(Boolean rule) {
        this.rule = rule;
    }

}
