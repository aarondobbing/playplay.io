var PlayPlay = {};

$(document).ready(function() {

  PlayPlay.message = function(text) {
    $('#messages').fadeOut('slow', function() {
      $('#messages').fadeIn('slow').html(text)
    });
  };

  PlayPlay.register = function(text) {
    $('.navbar').fadeOut('slow');
    $('header').fadeOut('slow');
    $('section').fadeOut('slow');
    $('#register').show();
  };

  PlayPlay.error = function(xhr) {
    var message;
    if (xhr.responseText) {
      var rc = JSON.parse(xhr.responseText);
      if (rc && rc.message) {
        message = rc.message;
        if (message == 'invalid_code') {
          message = 'The code returned from the OAuth workflow was invalid.'
        } else if (message == 'code_already_used') {
          message = 'The code returned from the OAuth workflow has already been used.'
        }
      }
    }

    PlayPlay.message(message || xhr.statusText || xhr.responseText || 'Unexpected Error');
  };

  // Slack OAuth
  var code = $.url('?code')
  var game = $.url('?game')
  if (code && game && (game == 'pong' || game == 'chess' || game == 'pool' || game == 'tic-tac-toe')) {
    PlayPlay.register();
    PlayPlay.message('Working, please wait ...');
    $.ajax({
      type: "POST",
      url: "https://bots.playplay.io/teams",
      data: {
        code: code,
        game: game
      },
      success: function(data) {
        PlayPlay.message('Team successfully registered!<br>Create a #' + game + ' channel on Slack and invite @' + game + 'bot to it.');
      },
      error: PlayPlay.error
    });
  }
});
