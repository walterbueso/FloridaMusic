$(document).ready(function () {
    var backgrounds = $(".bg-custom, .bg-dark, .bg-gray");

    if ($("body").hasClass("no-js")) {
        $("body").removeAttr("class");
    }

    if ($(backgrounds).find(".column").length === 3) {
        $(backgrounds).find(".col-md-4.column:nth-child(2)").addClass("bg-custom2");
    }

    $("#musicians").on("load", function () {
        $(".team-member").hover(
           function () {
               $(this).find(".member-meta").css({ "padding": "30px 20px 90px" });
           },
           function () {
               $(this).find(".member-meta").css({ "padding": "30px 20px 30px" });
           }
       );
    });
    $("#musicians").trigger("load");
});





