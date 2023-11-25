package com.hack.hackathon.service;

import com.hack.hackathon.dto.SendingDataDTO;

import java.io.IOException;

public interface PythonService {

    String getDataFromPython(SendingDataDTO message) throws IOException, InterruptedException;
}
