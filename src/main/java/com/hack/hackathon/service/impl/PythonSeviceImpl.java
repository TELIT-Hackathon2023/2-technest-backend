package com.hack.hackathon.service.impl;

import com.hack.hackathon.service.PythonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class PythonSeviceImpl implements PythonService {

    @Value("${spring.data.app.pythonflusk.address}")
    private String pythonServerAddress;
    @Override
    public String getDataFromPython(String message) {


        // System.out.println("SendingRequestDataTo --> "+ pythonServerAddress);

        // Set up headers
        // You can use different models from dto or response classes
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        // Create an HTTP entity with the data and headers
        HttpEntity<String> requestEntity = new HttpEntity<>(message, headers);

        // Make the POST request and receive Python response
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(pythonServerAddress+"/api/receiveData", requestEntity, String.class);

        // Extract and print the response from Python
        String pythonResponse = responseEntity.getBody();
        // System.out.println("Response from Python: " + pythonResponse);
        return pythonResponse;

    }
}
