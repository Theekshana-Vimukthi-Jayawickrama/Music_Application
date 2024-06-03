package com.Tune.Book.Tune.Book.song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Lyrics {
    private String name;
    private String photoType;
    private byte[] data;
}
