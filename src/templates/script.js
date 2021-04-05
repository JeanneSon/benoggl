$(function () {
    $("#submit").click(function () {
        if ($("#nickname").val().trim() != "") {
            $.post("/nickname", { name: $("#nickname").val().trim() }, function (data) {
                let d = jQuery.parseJSON(data);
                if (d["status"] == "ok") welcome(d["message"]);
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
});