// game play
// wait for document to load
$(document).ready(function() {
  // define character objects
  // darth vader object
  var darthVader = {
    health: 80,
    attack: 80,
    counterAttack: 40,
    image: "assets/images/darth_vader.jpg",
    name: "Darth Vader"
  };

  // luke skywalker object
  var lukeSkywalker = {
    health: 125,
    attack: 40,
    counterAttack: 20,
    image: "assets/images/luke_skywalker.jpg",
    name: "Luke Skywalker"
  };

  // obi-wan kenobi object
  var obiWanKenobi = {
    health: 200,
    attack: 20,
    counterAttack: 10,
    image: "assets/images/obi_wan.jpg",
    name: "Obi-wan Kenobi"
  };

  // emperor palpatine object
  var emperorPalpatine = {
    health: 100,
    attack: 60,
    counterAttack: 30,
    image: "assets/images/emperor_palpatine.jpg",
    name: "Emperor Palpatine"
  };

  // define variables
  var yourCharacter;
  var defender;
  var yourCharacterHealth;
  var yourCharacterExperience = 0;
  var yourCharacterAttack;
  var defenderHealth;
  var defenderAttack;

  resetDom();
  playGame();

  function resetDom() {
    // render game board
    // strings are left fragmented so I can easily update
    $("#game").html(
      '<div class="row available-characters">' +
      '<h2 class="directions">choose a character...</h2>' +

      '<div class="col-xs-6 col-sm-3 character vader" data-hp=' +
      darthVader.health + '>' + '<div class="thumbnail">' + '<img src=' +
      darthVader.image + ' alt="' + darthVader.name + ' icon">' +
      '<div class="caption">' + '<h5 class="text-info">' + darthVader.name +
      '</h5>' + '<p>' + darthVader.health + '</p>' + '</div>' + '</div>' +
      '</div>' +

      '<div class="col-xs-6 col-sm-3 character skywalker" data-hp=' +
      lukeSkywalker.health + '>' + '<div class="thumbnail">' + '<img src=' +
      lukeSkywalker.image +' alt="' + lukeSkywalker.name + ' icon">' +
      '<div class="caption">' + '<h5 class="text-info">' + lukeSkywalker.name +
      '</h5>' + '<p>' + lukeSkywalker.health + '</p>' + '</div>' + '</div>' +
      '</div>' +

      '<div class="col-xs-6 col-sm-3 character kenobi" data-hp=' +
      obiWanKenobi.health + '>' + '<div class="thumbnail">' + '<img src=' +
      obiWanKenobi.image + ' alt="' + obiWanKenobi.name + ' icon">' +
      '<div class="caption">' + '<h5 class="text-info">' + obiWanKenobi.name +
      '</h5>' + '<p>' + obiWanKenobi.health + '</p>' + '</div>' + '</div>' +
      '</div>' +

      '<div class="col-xs-6 col-sm-3 character palpatine" data-hp=' +
      emperorPalpatine.health + '>' + '<div class="thumbnail">' + '<img src=' +
      emperorPalpatine.image + ' alt="' + emperorPalpatine.name + ' icon">' +
      '<div class="caption">' + '<h5 class="text-info">' +
      emperorPalpatine.name + '</h5>' + '<p>' + emperorPalpatine.health +
      '</p>' + '</div>' + '</div>' + '</div>' +

      '</div>' +

      '<div class="row">' +

      '<div class="col-xs-6">' +
      '<div class="your-character hidden">' + '<h2>Your Character</h2>' +
      '</div>' + '</div>' +

      '<div class="col-xs-6">' + '<div class="defender hidden">' +
      '<h2>Defender</h2>' +
      '<button class="btn btn-default attack pull-left">Attack</button>' +
      '<br class="visible-xs">' + '<br class="visible-xs">' +
      '<br class="visible-xs">' + '</div>' + '</div>' +

      '</div>' +

      '<div class="row enemy-characters hidden">' +
      '<h2 class="heading">Enemies Available to Attack</h2>' +

      '</div>'
    );
  }

  function playGame() {
    selectYourCharacter();
    selectDefender();
    attackDefender();
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
      // reduce defenderHealth by updatedAttack
      defenderHealth = defenderHealth - updatedAttack;
      // update health stats on characters
      yourCharacter.children().children().children('p').html(yourCharacterHealth);
      defender.children().children().children('p').html(defenderHealth);

      checkForDefenderDeath();
      checkResult();
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
});
