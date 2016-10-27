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

  // render game board
  function resetDom() {
    // reset DOM to have nothing in it
    $('body').html('');

    // add container for everything to live
    var containerFluid = $('<div>');
    containerFluid.addClass('container-fluid');
    // the containerFluid lives inside the body
    $('body').append(containerFluid);

    // add row inside containerFluid so we have columns
    var row = $('<div>');
    row.addClass('row');
    // the row lives inside containerFluid
    containerFluid.html(row);

    // add title to the top of the row
    // first add a column for the title to live in
    var gameTitleColumn = $('<div>');
    // this column pushes right in md+ screens
    gameTitleColumn.addClass('col-md-4 col-md-push-8');
    // add title
    var gameTitle = $('<h1>');
    gameTitle.text('Star Wars RPG');
    // gameTitle lives inside gameTitleColumn
    gameTitleColumn.html(gameTitle);
    // append gameTitleColumn to top of row
    row.append(gameTitleColumn);

    // add column for game board to live in
    // this is the title's partner
    var gameColumn = $('<div>');
    // this column pulls left in md+ screens
    gameColumn.addClass('col-md-8 col-md-pull-4');
    // append this column to the row
    row.append(gameColumn);

    // add rows for three game board areas

    // add row for available characters
    var availableCharactersRow = $('<div>');
    availableCharactersRow.addClass('row available-characters');
    // add availableCharactersRow to gameColumn
    gameColumn.append(availableCharactersRow);

    // add row for chosen characters, both your character and the defender
    var chosenCharactersRow = $('<div>');
    chosenCharactersRow.addClass('row');
    // add chosenCharactersRow to gameColumn
    gameColumn.append(chosenCharactersRow);

    // add row for enemy characters
    var enemyCharactersRow = $('<div>');
    enemyCharactersRow.addClass('row enemy-characters hidden');
    // add enemyCharactersRow to gameColumn
    gameColumn.append(enemyCharactersRow);

    // populate available characters row

    // add directions to available characters row
    var availableCharactersDirections = $('<h3>');
    availableCharactersDirections.addClass('directions');
    availableCharactersDirections.text('choose a character...');
    // append the directions to the availableCharactersRow
    availableCharactersRow.append(availableCharactersDirections);

    // append available characters to availableCharactersRow
    availableCharactersRow.append(
      '<div class="col-xs-6 col-sm-3 character vader" data-hp=' + darthVader.health + '>' +
        '<div class="thumbnail">' +
          '<img src=' + darthVader.image + ' alt="' + darthVader.name + ' icon">' +
          '<div class="caption">' +
            '<h5 class="text-info">' + darthVader.name + '</h5>' +
            '<p>' + darthVader.health + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="col-xs-6 col-sm-3 character skywalker" data-hp=' + lukeSkywalker.health + '>' +
        '<div class="thumbnail">' +
          '<img src=' + lukeSkywalker.image +' alt="' + lukeSkywalker.name + ' icon">' +
          '<div class="caption">' +
            '<h5 class="text-info">' + lukeSkywalker.name + '</h5>' +
            '<p>' + lukeSkywalker.health + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="col-xs-6 col-sm-3 character kenobi" data-hp=' + obiWanKenobi.health + '>' +
        '<div class="thumbnail">' +
          '<img src=' + obiWanKenobi.image + ' alt="' + obiWanKenobi.name + ' icon">' +
          '<div class="caption">' +
            '<h5 class="text-info">' + obiWanKenobi.name + '</h5>' +
            '<p>' + obiWanKenobi.health + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="col-xs-6 col-sm-3 character palpatine" data-hp=' + emperorPalpatine.health + '>' +
        '<div class="thumbnail">' +
          '<img src=' + emperorPalpatine.image + ' alt="' + emperorPalpatine.name + ' icon">' +
          '<div class="caption">' +
            '<h5 class="text-info">' + emperorPalpatine.name + '</h5>' +
            '<p>' + emperorPalpatine.health + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    chosenCharactersRow.html(
      '<div class="col-xs-6">' +
        '<div class="your-character hidden">' +
          '<h3>Your Character</h3>' +
        '</div>' +
      '</div>' +

      '<div class="col-xs-6">' +
        '<div class="defender hidden">' +
          '<h3>Defender</h3>' +
          '<button class="btn btn-default attack pull-left">Attack</button>' +
          '<br class="visible-xs">' +
          '<br class="visible-xs">' +
          '<br class="visible-xs">' +
        '</div>' +
      '</div>'
    );

    // add heading for enemyCharactersRow
    var enemyCharactersHeading = $('<h3>');
    enemyCharactersHeading.addClass('heading');
    enemyCharactersHeading.text('Enemies Available to Attack');

    enemyCharactersRow.html(enemyCharactersHeading);
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
