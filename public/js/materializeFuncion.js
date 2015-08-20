$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
          e.preventDefault();

          var target = this.hash;
          var $target = $(target);

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 900, 'swing');
      });
    });

$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
  $('#modal1').closeModal();
  
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

