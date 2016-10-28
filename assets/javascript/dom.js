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
  // start with darth
  var darthColumn = $('<div>');
  darthColumn.addClass('col-xs-6 col-sm-3 character vader');
  darthColumn.attr('data-hp', darthVader.health);
  availableCharactersRow.append(darthColumn);
  // add thumbnail
  var darthThumbnail = $('<div>');
  darthThumbnail.addClass('thumbnail');
  darthColumn.append(darthThumbnail);
  // append image
  darthThumbnail.append(
    '<img src=' + darthVader.image + ' alt="' + darthVader.name + ' icon">'
  );
  // append caption
  var darthCaption = $('<div>');
  darthCaption.addClass('caption');
  darthThumbnail.append(darthCaption);
  // add caption heading
  var darthCaptionHeading = $('<h5>');
  darthCaptionHeading.addClass('text-info');
  darthCaptionHeading.text(darthVader.name);
  darthCaption.append(darthCaptionHeading);
  // add caption text
  var darthCaptionText = $('<p>');
  darthCaptionText.text(darthVader.health);
  darthCaption.append(darthCaptionText);

  // now luke
  var lukeColumn = $('<div>');
  lukeColumn.addClass('col-xs-6 col-sm-3 character skywalker');
  lukeColumn.attr('data-hp', lukeSkywalker.health);
  availableCharactersRow.append(lukeColumn);
  // add thumbnail
  var lukeThumbnail = $('<div>');
  lukeThumbnail.addClass('thumbnail');
  lukeColumn.append(lukeThumbnail);
  // append image
  lukeThumbnail.append(
    '<img src=' + lukeSkywalker.image + ' alt="' +
    lukeSkywalker.name + ' icon">'
  );
  // append caption
  var lukeCaption = $('<div>');
  lukeCaption.addClass('caption');
  lukeThumbnail.append(lukeCaption);
  // add caption heading
  var lukeCaptionHeading = $('<h5>');
  lukeCaptionHeading.addClass('text-info');
  lukeCaptionHeading.text(lukeSkywalker.name);
  lukeCaption.append(lukeCaptionHeading);
  // add caption text
  var lukeCaptionText = $('<p>');
  lukeCaptionText.text(lukeSkywalker.health);
  lukeCaption.append(lukeCaptionText);

  // on to obi-wan
  var obiWanColumn = $('<div>');
  obiWanColumn.addClass('col-xs-6 col-sm-3 character skywalker');
  obiWanColumn.attr('data-hp', obiWanKenobi.health);
  availableCharactersRow.append(obiWanColumn);
  // add thumbnail
  var obiWanThumbnail = $('<div>');
  obiWanThumbnail.addClass('thumbnail');
  obiWanColumn.append(obiWanThumbnail);
  // append image
  obiWanThumbnail.append(
    '<img src=' + obiWanKenobi.image + ' alt="' +
    obiWanKenobi.name + ' icon">'
  );
  // append caption
  var obiWanCaption = $('<div>');
  obiWanCaption.addClass('caption');
  obiWanThumbnail.append(obiWanCaption);
  // add caption heading
  var obiWanCaptionHeading = $('<h5>');
  obiWanCaptionHeading.addClass('text-info');
  obiWanCaptionHeading.text(obiWanKenobi.name);
  obiWanCaption.append(obiWanCaptionHeading);
  // add caption text
  var obiWanCaptionText = $('<p>');
  obiWanCaptionText.text(obiWanKenobi.health);
  obiWanCaption.append(obiWanCaptionText);

  // finally the emperor
  var emperorColumn = $('<div>');
  emperorColumn.addClass('col-xs-6 col-sm-3 character skywalker');
  emperorColumn.attr('data-hp', emperorPalpatine.health);
  availableCharactersRow.append(emperorColumn);
  // add thumbnail
  var emperorThumbnail = $('<div>');
  emperorThumbnail.addClass('thumbnail');
  emperorColumn.append(emperorThumbnail);
  // append image
  emperorThumbnail.append(
    '<img src=' + emperorPalpatine.image + ' alt="' +
    emperorPalpatine.name + ' icon">'
  );
  // append caption
  var emperorCaption = $('<div>');
  emperorCaption.addClass('caption');
  emperorThumbnail.append(emperorCaption);
  // add caption heading
  var emperorCaptionHeading = $('<h5>');
  emperorCaptionHeading.addClass('text-info');
  emperorCaptionHeading.text(emperorPalpatine.name);
  emperorCaption.append(emperorCaptionHeading);
  // add caption text
  var emperorCaptionText = $('<p>');
  emperorCaptionText.text(emperorPalpatine.health);
  emperorCaption.append(emperorCaptionText);

  // add columns to chosenCharactersRow
  // first column for your character
  var yourCharacterColumn = $('<div>');
  yourCharacterColumn.addClass('col-xs-6 your-character hidden');
  // heading
  var yourCharacterColumnHeading = $('<h3>');
  yourCharacterColumnHeading.text('Your Character');
  // put the heading inside the div
  yourCharacterColumn.html(yourCharacterColumnHeading);
  // append yourCharacterColumn to choseCharactesRow
  chosenCharactersRow.append(yourCharacterColumn);

  // second column for the defender
  var defenderColumn = $('<div>');
  defenderColumn.addClass('col-xs-6 defender hidden');
  // heading
  var defenderColumnHeading = $('<h3>');
  defenderColumnHeading.text('Defender');
  // put the heading inside the div
  defenderColumn.append(defenderColumnHeading);
  // append the defender column to the chosenCharactersRow
  chosenCharactersRow.append(defenderColumn);

  // add attack button to defenderColumn
  var attackButton = $('<button>');
  attackButton.addClass('btn btn-default attack pull-left');
  attackButton.text('Attack');
  // append attackButton to defenderColumn
  defenderColumn.append(attackButton);
  // add some breaks so things look appealing
  // these only matter for xs views
  defenderColumn.append(
    '<br class="visible-xs">' +
    '<br class="visible-xs">' +
    '<br class="visible-xs">'
  );

  // add heading for enemyCharactersRow
  var enemyCharactersHeading = $('<h3>');
  enemyCharactersHeading.addClass('heading');
  enemyCharactersHeading.text('Enemies Available to Attack');

  enemyCharactersRow.html(enemyCharactersHeading);
}
