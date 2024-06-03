package com.Tune.Book.Tune.Book.User;


import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<UserRole, String> {
    Optional<UserRole> findByName(Role name);
}

