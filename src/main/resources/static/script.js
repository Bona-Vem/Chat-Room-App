// script.js
let stompClient = null;
let currentGroupName = null;

function connect() {
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("Connected " + frame);
        $("#name-from").addClass('d-none');
        $("#chat-room").removeClass('d-none');

        // SUBSCRIBE
        stompClient.subscribe(`/topic/${currentGroupName}`, function (response) {
            showMessage(JSON.parse(response.body));
        });
    });
}

function showMessage(message) {
    $("#message-container-table").append(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
}

function sendMessage(message) {
    let jsonOb = {
        name: localStorage.getItem("name"),
        content: $("#message-value").val(),
        groupName: currentGroupName // Include the groupName
    };
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
}



$(document).ready((e) => {

    $("#login").click(() => {
        let name = $("#name-value").val();
        let groupName = $("#groupName").val();
        currentGroupName = groupName; // Store the group name
        localStorage.setItem("name", name);
        $("#name-title").html(`Welcome, <b>${name}</b> to group <b>${groupName}</b>`);
        connect();
    });

    $("#send-btn").click(() => {
        sendMessage();
    });

    $("#logout").click(() => {
        localStorage.removeItem("name");
        if (stompClient != null) {
            stompClient.disconnect();
            $("#name-from").removeClass('d-none');
            $("#chat-room").addClass('d-none');
        }
    });
});