// game play

// wait for document to load
$(document).ready(function() {
  // variables
  var yourCharacter;
  var defender;
  var yourCharacterHealth;
  var yourCharacterExperience = 0;
  var yourCharacterAttack;
  var defenderHealth;
  var defenderAttack;

  // listen for click of character in .available-characters
  $('.available-characters').on('click', '.character', function() {
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
    // move rest of characters to .enemy-characters
    $('.directions').remove();
    $('.available-characters').children().appendTo('.enemy-characters');
    $(this).removeClass('col-sm-3 col-xs-6');
    $(this).addClass('col-sm-6 col-xs-12');
  });

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
      $(this).removeClass('col-sm-3 col-xs-6');
      $(this).addClass('col-sm-6 col-xs-12');
    }
  });

  // listen for click of .attack
  $('.attack').on('click', function() {
    // reduce yourCharacterHealth by defenderAttack amount
    yourCharacterHealth = yourCharacterHealth - defenderAttack;
    // increase yourCharacterExperience
    yourCharacterExperience++;
    // increase yourCharacterAttack based on yourCharacterExperience
    updatedAttack = yourCharacterExperience * yourCharacterAttack;
    // reduce defenderHealth by updatedAttack
    defenderHealth = defenderHealth - updatedAttack;
    // update health stats on charactersa
    yourCharacter.children().children().children('p').html(yourCharacterHealth);
    defender.children().children().children('p').html(defenderHealth);

    checkForDefenderDeath();
    checkResult();
  });

  function setYourCharacterAttack(yourCharacterElement) {
    if ($(yourCharacterElement).hasClass('vader')) {
       return 80;
    } else if ($(yourCharacterElement).hasClass('skywalker')) {
       return 40;
    } else if ($(yourCharacterElement).hasClass('kenobi')) {
       return 20;
    } else if ($(yourCharacterElement).hasClass('palpatine')) {
       return 60;
    }
  }

  function setDefenderAttack(defenderElement) {
    if ($(defenderElement).hasClass('vader')) {
       return 40;
    } else if ($(defenderElement).hasClass('skywalker')) {
       return 20;
    } else if ($(defenderElement).hasClass('kenobi')) {
       return 10;
    } else if ($(defenderElement).hasClass('palpatine')) {
       return 30;
    }
  }

  function checkForDefenderDeath() {
    // if defenderHealth reaches 0
    if (defenderHealth <= 0) {
      console.log('Here I am');
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
    // move all characters back to .available-characters
    $('.your-character > .character').remove();
    $('.defender > .character').remove();
    $('.enemy-characters > .character').remove();
    $('.your-character').addClass('hidden');
    $('.defender').addClass('hidden');
    $('.enemy-characters').addClass('hidden');
    $('.available-characters').html(
      '<h2 class="directions">choose a character...</h2><div class="col-xs-6 ' +
      'col-sm-3 character vader" data-hp=80><div class="thumbnail"><img src=' +
      '"assets/images/darth_vader.jpg" alt="darth vader icon"><div class="cap' +
      'tion"><h5 class="text-info">Darth Vader</h5><p>80</p></div></div></di' +
      'v><div class="col-xs-6 col-sm-3 character skywalker" data-hp=125><div ' +
      'class="thumbnail"><img src="assets/images/luke_skywalker.jpg" alt="luk' +
      'e skywalker icon"><div class="caption"><h5 class="text-info">Luke Skyw' +
      'alker</h5><p>125</p></div></div></div><div class="col-xs-6 col-sm-3 ch' +
      'aracter kenobi" data-hp=200><div class="thumbnail"><img src="assets/im' +
      'ages/obi_wan.jpg" alt="obi wan icon"><div class="caption"><h5 class="t' +
      'ext-info">Obi-wan Kenobi</h5><p>200</p></div></div></div><div class="c' +
      'ol-xs-6 col-sm-3 character palpatine" data-hp=100><div class="thumbnai' +
      'l"><img src="assets/images/emperor_palpatine.jpg" alt="emperor palpati' +
      'ne icon"><div class="caption"><h5 class="text-info">Emperor Palpatine<' +
      '/h5><p>100</p></div></div></div>'
    );
    // reset all variables
    yourCharacter = '';
    defender = '';
    yourCharacterHealth = 0;
    yourCharacterExperience = 0;
    yourCharacterAttack = 0;
    defenderHealth = 0;
    defenderAttack = 0;
  }
});
