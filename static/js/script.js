$(document).ready(function() {
  $('form').on('submit', function() {
    e.preventDefault();
    var newData = $(this).serialize();
    var url = $(this).attr('action');
    $.ajax({
      method: 'PUT',
      url: url,
      data: newData
    }).done(function(data) {
      console.log(data);
      window.location = '/foods'
    });
  });

  $('a.delete').on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      console.log(data);
      window.location = '/foods';
    })
  });

});
