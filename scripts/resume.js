
//declarations of them global variables
var windowWidth, width_temp, windowHeight, height_temp, plus_minus, minus_plus;


//function that runs when page is finished loading
$(document).ready(function(){

    plus_minus = document.getElementById("plus_or_minus");
    minus_plus = document.getElementById("minus_or_plus");
    plus_minus.style.display = "block";
    minus_plus.style.display = "none";

    //have the content slide up and down
    $(".res_main_body").on("click", "[rel=toggleContent]", function() {
        var speed_var;
        var content_var = $(this).parents(".heading").next(".content");

        //this creates a more proportional speed for varying heights of the content divs
        //(mainly the core competencies was too slow and the work experience too fast)
        speed_var = 50.0*Math.sqrt(content_var.height());
        content_var.slideToggle(speed=speed_var);


    });

    //get dimensions of window viewport
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    set_plus_or_minus(plus_minus, minus_plus);
    set_first_bullet(windowWidth);
    check_if_window_resized();

})

//sets the + or - in the button
function set_plus_or_minus(plus_minus, minus_plus)
{


    if (plus_minus.style.display = "block" ) { //switch the visability of the + and -
        plus_minus.style.display = "none";
        minus_plus.style.display = "block";
    } else {
        plus_minus.style.display = "block";
        minus_plus.style.display = "none";
    }
}

//sets the first bullet in the technical skills section
function set_first_bullet(width)
{
    var width;
    var text = document.getElementById("first_bullet_point");
    var alt_text = document.getElementById("first_bullet_point_alt");

    if (width < 751) { //or 48em
        text.style.display = "none";
        alt_text.style.display = "block";
    } else {
        text.style.display = "block";
        alt_text.style.display = "none";
    }
}


//checks if window size was changed
function check_if_window_resized()
{
    width_temp = $(window).width();
    height_temp = $(window).height();

    if (width_temp != windowWidth || height_temp != windowHeight) {
        set_first_bullet(width_temp);
    }

    setTimeout(function(){check_if_window_resized()},250);
}





