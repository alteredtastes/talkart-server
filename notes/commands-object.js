commands = {
  //specific to users canvas
  create: {
    //shape, line, background, etc. - create unique ID each time.
    shape: {},
    line: {},
    background: {}
  },
  transform: {
    pallette: {},
    //filter by type of element, then ID, then make transformation with
    //'start' method that stops on 'stop' command. Always save prev values for undoing.
  },
  erase: {
    //filter by type of element, then ID, then make
  },
  stop: function() {
    //zero out all dynamic variables
  },
  undo: function() {
    //zero all dynamic variables and revert to prev vars.
  },
  save: {}
}
