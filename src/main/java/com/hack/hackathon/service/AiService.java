package com.hack.hackathon.service;

import com.theokanning.openai.completion.CompletionChoice;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Objects;

public class AiService {
//    @Value("spring.data.openaiapikey")
    private final String openaiApiKey = "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";
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
