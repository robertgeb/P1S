var socket = io.connect('http://localhost:3000');

function login(){
  socket.emit('login', {'mat': $('input[name=matricula]').val(), 'senha': $('input[name=senha]').val()});
};
socket.on('res_login', function(res){
    $('.container').remove();
    $('<div/>', {
      class: 'navbar navbar-inverse navbar-fixed-top'
    }).appendTo('body');

    $('<div/>', {
      class: 'container'
    }).appendTo('.navbar');

    $('<div/>', {
      class: 'navbar-header'
    }).appendTo('.container');

    $('<a/>', {
      class: 'navbar-brand',
      href: '#',
      text: res['nome']
    }).appendTo('.navbar-header');
});
