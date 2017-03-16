$(function () {
  //We'll use message to tell the user what's happening
  var $message = $('#message');

  //Get handle to the game board buttons
  var $buttons = $('#board .board-row button');

  //Our interface to the Sync service
  var syncClient;

  //We're going to use a single Sync document, our simplest
  //synchronisation primitive, for this demo
  var syncDoc;

  //Get an access token for the current user, passing a device ID
  //In browser-based apps, every tab is like its own unique device
  //synchronizing state -- so we'll use a random UUID to identify
  //this tab.
  $.getJSON('/token', function (tokenResponse) {
    //Initialize the Sync client
    syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });

    //Let's pop a message on the screen to show that Sync is ready
    $message.html('Sync initialized!');

    //Now that Sync is active, lets enable our game board
    $buttons.attr('disabled', false);

    //This code will create and/or open a Sync document
    //Note the use of promises
    syncClient.document('SyncGame').then(function(doc) {
      //Lets store it in our global variable
      syncDoc = doc;

      //Initialize game board UI to current state (if it exists)
      var data = syncDoc.get();
      if (data.board) {
        updateUserInterface(data);
      }

      //Let's subscribe to changes on this document, so when something
      //changes on this document, we can trigger our UI to update
      syncDoc.on('updated', updateUserInterface);

    });

  });

  //Whenever a board button is clicked:
  $buttons.on('click', function (e) {
    //Toggle the value: X, O, or empty
    toggleCellValue($(e.target));

    //Update the document
    var data = readGameBoardFromUserInterface();

    //Send updated document to Sync
    //This should trigger "updated" events on other clients
    syncDoc.set(data);

  });

  //Toggle the value: X, O, or empty (&nbsp; for UI)
  function toggleCellValue($cell) {
    var cellValue = $cell.html();

    if (cellValue === 'X') {
      $cell.html('O');
    } else if (cellValue === 'O') {
      $cell.html('&nbsp;');
    } else {
      $cell.html('X');
    }
  }

  //Read the state of the UI and create a new document
  function readGameBoardFromUserInterface() {
    var board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var selector = '[data-row="' + row + '"]' +
          '[data-col="' + col + '"]';
        board[row][col] = $(selector).html().replace('&nbsp;', '');
      }
    }

    return {board: board};
  }

  //Update the buttons on the board to match our document
  function updateUserInterface(data) {
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var selector = '[data-row="' + row + '"]' +
          '[data-col="' + col + '"]';
        var cellValue = data.board[row][col];
        $(selector).html(cellValue === '' ? '&nbsp;' : cellValue);
      }
    }
  }

});