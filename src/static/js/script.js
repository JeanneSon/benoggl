$(function () {

    // javascript web-socket (start)
    let sock = new WebSocket('ws://' + window.location.host + '/ws'); //consider surrounding by catch block

    sock.onopen = function () {
        console.log("Connection to server started");
    };

    sock.onmessage = function (event) {
        let d = JSON.parse(event.data);
        if ("player" in d) {
            $("#player_list").append('<li>' + d["player"] + '</li>');
        }

    };


    $("#message").blur(function () {
        let msg = $('#message');
        sock.send(msg.val());
        msg.val('').focus();
    });


    $("#submit").click(function () {
        if ($("#nickname").val().trim() != "") {
            $.post("/nickname", { name: $("#nickname").val().trim() }, function(data) {
                let d = jQuery.parseJSON(data);
                if (d["status"] == "ok") {
                    welcome(d["message"]);
                    let players = d["players"].split("&&&");
                    $("#player_list").empty(); //this list should be empty anyway at this point 
                    for (let player of players) {
                        $("#player_list").append('<li>' + player + '</li>');
                    }
                    $("#player_list")
                }
                else nicknameFail();
            });
        }
        else alert("No valid nickname.");
    });

    $("#getCards").hide();
    $("#seeDabb").hide();

    $("#getCards").click(function () {
        $.get("/getCards", function (data) {
            let d = jQuery.parseJSON(data);
            if (d["status"] == "ok") {
                $("#getCards").hide();
                displayCards(d["cards"]);
                $("#seeDabb").show();
            }
            else alert(d["message"]);
        })
    })

    $("#seeDabb").click(function () {
        $.get("/seeDabb", function (data) {
            let d = jQuery.parseJSON(data);
            if (d["status"] == "ok") {
                $("#seeDabb").hide();
                displayDabb(d["cards"]);
            }
            else alert(d["message"]);
        });
    });

    function welcome(message) {
        $("#content").html("<p>Welcome, " + message + "!</p>");
        $("#getCards").show();
    }

    function nicknameFail() {
        $("#content").append("<p>Sorry.. Something went wront. Please try again or come back later</p>");
    }

    function displayCards(cards) {
        let c = cards.split(";");
        let display = "";
        c.forEach(card => {
            display += "<p>" + card + "</p>";
        });
        $("#cards").html(display);
    }

    function displayDabb(dabb) {
        let d = dabb.split(";");
        let display = "<h1>Dabb</h1>";
        d.forEach(d => {
            display += "<p>" + d + "</p>";
        });
        $("#dabb").html(display);
    }


    // javascript web-socket (end)
    sock.onclose = function(event){
        if(event.wasClean){
            console.log('Clean connection end');
        }else{
            console.log('Connection broken');
        }
    };
    
    sock.onerror = function(error){
        console.log(error);
    }
});