package com.hack.hackathon.service;

import com.hack.hackathon.documents.Test;

import java.util.List;

public interface TestService {
    List<Test> findAll();
    Test findById(String id);
    Test save(Test test);
    void deleteById(String id);
    // Other business logic methods can be added here
}