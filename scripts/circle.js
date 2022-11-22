
//declarations of them global variables
var numberofsel = 6;
var size = 200;
var quarter = size/4;
var half = size/2;
var threequart = 3*quarter;

var sel_txt_array = ["Resume", "TheBlog", "About", "Cooks", "Google!"];
var sel_link_array = ["index.html", "theblog.html", "http://www.google.com", "../site/cooks.html", "http://www.google.com"];
var clock_txt_array = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

var setT_clock, setT_sel;
var realminute, mkeepsake = 0;
var windowWidth, windowHeight;

//function that runs when page is finished loading
(function($) {
    $(document).ready(function() {
    
        initialize_me();

    })


})(jQuery);

function initialize_me()
{
    //declarations
    var sel_divdim, clock_divdim, hour_temp;

    var sel_points_x = [];
    var sel_points_y = [];
    var clock_points_x = [];
    var clock_points_y = [];

    //get dimensions of window viewport
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    //initializations for the menu and clock divs
    sel_divdim = $("#mainer").width();
    document.getElementById("mainer").style.height = 0.98 * sel_divdim + "px";
    clock_divdim = $("#analog_clock").width();
    document.getElementById("analog_clock").style.height = 0.98 * clock_divdim + "px";

    //set the clock to be at bottom of viewport
    $("#analog_clock").css("top", (0.97 * windowHeight) - clock_divdim);

    //call functions to set up the selection menu
    calc_circ(sel_divdim, sel_points_x, sel_points_y, 1.25);
    calc_sel_pos(sel_divdim, sel_points_x, sel_points_y, 1.25);
    display_sels(0);

    var t = new Date();
    realminute = t.getMinutes();
    hour_temp = t.getHours();

    //call functions to set up clock 
    calc_circ(clock_divdim, clock_points_x, clock_points_y, 2);
    calc_clock_pos(clock_divdim, clock_points_x, clock_points_y, 2);

    run_minutes(realminute);
    run_hours(hour_temp, realminute);
    run_clock();


    display_cool_icon();
}


// using size amount of distinct points to map out a circle in a div
function calc_circ(divdim, points_x, points_y, scaling_factor)
{
    divdim = divdim*scaling_factor;
    // increment = (length/2)/half (size amount of points, x going from 0 to max to 0 to -min to 0 again)
    var incr = divdim/size;
    var temp;

    for (i = 0; i < quarter; i++) {
        points_x[i] = i*incr;
        temp = ((divdim*divdim)/16.0);
        temp -= i*incr*i*incr;
        if (temp <= 0) {
            points_y[i] = 0;
        } else {
            points_y[i] = Math.sqrt( temp );
        }
    }
    for (i = quarter; i < half; i++) {
        points_x[i] = points_x[quarter-1] - (i-quarter-1)*incr;
        temp = ((divdim*divdim)/16.0);
        temp -= ((points_x[i])*(points_x[i]));
        if (temp <= 0) {
            points_y[i] = 0;
        } else {
            points_y[i] = (-1.0)*Math.sqrt( temp );
        }
    }
    points_x[half] = 0;
    points_y[half] = divdim/(-4.0);

    for (i = half + 1; i < size; i++) {
        points_x[i] = (-1.0)*points_x[size-i];
        points_y[i] = points_y[size-i];
    }
    points_x[0] = 0;
    points_x[quarter] = divdim/4.0;
    points_x[threequart] = divdim/(-4.0);
    points_y[0] = divdim/4.0;
    points_y[quarter] = 0.0;
    points_y[threequart] = 0.0;
}


//calculates initial position of each selection
function calc_sel_pos(divdim, sel_points_x, sel_points_y, scaling_factor)
{
    var angle_factor = Math.floor(360/numberofsel);
    var newposition_x, newposition_y;

    var selwidth, selheight, seltxt, num;
    var ctr_array = [];

    for(i = 0; i < numberofsel; i++) {
        seltxt = "#selection" + i;

        if (i < sel_txt_array.length) {
            num = i;
        } else {
            num = sel_txt_array.length - 1;
        }
        //make each selection an HTML element
        $("<div></div>").attr("id","selection" + i).addClass("selection").appendTo("#mainer");


        selwidth = Math.floor(0.2*$("#mainer").innerWidth());
        selheight = Math.floor(0.15*$("#mainer").innerHeight());
        $(seltxt).width = selwidth;
        $(seltxt).height = selheight;

        if ( (angle_factor*i) <= 180 ) {
            ctr_array[i] = angle_to_index(divdim, i, angle_factor*i, sel_points_y, scaling_factor);
        } else {
            ctr_array[i] = size - ctr_array[numberofsel - i];
        }

        newposition_x =  ((divdim/2.0 + sel_points_x[ctr_array[i]]) - selwidth/2.0);
        newposition_y =  ((divdim/2.0 - sel_points_y[ctr_array[i]]) - selheight/2.0);
        $(seltxt).css({"z-index": numberofsel-i, "left": newposition_x + "px", "top": newposition_y + "px",
            "width": selwidth});

        //make a link in each selection
        $("<a></a>").attr("href", sel_link_array[num]).text(sel_txt_array[num]).appendTo(seltxt);
    }
}

//removes each selection (useful for resizing purposes)
function delete_sels(num)
{
    clearTimeout(setT_sel);
    var seltxt = "#selection" + num;
    if (num < numberofsel) {
        $(seltxt).remove();
        delete_sels(num + 1);
    }
}


//display each selection in a timely manner
function display_sels(num)
{
    if (num < numberofsel) {
        if (num == 0) {
            $("#selection" + num).css("z-index", "2").fadeIn(3000);
            setT_sel = setTimeout(function(){display_sels(num + 1)}, 1200);
        } else {
            $("#selection" + num).css("z-index", num%2).fadeIn(1000);
            setT_sel = setTimeout(function(){display_sels(num + 1)}, 300);
        }
    }
}


//calculates initial position of each clock number increment
function calc_clock_pos(divdim, clock_points_x, clock_points_y, scaling_factor)
{
    var angle_factor = 30;
    var ifact, pos_x, pos_y;

    var cincr_width, clocktxt;

    //set up clock face
    $("<div></div>").attr("id", "clock_face").css({"width": divdim, "height": 0.99*divdim,
        "border-radius": 0.5*divdim + "px"}).appendTo("#analog_clock");

    for(i = 0; i < 12; i++) {
        clocktxt = "#clock_incr" + i;

        //make each clock increment an HTML element
        $("<div></div>").attr("id","clock_incr" + i).text(clock_txt_array[i]).addClass("clock_incr")
            .appendTo("#clock_face");

        cincr_width = Math.floor(0.15*$("#analog_clock").innerWidth());
        $(clocktxt).width = cincr_width;
        $(clocktxt).height = cincr_width;

        ifact = angle_to_index(divdim, i, angle_factor*i, clock_points_y, scaling_factor);
        //$("<div></div>").attr("id", "output" + i).text(i + " x " +" y " + ifact).appendTo("#output_div");

        pos_x =  ((divdim/2.0 + clock_points_x[ifact]) - cincr_width/2.0);
        pos_y =  ((divdim/2.0 - clock_points_y[ifact]) - cincr_width/2.0);

        if (cincr_width > 20) {
            $(clocktxt).css("letter-spacing", "2px");
        }
        $(clocktxt).css({"z-index": 12-i, "left": pos_x + "px", "top": pos_y + "px", 
            "width": cincr_width + "px", "height": cincr_width + "px", "line-height": cincr_width + "px",
            "border-radius": cincr_width + "px"});
    }
}


//calculate the proper index given an angle
function angle_to_index(divdim, index, angle, points_y, scaling_factor)
{
    var ctr, value_y, radians; //need to convert angle to rads
    divdim = divdim*scaling_factor;

    if (angle == 0) {
        ctr = 0;
        return ctr;
    }
    if (angle == 90) {
        ctr = quarter;
        return ctr;
    }
    if (angle == 180) {
        ctr = half;
        return ctr;
    }
    if (angle == 270) {
        ctr = threequart;
        return ctr;
    }

    if (angle < 90) { //quadrant 1

        radians = (90 - angle)*Math.PI/180.0;
        value_y = divdim*Math.sin(radians)/4.0;
        ctr = quarter+1;
        while (value_y > points_y[ctr]) {
            ctr--;
        }
        return ctr;
    } else {
        if (angle < 180) { //quadrant 2

            radians = (angle - 90)*Math.PI/180.0;
            value_y = divdim*Math.sin(radians)/(-4.0);
            ctr = quarter+1;
            while (value_y < points_y[ctr]) {
                ctr++;
            }
            return ctr;
        } else {
            //quadrant 3 or 4, so to preserve symmetry, do nothing here
            if (angle < 270) { //quadrant 3

                radians = (90 - (angle - 180))*Math.PI/180.0;
                value_y = divdim*Math.sin(radians)/(-4.0);
                ctr = threequart;
                while (value_y < points_y[ctr]) {
                    ctr--;
                }
                return ctr;
            } else { //quadrant 4

                radians = (angle - 270)*Math.PI/180.0;
                value_y = divdim*Math.sin(radians)/4.0;
                ctr = threequart;
                while (value_y > points_y[ctr]) {
                    ctr++;
                }
                return ctr;
            }
        }
    }
}



//draws the hour, minute and second hands mainly functions to
//check the seconds, also initiates the hour and minute run functions when a change occurs
function run_clock()
{
    var dimwidth = $("#analog_clock").width(), dimheight = $("#analog_clock").height();
    var angle, width_diff, height_diff, length, wwidth, wheight;

    var today = new Date();
    var hour = today.getHours();
    if (hour > 12) {
        hour = hour - 12;
    }
    var min = today.getMinutes();
    var sec = today.getSeconds();

    if (realminute != min || mkeepsake < 4) {
        mkeepsake++;
        realminute = min;
        run_minutes(min);
        run_hours(hour, min);
    }

    check_if_window_resized();

    length = $("#second_hand").width();
    $("#second_hand").remove();
    angle = 6*sec + 90;
    width_diff = 0.25*dimwidth + wdisplace(angle, length);
    height_diff = 0.5*dimheight - hdisplace(angle, length);
    var angle_string = "rotate(" + angle + "deg)";
    $("<aside></aside>").attr("id", "second_hand").css({"-webkit-transform": angle_string,
        "-ms-transform": angle_string, "transform": angle_string,
        "left": width_diff + "px", "top": height_diff + "px"}).appendTo("#analog_clock");


    setT_clock = setTimeout(function(){run_clock()},500);
}

function run_minutes(min)
{
    var dimw = $("#analog_clock").width(), dimh = $("#analog_clock").height();
    var ang, wdiff, hdiff, len;

    len = $("#minute_hand").width();
    $("#minute_hand").remove();
    ang = 6*min + 90;
    wdiff = 0.3*dimw + wdisplace(ang, len);
    hdiff = 0.5*dimh - hdisplace(ang, len);
    var angle_string = "rotate(" + ang + "deg)";
    $("<aside></aside>").attr("id","minute_hand").css({"-webkit-transform": angle_string,
        "-ms-transform": angle_string, "transform": angle_string,
        "left": wdiff + "px", "top": hdiff + "px"}).appendTo("#analog_clock");
}

function run_hours(hour, min)
{
    var dimw = $("#analog_clock").width(), dimh = $("#analog_clock").height();
    var min_adj, ang, wdiff, hdiff, len;

    min_adj = Math.floor(min / 5);
    len = $("#hour_hand").width();
    $("#hour_hand").remove();
    ang = 30*hour + 90 + 2.5*min_adj;
    wdiff = 0.35*dimw + wdisplace(ang, len);
    hdiff = 0.5*dimh - hdisplace(ang, len);
    var angle_string = "rotate(" + ang + "deg)";
    $("<aside></aside>").attr("id","hour_hand").css({"-webkit-transform": angle_string,
        "-ms-transform": angle_string, "transform": angle_string,
        "left": wdiff + "px", "top": hdiff + "px"}).appendTo("#analog_clock");
}

function wdisplace(angle, length) {
    var diff1 = angle*Math.PI/180.0;
    var diff2 = 1 - Math.cos(diff1)*length/2;
    return diff2;
}
function hdisplace(angle, length) {
    var diff1 = angle*Math.PI/180.0;
    var diff2 = Math.sin(diff1)*length/2;
    return diff2;
}



//checks if window size was changed
function check_if_window_resized()
{
    var wwidth, wheight;

    wwidth = $(window).width();
    wheight = $(window).height();

    if (wwidth != windowWidth || wheight != windowHeight) {
        clearTimeout(setT_clock);
        delete_sels(0);
        $("#clock_face").remove();
        initialize_me();
    }
}




function display_cool_icon()
{
    var angle,  width_diff, height_diff;
    var length;

    for (i = 0; i < 12; i++) {
        $("#icon_segment" + i).remove();
        $("<aside></aside>").attr("id","icon_segment" + i).addClass("cool_icon").appendTo("#header");

        length = $("#icon_segment" + i).width();
        angle = 30*i - 90;

        //add negative signs to change it up!
        width_diff = (1 - Math.cos(angle*Math.PI/180.0))*length/2;
        height_diff = (Math.sin(angle*Math.PI/180.0))*length/2;
        var angle_string = "rotate(" + angle + "deg)";
        $("#icon_segment" + i).css({
            "-webkit-transform": angle_string,
            "-ms-transform": angle_string, "transform": angle_string,
            "left": width_diff + "px", "top": height_diff + "px"
        });
    }
}









