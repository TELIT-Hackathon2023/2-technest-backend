package com.hack.hackathon.controller;

import com.hack.hackathon.documents.Test;
import com.hack.hackathon.payload.TestPayload;
import com.hack.hackathon.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    private final TestService testService;

    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping
    public ResponseEntity<List<TestPayload>> getAllTests() {
        List<TestPayload> payload = testService.findAll().stream()
                .map(test -> {
                    TestPayload tp = new TestPayload();
                    tp.setId(test.getId());
                    tp.setTest(test.getTest());
                    return tp;
                }).collect(Collectors.toList());
        return ResponseEntity.ok(payload);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestPayload> getTestById(@PathVariable String id) {
        Test test = testService.findById(id);
        if (test == null) {
            return ResponseEntity.notFound().build();
        }
        TestPayload payload = new TestPayload();
        payload.setId(test.getId());
        payload.setTest(test.getTest());
        return ResponseEntity.ok(payload);
    }

    @PostMapping
    public ResponseEntity<TestPayload> createTest(@RequestBody TestPayload testPayload) {
        Test test = new Test();
        test.setTest(testPayload.getTest());
        Test savedTest = testService.save(test);
        testPayload.setId(savedTest.getId());
        return ResponseEntity.ok(testPayload);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestPayload> updateTest(@PathVariable String id, @RequestBody TestPayload testPayload) {
        Test existingTest = testService.findById(id);
        if (existingTest == null) {
            return ResponseEntity.notFound().build();
        }
        existingTest.setTest(testPayload.getTest());
        testService.save(existingTest);
        return ResponseEntity.ok(testPayload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTest(@PathVariable String id) {
        testService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
