package com.hack.hackathon.service.impl;

import com.hack.hackathon.dto.SendingDataDTO;
import com.hack.hackathon.service.PythonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


@Service
public class PythonSeviceImpl implements PythonService {

    @Value("${spring.data.app.pythonflusk.address}")
    private String pythonServerAddress;
    @Override
    public String getDataFromPython(SendingDataDTO message) throws IOException, InterruptedException {


        return sendRequest(message);

//        return runScript(message);
//        return null;

    }

    private String runScript(String message) throws IOException, InterruptedException {




        String scriptPath = "/Users/artempetrenko/Java/DtHackathon/2-technest-backend/src/main/java/com/hack/hackathon/utils/concatenate.py";

        // Construct the command with variables as arguments
        ProcessBuilder processBuilder = new ProcessBuilder("python3", scriptPath, Integer.toString(4), Integer.toString(4));

        // You can add more variables as needed
        long startTime = System.currentTimeMillis();

        Process process = processBuilder.start();

        // Wait for the script to finish
        int exitCode = process.waitFor();

        // Read the output of the script
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;
        double seconds = duration / 1000.0;

        System.out.println("Execution time: " + seconds + " seconds");


        // You can now use 'output.toString()' to get the output of the script
        System.out.println("Script output: " + output.toString());

        // Return the exit code as a response
        return "Script executed with exit code: " + exitCode + "\nOutput:\n" + output.toString();


//        return null;
    }

    private String  sendRequest(SendingDataDTO message){

        // System.out.println("SendingRequestDataTo --> "+ pythonServerAddress);

        // Set up headers
        // You can use different models from dto or response classes
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        System.out.println("SendingData --> "+ message.getSendData() );

        // Create an HTTP entity with the data and headers
        HttpEntity<SendingDataDTO> requestEntity = new HttpEntity<>(message, headers);

        // Make the POST request and receive Python response
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<SendingDataDTO> responseEntity = restTemplate.postForEntity(pythonServerAddress+"/api/receiveData", requestEntity ,SendingDataDTO.class);

        // Extract and print the response from Python
//        SendingDataDTO pythonResponse = responseEntity.getBody();
        // System.out.println("Response from Python: " + pythonResponse);

        return responseEntity.getBody().getSendData().toString();
//        return pythonResponse.getSendData();
    }


}
