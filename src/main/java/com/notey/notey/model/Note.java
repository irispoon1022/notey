package com.notey.notey.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Collection;

import org.hibernate.annotations.Columns;
// import org.hibernate.annotations.Entity;
import org.hibernate.annotations.Type;

@Entity
/* @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) */
@Table(name = "quotes1")

public class Note
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Type(type="org.hibernate.type.TextType")
    // @Column(columnDefinition = "clob")
    private String content;

    private String author;

    private String book;

    private String web;

    private String date;
/*
    @JoinTable(name = "up-down", joinColumns = {
            @JoinColumn(name = "up", referencedColumnName = "id", nullable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "down", referencedColumnName = "id", nullable = false)})
    @ManyToMany
    private Collection<Note> downnote;
*/

    public Long getId() {
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

    public void setId(Long id) {
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

}
