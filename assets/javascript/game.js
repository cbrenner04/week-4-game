// game play

/*
listen for click of .attack
  when attack is selected,
    reduce yourCharacterHealth by defenderAttack amount
    increase yourCharacterExperience
    increase yourCharacterAttack based on yourCharacterExperience
    reduce defenderHealth by yourCharacterAttack

if yourCharacterHealth reaches 0
  you lose
  move all characters back to .available-characters
  reset all variables

if defenderHealth reaches 0
  remove defender from game
  allow for new defender to be selected

if all defenders are removed you win
 */

// initialize
$(document).ready(function() {
  // variables
  var yourCharacterHealth;
  var yourCharacterExperience;
  var yourCharacterAttack;
  var defenderHealth;
  var defenderAttack;

  // listen for click of character in .available-characters
  $('.available-characters .character').on('click', function() {
    // remove hidden class for .your-character and .enemy-characters
    $('.your-character').removeClass('hidden');
    $('.enemy-characters').removeClass('hidden');
    // set yourCharacterHealth to the value of the character chosen
    yourCharacterHealth = $(this).attr('value');
    console.log("YOUR CHARACTER HEALTH: " + yourCharacterHealth);
    // move character to .your-character
    $('.your-character').append($(this));
    // move rest of characters to .enemy-characters
    $('.directions').remove();
    $('.available-characters').children().appendTo('.enemy-characters');
    $(this).removeClass('col-sm-3 col-xs-6');
    $(this).addClass('col-sm-6 col-xs-12');

    // listen for click of character in .enemy-characters
    $('.enemy-characters .character').on('click', function() {
      // remove hidden class for .defender
      $('.defender').removeClass('hidden');
      // set defenderHealth to the value of the character chosen
      defenderHealth = $(this).attr('value');
      // set defenderAttack to the value of the character chosen
      if ($(this).hasClass('vader')) {
        defenderAttack =  25;
      } else if ($(this).hasClass('skywalker')) {
        defenderAttack =  20;
      } else if ($(this).hasClass('kenobi')) {
        defenderAttack =  10;
      } else if ($(this).hasClass('palpatine')) {
        defenderAttack =  15;
      }
      // move character to .defender
      $('.defender').append($(this));
      $(this).removeClass('col-sm-3 col-xs-6');
      $(this).addClass('col-sm-6 col-xs-12');
      console.log("DEFENDER ATTACK: " + defenderAttack);
      console.log("DEFENDER HEALTH: " + defenderHealth);
      console.log("YOUR CHARACTER HEALTH: " + yourCharacterHealth);
    });
  });
});
