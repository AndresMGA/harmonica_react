

```
                    +-------------------------------------------------+
                    |                         App                     |
                    |                                                 |
                    +-------------------------------------------------+
                    /                |                 |              \
                   /                 |                 |               \
                  /                  |                 |                \
            +-------------+   +-------------+    +-------------+    +-------------+ 
            | AudioPlayer |   |   ScoreSVG  |    |  Harmonica  |    |  Harmonica  |
            |             |   |             |    |   Static    |    |    Moving   |
            +-------------+   +-------------+    +-------------+    +-------------+
              /        \       
             /          \
   +-------------+   +-------------+    
   |    Audio    |   |    Audio    |   
   |  Transport  |   |   Controls  |   
   +-------------+   +-------------+   

```

**App**
>Download All Files
>>- 1_harmonica.mp3
>>- 2_accompaniment.mp3
>>- 3_metronome.mp3
>>- score-1.svg
>>- score-2.svg
>>- score-3.svg
>>- events.json
>>- meta.json

>Update Function

>>This function is triggered by <AudioPlayer>

>>Checks current playback time for new events

>>If new event is due:
>>>- passes new cursor position to ScoreSVG
>>>- passes new tab to HarmonicaMoving

>Score Clicked Function

>>When score is clicked, finds time of nearest event and passes its time to the Update Function

>Create 4 sub-components

>>- AudioPlayer
>>>props:
>>>>- mp3 files
>>>>- onTimeUpdated
>>- ScoreSVG
>>>props:
>>>>- svg files
>>>>- current cursor position
>>>>- onScoreClicked
>>- HarmonicaStatic 
>>>props:
>>>>- harmonica type (chromatic or diatonic)
>>- HarmonicaMoving
>>>props:
>>>>- current tab

**AudioPlayer**
>This component plays the mp3 files, and triggers the update function in App every 50ms when playback is active

>It has handler fuctions for its subcomponents

>>- playHandler
>>- pauseHandler
>>- stopHandler
>>- volumeChangeHandler
>>- speedChangeHandler

>Creates 2 sub-components

>>- AudioTransport (play, pause, stop buttons)
>>>props:
>>>>- playHandler
>>>>- pauseHandler
>>>>- stopHandler
>>- AudioControls (volume and speed controls)
>>>props:
>>>>- volumeChangeHandler
>>>>- speedChangeHandler

**ScoreSVG**
>>This component displays the current score SVG and draws the cursor at the given cuurent position

>>It notifies App when user clicked on a note or rest   

**HarmonicaStatic**
>>This function displays the non moving parts of the harmonica

>>Can be chromatic or diatonic

**HarmonicaMoving**
>>This function displays the moving parts of the harmonica

>>When a new tab is received
>>>- updates active hole
>>>- updates position of slide 