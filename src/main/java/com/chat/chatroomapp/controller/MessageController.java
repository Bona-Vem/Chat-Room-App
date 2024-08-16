package com.chat.chatroomapp.controller;

import com.chat.chatroomapp.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getContent(@RequestBody Message message){
//        try{
//            Thread.sleep(1000);
//        }catch (InterruptedException ex){
//            ex.printStackTrace();
//        }
        return message;
    }
}
