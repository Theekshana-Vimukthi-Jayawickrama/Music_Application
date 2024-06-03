package com.Tune.Book.Tune.Book.song;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SongRepository extends MongoRepository<SongDTO,String> {
    Optional<SongDTO> findById();
}
