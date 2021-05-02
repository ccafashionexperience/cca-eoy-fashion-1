$(document).ready(function(){

    var student;
    var image;
    var work;

    $('.image').click(function(){
        work = $(this).attr("data-title");
        student = $(this).attr("data-student");
        image = $(this).attr("data-image");
        // url = $(this).attr("data-url");

        $('#overlay').addClass('active');
        // $('#back').addClass('active');

        $('h2#work').html(work);
        $('h2#student').html(student);
        $('img#showcase-image').attr("src", image);
        // $('#overlay').attr("src", url);

    });

    $('#overlay').click(function(){
        $(this).removeClass('active');
    });

    // $('#back').on('click', function(event) {
    //     $('#overlay').removeClass('active');
    // });

    //slow down video
    // var vid = document.getElementById("mesh");
    // vid.playbackRate = 0.25;

});
