$(document).ready( function () {
var playerAnswer;
var gameAnswer;
var time;
var counter = 10;
var score = 0;
var array = [];

  // timer function
  var timer = function () {
    if (!time) {
      if (counter === 0) {
        bonusTime(10);
        getScore(-score);
      }
      time = setInterval(function () {
        bonusTime(-1);
        if (counter === 0) {
          clearInterval(time);
          time = undefined;
          alert("Time Over");
          checkScore();
          enableOperator();
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

  var maxRange = $("input[name='rangeOptions']:checked").val();
  var minRange = 1;

  $('#playerAnswer').val('');

  var num1 = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
  var num2 = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
  var num3 = num1 * num2;

  var method = $("#method").text();

  $('#num1').html(num1);
  $('#num2').html(num2);

  if (method === "+") {
      gameAnswer = num1 + num2;

    } else if (method === "-") {
      if (num2 > num1) {
        $('#num1').html(num2);
        $('#num2').html(num1);
        gameAnswer = num2 - num1;
      } else {
        gameAnswer = num1 - num2;
      }

    } else if (method === "x") {
      gameAnswer = num1 * num2;

    } else if (method === "÷") {
      if (num1 > num2) {
        if (num1 % num2 != 0) {

          $('#num1').html(num3);
          $('#num2').html(num2);
          gameAnswer = num3 / num2;
        } else {
          gameAnswer = num1 / num2;
        }
      } else if (num2 > num1) {
        if (num2 % num1 != 0) {

          $('#num1').html(num3);
          $('#num2').html(num1);

          gameAnswer = num3 / num1;
        } else {
          $('#num1').html(num2);
          $('#num2').html(num1);
          gameAnswer = num2 / num1;
        }
      } else {
        gameAnswer = num1 / num2;
      }
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

function checkScore() {
  $('#current-score').val('');
  var currentScore = parseInt($("#current-score").text());
	array.push(currentScore);

  var maxScore = Math.max.apply(null, array);
  $("#high-score").text(maxScore);
}

function disableOperator() {
  $(".btn-operator").attr("disabled", true);
}

function enableOperator() {
  $(".btn-operator").attr("disabled", false);
}

// player input
$("input").keypress(function(key) {
  timer();
  checkAnswer(key);
  });

// start game
$("#play").on("click", function () {
  timer();
  generator();
  disableOperator();
});

generator();

});
