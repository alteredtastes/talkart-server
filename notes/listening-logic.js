var a;
var saidWord;
var cmds = '';
var vcmds = [];

if(saidWord === 'stop' || saidWord === 'undo') {
  command[saidWord](); //zeros all dynamic vars, or zeros and reverts to prev variables
  saidWord = ''; //for skipping the if statements until new saidWord;
  cmds = '';
  vcmd = {};
}

if(commands[saidWord]) { //for catching 'first only' commands
  vcmd = {};
  a = 1;
  key = 'word' + a.toString();
  vcmd.key = saidWord;
  cmds = commands[saidWord];
  a++;
}

if(cmds[saidWord]) { // for catching commands recursively down command branches
  key = 'word' + a.toString();
  vcmd.key = saidWord;
  cmds = cmds[saidWord];
  a++;
}

if(typeof cmds === 'function') { //for running methods found at end of each branch
  cmds(p);
  cmds = '';
  vcmd.time = new Date();
  vcmd.id = vcmds.length;
  vcmds.push(vcmd);
  vcmd = {};
}
