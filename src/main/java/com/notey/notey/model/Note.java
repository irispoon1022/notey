package com.notey.notey.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
/* @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) */
@Table(name = "quotes")

public class Note
{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String content;

    private String author;

    private String from;

    private String web;

    private String date;

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

    public String getFrom() {
        return from;
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

}
