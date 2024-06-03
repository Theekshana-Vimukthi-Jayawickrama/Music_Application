package com.Tune.Book.Tune.Book.song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ResponseSongs {
    private String id;
    private String name;
    private  String sinhalaName;
    private ArtistPhoto artistPhoto;
    private Lyrics lyrics;
    private SongCode songCode;
    private SongNotation songNotation;
}
