package com.Tune.Book.Tune.Book.admin;

import com.Tune.Book.Tune.Book.auth.AuthenticationService;
import com.Tune.Book.Tune.Book.song.RequestSongs;
import com.Tune.Book.Tune.Book.song.ResponseSongs;
import com.Tune.Book.Tune.Book.song.SongService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class adminController {
    private final SongService songService;
    private final AuthenticationService authenticationService;
    private final ObjectMapper objectMapper;
    @PostMapping("/save")
    public ResponseEntity<?> saveSong(@RequestPart("requestData") String requestSongs,
                                      @RequestPart("artist") MultipartFile artist,
                                      @RequestPart("lyrics") MultipartFile lyrics,
                                      @RequestPart("notation") MultipartFile notation,
                                      @RequestPart("codes") MultipartFile codes
    ) throws JsonProcessingException {
        RequestSongs requestSongs1 = objectMapper.readValue(requestSongs,RequestSongs.class);

        try {
            songService.saveData(requestSongs1,artist,codes,lyrics,notation);
            return ResponseEntity.ok("successfully added");

        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/song")
    public  ResponseEntity<?> updateSong(@RequestPart(value = "requestData", required = false) String requestSongs,
                                         @RequestPart(value = "artist", required = false) MultipartFile artist,
                                         @RequestPart(value = "lyrics", required = false) MultipartFile lyrics,
                                         @RequestPart(value = "notation", required = false) MultipartFile notation,
                                         @RequestPart(value = "codes", required = false) MultipartFile codes,
                                         @RequestPart("id") String id
                                         ) throws JsonProcessingException {
        RequestSongs requestSongs1 = objectMapper.readValue(requestSongs,RequestSongs.class);

        try {
            songService.updateData(requestSongs1,id,artist,codes,lyrics,notation);
            return ResponseEntity.ok("successfully updated");
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/song/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable String id){
        try{
            if(songService.deleteData(id)){
                return ResponseEntity.ok("successfully deleted");
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/get/item/{id}")
    public  ResponseEntity<ResponseSongs> getAllSongs(@PathVariable String id){
        try{
            ResponseSongs responseSongs = songService.fetchSong(id);
            return ResponseEntity.ok(responseSongs);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/get/all/users")
    public ResponseEntity<?> getAllUsers(){
        try{
            return ResponseEntity.ok(authenticationService.getAllUsers());
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/removeUser/{id}")
    public ResponseEntity<?> removeUser(@PathVariable String id){
        try{
            authenticationService.removeUser(id);
           return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

}
