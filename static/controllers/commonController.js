$(document).ready(function() {
  var activate = function() {
    var message = $("#form_message").val();
    var email = $("#form_email").val();
    var name = $("#form_name").val();
    if (message == "" || email == "" || name == "") {
      $("#send_button").addClass("disabled");
    }
    if (message != "" && email != "" && name != "") {
      $("#send_button").removeClass("disabled");
    }
    $("#info_span").text("");
  };

  $("#form_message").on("keyup", function() {
    activate();
  });

  $("#form_email").on("keyup", function() {
    activate();
  });

  $("#form_name").on("keyup", function() {
    activate();
  });

  $("#send_button").on("keyup", function() {
    activate();
  });

  var sendMessage = function() {
    var message = $("#form_message").val();
    var email = $("#form_email").val();
    var name = $("#form_name").val();
    var url = "/saveMessage";
    var data = {
      name: name,
      email: email,
      message: message
    };
    var wait = function() {
      $("#form_guest_message")[0].reset();
      $("#send_button").addClass("disabled");
      $(".send").css("display", "none");
      $(".loader").css("display", "block");
    };
    var complete = function() {
      $(".loader").css("display", "none");
      $(".send").css("display", "block");
    };
    ajaxFunctions.ready(
      ajaxFunctions.ajaxRequest("POST", url, data, wait, complete, function(
        err,
        res
      ) {
        if (err) {
          $("#info_span").text(err.status + " " + err.statusText);
          $("#info_span").removeClass("text-success");
          $("#info_span").addClass("text-warning");
        } else {
          $("#info_span").text("Thank You");
          $("#info_span").removeClass("text-warning");
          $("#info_span").addClass("text-success");
        }
      })
    );
  };

  var getEdu = function(callback) {
    var url = "/api/get-edu";
    var data = {};
    var wait = function() {
      $("#education").append("waiting");
    };
    var complete = function() {};
    ajaxFunctions.ready(
      ajaxFunctions.ajaxRequest("POST", url, data, wait, complete, function(
        err,
        res
      ) {
        if (err) {
          //error handling
        } else {
          callback(res);
        }
      })
    );
  };

  $("#send_button").on("click", function() {
    sendMessage();
  });

  //https://stackoverflow.com/a/40658647
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(window).on("resize scroll", function() {
    if ($("#education").isInViewport()) {
      if ($("#education").html() == "" || null) {
        getEdu(function(edus) {
          for (var i = 0; i < 3; i++) {
            var still = "";
            if (edus[i].isstill) {
              still = "(Still)";
            }
            $("#education").append(
              "<div class='panel edu'><div class='panel-header'><h4>" +
                edus[i].edutype +
                " - " +
                edus[i].year +
                " " +
                still +
                "</h4></div><div class='panel-body'><h4>" +
                edus[i].name +
                "</h4><h5>" +
                edus[i].department +
                " - " +
                edus[i].programme +
                "<a href=" +
                edus[i].diplomaLink +
                " title='diploma' target='_blank'>&nbsp;<span class='glyphicon glyphicon-education'></span></a><a href=" +
                edus[i].programmeLink +
                " title='link' target='_blank'>&nbsp;<span class='glyphicon glyphicon-arrow-right'></span></a></h5><p class='hiding'>" +
                edus[i].explanation +
                "</p></div></div>"
            );
          }
        });
      }
    } else {
      $("#education").html("");
    }
  });
});

window.onload = function() {
  $(".photo").fadeIn(750, function() {
    $(".instruction").fadeIn(750);
    $(".headline").animate({ width: "40%" }, 750);
    $(".mainmenu").fadeIn(750);
  });
};
