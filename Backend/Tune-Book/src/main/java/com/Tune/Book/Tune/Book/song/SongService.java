package com.Tune.Book.Tune.Book.song;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SongService {
    private final  SongRepository songRepository;

    public void saveData(RequestSongs requestSongs, MultipartFile artist,MultipartFile code,MultipartFile song,MultipartFile notation){
        try {
            ArtistPhoto artistPhoto = ArtistPhoto.builder()
                    .name(artist.getOriginalFilename())
                    .data(artist.getBytes())
                    .photoType(artist.getContentType())
                    .build();
            Lyrics lyrics = Lyrics.builder()
                    .data(song.getBytes())
                    .name(song.getOriginalFilename())
                    .photoType(song.getContentType())
                    .build();
            SongNotation songNotation = SongNotation.builder()
                    .data(notation.getBytes())
                    .photoType(notation.getContentType())
                    .credit(requestSongs.getCreditNotes())
                    .photoType(notation.getContentType())
                    .build();
            SongCode songCode = SongCode.builder()
                    .data(code.getBytes())
                    .photoType(code.getContentType())
                    .name(code.getName())
                    .credit(requestSongs.getCreditCodes())
                    .build();
            byte[] sinhalaNameBytes = requestSongs.getSinhalaName().getBytes(StandardCharsets.UTF_8);
            SongDTO songDTO = SongDTO.builder()
                    .artistPhoto(artistPhoto)
                    .songCode(songCode)
                    .lyrics(lyrics)
                    .songNotation(songNotation)
                    .sinhalaName(new String(sinhalaNameBytes, StandardCharsets.UTF_8))
                    .name(requestSongs.getName())
                    .build();
            songRepository.save(songDTO);
        }catch (Exception e){
            System.out.println(e);
        }

    }

    public List<ResponseSongs> fetchAllSongs(){
        List<SongDTO> songDTO = songRepository.findAll();
        List<ResponseSongs> responseSongs = new ArrayList<>();
        if(!songDTO.isEmpty()){
            for(SongDTO song: songDTO){
                ResponseSongs responseSongs1 = new ResponseSongs();
                responseSongs1.setSongCode(song.getSongCode());
                responseSongs1.setSongNotation(song.getSongNotation());
                responseSongs1.setId(song.getId());
                responseSongs1.setLyrics(song.getLyrics());
                responseSongs1.setArtistPhoto(song.getArtistPhoto());
                responseSongs1.setSinhalaName(song.getSinhalaName());
                responseSongs1.setName(song.getName());
                responseSongs.add(responseSongs1);
            }
            return  responseSongs;
        }else {
            return null;
        }
    }
}
