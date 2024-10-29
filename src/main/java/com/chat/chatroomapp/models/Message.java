package com.chat.chatroomapp.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class Message {
    private String name;        // sender's name
    private String content;     // message content
    private String groupName;   // group name
    private String recipient;   // recipient's name (null or empty for group message)
    private boolean isPrivate;  // flag to indicate private message
}