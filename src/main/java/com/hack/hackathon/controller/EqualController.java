package com.hack.hackathon.controller;

import com.hack.hackathon.dto.SendingDataDTO;
import com.hack.hackathon.service.PythonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/python")
public class EqualController {

    private PythonService pythonService;

    public EqualController(PythonService pythonService) {
        this.pythonService = pythonService;
    }

    @PostMapping("/sendData")
    public ResponseEntity <SendingDataDTO> sendDataToPython(@RequestBody SendingDataDTO sendingData){

        System.out.println("GottenData fromPostman--> " + sendingData.getSendData());

        String responseString  = pythonService.getDataFromPython(sendingData.getSendData());

        SendingDataDTO sendingDataDTO = new SendingDataDTO(responseString);

        return ResponseEntity.ok(sendingDataDTO);
    }
}
