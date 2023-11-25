package com.hack.hackathon.controller;

import com.hack.hackathon.payload.TestPayload;
import com.hack.hackathon.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/test/openai")
public class TestOpenAI {
    private AiService aiService = new AiService();

    @GetMapping
    public ResponseEntity<List<String>> getAllTests() {
        var suggestions = aiService.getSuggestions(List.of("How is the weather today"));
        System.out.println("Suggestions: " + suggestions);
        return ResponseEntity.ok(suggestions);
    }
}
