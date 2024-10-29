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
        if (message.isPrivate() && message.getRecipient() != null) {
            // Send private message
            String destination = "/topic/" + message.getGroupName() + "/user/" + message.getRecipient();
            messagingTemplate.convertAndSend(destination, message);
            
            // Also send a copy to the sender
            String senderDestination = "/topic/" + message.getGroupName() + "/user/" + message.getName();
            messagingTemplate.convertAndSend(senderDestination, message);
        } else {
            // Send group message
            String destination = "/topic/" + message.getGroupName();
            messagingTemplate.convertAndSend(destination, message);
        }
    }
}