package com.Tune.Book.Tune.Book.song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RequestSongs {
    private String name;
    private  String sinhalaName;
    private String creditCodes;
    private String creditNotes;

}
