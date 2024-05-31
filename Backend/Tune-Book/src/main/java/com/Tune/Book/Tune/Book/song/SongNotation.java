package com.Tune.Book.Tune.Book.song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SongNotation {
    private String name;
    private String photoType;
    private String credit; //credit for creator
    private byte[] data;

}
