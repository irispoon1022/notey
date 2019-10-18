package com.notey.notey.repositories;

import com.notey.notey.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note,Integer> {

    List<Note> findByRuleTrue();

    @Modifying
    @Query(value = "INSERT INTO up_down (up,down) VALUES (:upnoteid, :id)",
            nativeQuery = true)
    @Transactional(rollbackFor=Exception.class)
    public void insertRelationship(@Param("upnoteid") int upnoteid, @Param("id") int id);


}
