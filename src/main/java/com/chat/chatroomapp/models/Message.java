package com.chat.chatroomapp.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class Message {


    private String groupName;
    private String name;
    private String content;


}
