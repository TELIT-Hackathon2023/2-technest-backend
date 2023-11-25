package com.hack.hackathon.repository;

import com.hack.hackathon.documents.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
    // Custom query methods can be defined here if needed
}