package com.Tune.Book.Tune.Book.song;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/song")
@CrossOrigin(origins = "*")
public class SongController {

    private final SongService songService;

    @GetMapping("/get/all")
    public  ResponseEntity<List<ResponseSongs>> getAllSongs(){
        try{
            List<ResponseSongs> responseSongs = songService.fetchAllSongs();
            return ResponseEntity.ok(responseSongs);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}
