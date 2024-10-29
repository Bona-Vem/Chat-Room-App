// MessageController.java
package com.chat.chatroomapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.chat.chatroomapp.models.Message;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
public class MessageController {
    
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/message")
    public void handleMessage(Message message) {
        // Construct the destination dynamically
        String destination = "/topic/" + message.getGroupName();
        messagingTemplate.convertAndSend(destination, message);
    }
}