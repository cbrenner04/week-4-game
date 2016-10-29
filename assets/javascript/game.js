// game play
// wait for document to load
$(document).ready(function() {
  // find the character objects in object.js
  // you can find this in dom.js
  resetDom();
  // play the damn game
  playGame();

});

// define variables
var yourCharacter;
var defender;
var yourCharacterHealth;
var yourCharacterExperience = 0;
var yourCharacterAttack;
var defenderHealth;
var defenderAttack;

function playGame() {
  selectYourCharacter();
  selectDefender();
  attackDefender();
  restartGame();
}

function selectYourCharacter() {
  // listen for click of character in .available-characters
  $('.available-characters').on('click', '.character', function() {
    console.log("Hello");
    // remove hidden class for .your-character and .enemy-characters
    $('.your-character').removeClass('hidden');
    $('.enemy-characters').removeClass('hidden');
    // set yourCharacterHealth to the value of the character chosen
    yourCharacterHealth = $(this).attr('data-hp');
      // set yourCharacterAttack to the value of the character chosen
    yourCharacterAttack = setYourCharacterAttack(this);
    // set yourCharacter
    yourCharacter = $(this);
    // move character to .your-character
    $('.your-character').append($(this));
    // remove directions -- they are now unnecessary
    $('.directions').remove();
    // move rest of characters to .enemy-characters
    $('.available-characters').children().appendTo('.enemy-characters');
    // update size of div
    $(this).removeClass('col-sm-3 col-xs-6');
    $(this).addClass('col-sm-6 col-xs-12');
  });
}

function selectDefender() {
  // listen for click of character in .enemy-characters
  $('.enemy-characters').on('click', '.character', function() {
    if ($('.defender').hasClass('hidden')) {
      // remove hidden class for .defender
      $('.defender').removeClass('hidden');
      // set defenderHealth to the value of the character chosen
      defenderHealth = $(this).attr('data-hp');
      // set defenderAttack to the value of the character chosen
      defenderAttack = setDefenderAttack(this);
      // set defender
      defender = $(this);
      // move character to .defender
      $('.defender').append($(this));
      // update size of div
      $(this).removeClass('col-sm-3 col-xs-6');
      $(this).addClass('col-sm-6 col-xs-12');
    }
  });
}

function attackDefender() {
  // listen for click of .attack
  $('.attack').on('click', function() {
    // reduce yourCharacterHealth by defenderAttack amount
    yourCharacterHealth = yourCharacterHealth - defenderAttack;
    // increase yourCharacterExperience
    yourCharacterExperience++;
    // increase yourCharacterAttack based on yourCharacterExperience
    updatedAttack = yourCharacterExperience * yourCharacterAttack;
    // show player what's happening
    // make sure to clear it first
    $('.stats').html('');
    // add stats
    $('.stats').append(
      '<p>You attacked with ' + updatedAttack +' points</p>'
    );
    $('.stats').append(
      '<p>You were hit with ' + defenderAttack + ' points</p>'
    );
    // reduce defenderHealth by updatedAttack
    defenderHealth = defenderHealth - updatedAttack;
    // update health stats on characters
    yourCharacter.children().children().children('p').html(yourCharacterHealth);
    defender.children().children().children('p').html(defenderHealth);

    checkForDefenderDeath();
    checkResult();
  });
}

function restartGame() {
  $('.restart').on('click', function() {
    reset();
  });
}

function setYourCharacterAttack(yourCharacterElement) {
  if ($(yourCharacterElement).hasClass('vader')) {
     return darthVader.attack;
  } else if ($(yourCharacterElement).hasClass('skywalker')) {
     return lukeSkywalker.attack;
  } else if ($(yourCharacterElement).hasClass('kenobi')) {
     return obiWanKenobi.attack;
  } else if ($(yourCharacterElement).hasClass('palpatine')) {
     return emperorPalpatine.attack;
  }
}

function setDefenderAttack(defenderElement) {
  if ($(defenderElement).hasClass('vader')) {
     return darthVader.counterAttack;
  } else if ($(defenderElement).hasClass('skywalker')) {
     return lukeSkywalker.counterAttack;
  } else if ($(defenderElement).hasClass('kenobi')) {
     return obiWanKenobi.counterAttack;
  } else if ($(defenderElement).hasClass('palpatine')) {
     return emperorPalpatine.counterAttack;
  }
}

function checkForDefenderDeath() {
  // if defenderHealth reaches 0
  if (defenderHealth <= 0) {
    // remove defender from game
    $('.defender > .character').remove();
    // allow for new defender to be selected
    $('.defender').addClass('hidden');
  }
}

function checkResult() {
  // if yourCharacterHealth reaches 0
  if (yourCharacterHealth <= 0) {
    // you lose
    alert("You lose!!");
    reset();
  }
  // if no more defenders in defender div or enemy-characters div
  else if ($('.defender').children('.character').length <= 0 &&
      $('.enemy-characters').children('.character').length <= 0) {
    // you win
    alert('You win!');
    reset();
  }
}

function reset() {
  resetDom();
  resetVariables();
  playGame();
}

function resetVariables() {
  // reset all variables
  yourCharacter = '';
  defender = '';
  yourCharacterHealth = 0;
  yourCharacterExperience = 0;
  yourCharacterAttack = 0;
  defenderHealth = 0;
  defenderAttack = 0;
}
