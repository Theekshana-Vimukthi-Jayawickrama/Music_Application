package com.Tune.Book.Tune.Book.User;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserName(String userName);

}
