$(document).ready( function () {
var playerAnswer;
var gameAnswer;
var time;
var counter = 5;
var score = 0;
var oldHighScore = 0;

  // timer function
  var timer = function () {
    if (!time) {
      if (counter === 0) {
        bonusTime(5);
        getScore(-score);
      }
      time = setInterval(function () {
        bonusTime(-1);
        if (counter === 0) {
          clearInterval(time);
          time = undefined;
          alert("Time Over");
          checkScore();
        }
      }, 1000);
    }
  };

  // bonus time
  var bonusTime = function (bonus) {
    counter += bonus;
    $('#time').text(counter);
  };

  // player score
var getScore = function (bonus) {
  score += bonus;
  $('#current-score').text(score);
};


  // method selected
    $(".btn-operator").click(function() {
      var method = $(this).attr('id');
      if (method === "add") {
        $('#method').text("+");
      } else if (method === "sub") {
        $('#method').text("-");
      } else if (method === "mult") {
        $('#method').text("x");
      } else if (method === "div") {
        $('#method').text("÷");
      }

    });

// generate random questions
var generator = function () {

  $('#playerAnswer').val('');

  var num1 = 1 + Math.round(9 * Math.random());
	var num2 = 1 + Math.round(9 * Math.random());
  var method = $("#method").text();

  $('#num1').html(num1);
  $('#num2').html(num2);

  if (method === "+") {
      gameAnswer = num1 + num2;

    } else if (method === "-" && num2 < num1) {
      gameAnswer = num1 - num2;

    } else if (method === "x") {
      gameAnswer = num1 * num2;

    } else if (method === "÷" && num2 < num1) {
      gameAnswer = num1 / num2;
    }
};

// validate correct answer
var checkAnswer = function(key) {
    if (key.which == 13) {
      playerAnswer = $('#playerAnswer').val();
      if (playerAnswer != '') {
        playerAnswer = parseInt(playerAnswer);
        // Check answer
        if (playerAnswer == gameAnswer) {
          generator();
          bonusTime(+1);
          getScore(+1);
        }
      }
    }
  };

var checkScore = function () {
  var currentScore = parseInt($("#current-score").text());
  var highScore;
  if (currentScore > oldHighScore) {
    highScore = $("#high-score").text(currentScore);
  } else {
    highScore = $("#high-score").text(oldHighScore);
  }
  oldHighScore = highScore;
};

// player input
$("input").keypress(function(key) {
  timer();
  checkAnswer(key);
  });

// start game
$("#play").on("click", function () {
  timer();
  generator();
});

generator();

});
