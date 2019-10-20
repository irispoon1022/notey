package com.notey.notey.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CustomListSerializer extends StdSerializer<List<Note>> {

    public CustomListSerializer() {
        this(null);
    }

    public CustomListSerializer(Class<List<Note>> t) {
        super(t);
    }

    @Override
    public void serialize(
            List<Note> notes,
            JsonGenerator generator,
            SerializerProvider provider)
            throws IOException, JsonProcessingException {

        List<HashMap> ids = new ArrayList<>();



        for (Note note : notes) {
            HashMap idContent = new HashMap();
            idContent.put("id",note.getId());
            idContent.put("content",note.getContent());

            ids.add(idContent);
        }
        generator.writeObject(ids);
    }
}
