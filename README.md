#TalkArt

A voice-command digital illustrator. Valid commands update dynamically in upper left of screen, notifying user of available options. Incorporates Instagram API and authentication, Colr.org API calls for custom hex arrays, and p5.js for speech library and dropping modifiable shapes to canvas.

<img src="https://cloud.githubusercontent.com/assets/14845097/16727089/33fb74fa-4714-11e6-9660-c4be84f05d06.png" width="600px"/>

Example command sequences:  
  
"LOGIN" - drops down login window.  
  
"REGISTER" - drops down registration window.  
  
"CREATE" - "BACKGROUND" - "PHOTO" - "INSTAGRAM" - Runs Instagram OAuth and returns user photos for backgrounds.  
  
"CREATE" - "BACKGROUND" - "COLOR" - [Prompt for color or tag] - "GO" - Runs Colr.org call for hex values related to word.  
  
"CREATE" - "SHAPE" - "CIRCLE" - Drops circle onto canvas, then shows transform options for that shape.  
  
TRANSFORM -> "POSITION" - "RIGHT" - moves circle right - "STOP - circle stops, presents position options again. 
  
"POSITION" - "STAY" - leaves shape in current position, then presents other transform options.  
  
"TRANSFORM" -> "SIZE" - "ENLARGE" - starts enlargening shape - "STOP" - shape stops size change, presents size options again.
  
SIZE -> "STAY" - leaves shape at current size, then presents other transform options. 
  
"TRANSFORM" -> "COMMIT" - changes valid commands to the parent set of "CREATE" and "TRANSFORM".  
  
