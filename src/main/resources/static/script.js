let stompClient = null;
let currentGroupName = null;
let userName = null;

function connect() {
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("Connected " + frame);
        $("#name-from").addClass('d-none');
        $("#chat-room").removeClass('d-none');

        // Subscribe to group messages
        stompClient.subscribe(`/topic/${currentGroupName}`, function (response) {
            showMessage(JSON.parse(response.body));
        });

        // Subscribe to private messages
        stompClient.subscribe(`/topic/${currentGroupName}/user/${userName}`, function (response) {
            showPrivateMessage(JSON.parse(response.body));
        });
    });
}

function showMessage(message) {
    if (message.private) {
        showPrivateMessage(message);
    } else {
        $("#message-container-table").append(`<tr><td><b>${message.name} (to everyone):</b> ${message.content}</td></tr>`);
    }
}

function showPrivateMessage(message) {
    $("#message-container-table").append(
        `<tr><td><b>${message.name} (private to ${message.recipient}):</b> ${message.content}</td></tr>`
    );
}

function sendMessage() {
    let recipient = $("#recipient-value").val().trim();
    let content = $("#message-value").val();
    
    let jsonOb = {
        name: userName,
        content: content,
        groupName: currentGroupName,
        recipient: recipient,
        private: recipient !== ''
    };
    
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
    
    // Clear message input
    $("#message-value").val('');
}

$(document).ready((e) => {
    $("#login").click(() => {
        userName = $("#name-value").val();
        currentGroupName = $("#groupName").val();
        localStorage.setItem("name", userName);
        $("#name-title").html(`Welcome, <b>${userName}</b> to group <b>${currentGroupName}</b>`);
        connect();
    });

    $("#send-btn").click(() => {
        sendMessage();
    });

    $("#logout").click(() => {
        localStorage.removeItem("name");
        if (stompClient !== null) {
            stompClient.disconnect();
            $("#name-from").removeClass('d-none');
            $("#chat-room").addClass('d-none');
        }
    });
});