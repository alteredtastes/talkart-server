#TalkArt

talkart.herokuapp.com  
**NOTE: This app is integrated with Instagram's sandbox mode. If you would like to use TalkArt with your Instagram feed, please send me your Instagram username to authorize it for use.

A voice-command digital illustrator. Valid commands update dynamically in upper left of screen, notifying user of available operations. Incorporates Instagram API and OAuth, Colr.org API calls for hex searches, and p5.js for speech library, shapes, and dynamic canvas.

<img src="https://cloud.githubusercontent.com/assets/14845097/16727089/33fb74fa-4714-11e6-9660-c4be84f05d06.png" width="600px"/>

Example command sequences:  
  
"HOME" - reloads the application.
  
"LOGIN" - drops down login window.  
  
"REGISTER" - drops down registration window.  
  
"CREATE" - "BACKGROUND" - "PHOTO" - "INSTAGRAM" - Runs Instagram OAuth and returns user photos for backgrounds. 

"SIX" - Changes background Instagram photo to the 6th photo in photo selection at right panel.
  
"CREATE" - "BACKGROUND" - "COLOR" - [Prompt for name of color or of something colorful, ex. "sky"] - "GO" - Runs Colr.org call for hex values related to word.  
  
"CREATE" - "SHAPE" - "CIRCLE" - Drops circle onto canvas, then shows transform options for that shape.  
  
TRANSFORM --> "POSITION" - "RIGHT" - moves circle right - "STOP" - circle stops, presents position options again. 
  
POSITION --> "STAY" - leaves shape in current position, then presents other transform options.  
  
TRANSFORM --> "SIZE" - "ENLARGE" - starts enlargening shape - "STOP" - shape stops size change, presents size options again.
  
SIZE --> "STAY" - leaves shape at current size, then presents other transform options. 
  
TRANSFORM --> "COMMIT" - changes valid commands to the parent set, CREATE and TRANSFORM.
  
