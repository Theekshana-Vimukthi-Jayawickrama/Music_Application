package com.Tune.Book.Tune.Book.song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "Songs")
public class SongDTO {
    @Id
    private String id;
    private String name;
    private  String sinhalaName;
    private ArtistPhoto artistPhoto;
    private Lyrics lyrics;
    private SongCode songCode;
    private SongNotation songNotation;
}
