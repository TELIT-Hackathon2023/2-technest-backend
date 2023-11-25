package com.hack.hackathon.service;

import com.theokanning.openai.completion.CompletionChoice;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiService {
    @Value("spring.data.openaiapikey")
    private static String openaiApiKey;
    private final OpenAiService service;

    public AiService() {
        service = new OpenAiService(openaiApiKey);
    }

    public List<String> getSuggestions(List<String> prompts) {
        if(prompts == null || prompts.size() == 0) return null;
        var completionRequest = CompletionRequest.builder()
                .model("ada")
                .echo(true);
        prompts.forEach(completionRequest::prompt);
        var buildRequest = completionRequest.build();
        return service.createCompletion(buildRequest).getChoices().stream().map(CompletionChoice::getText).toList();
    }
}
