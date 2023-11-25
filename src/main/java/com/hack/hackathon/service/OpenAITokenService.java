package com.hack.hackathon.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class OpenAITokenService {

    @Value("${spring.data.openaiapikey}")
    private static String openaiApiKey;

    public static String getOpenaiApiKey() {
        return openaiApiKey;
    }
}
