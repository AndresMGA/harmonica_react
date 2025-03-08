

```
                    +-------------------------------------------------+
                    |              HarmonicaScorePlayer               |
                    |                                                 |
                    +-------------------------------------------------+
                    /                |                 |              \
                  /                  |                 |                \
            +-------------+   +-------------+    +-------------+    +-------------+ 
            | AudioPlayer |   |   ScoreSVG  |    |  Harmonica  |    |  Harmonica  |
            |             |   |             |    |   Static    |    |    Moving   |
            +-------------+   +-------------+    +-------------+    +-------------+
              /        \       
            /            \
   +-------------+   +-------------+    
   |    Audio    |   |    Audio    |   
   |  Transport  |   |   Controls  |   
   +-------------+   +-------------+   

```
# <HarmonicaScorePlayer\>

>### DOWNLOADS FILES - useEffect()...
```
    1_harmonica.mp3
    2_accompaniment.mp3
    3_metronome.mp3
    score-1.svg
    score-2.svg
    score-3.svg
    events.json
    meta.json
```
>### UPDATES STATE - onTimeUpdate(time)...
```
    This function is triggered by <AudioPlayer>
    Checks the current playback time for a matching 
    event in events.json

    If a new event is due:
        - passes new cursor position to <ScoreSVG>
        - passes new tab to <HarmonicaMoving>
```

>### HANDLES CLICKS ON SCORE - onScoreClicked(location)...
```
    When <ScoreSVG> is clicked, finds the timestamp of 
    the nearest item in event.json and passes it 
    to onTimeUpdate(time)
```
>### SUBCOMPONENTS - return ...
```
    <AudioPlayer>
        props | mp3 files
              | onTimeUpdated
    <ScoreSVG>
        props | svg files
              | current cursor position
              | onScoreClicked
    <HarmonicaStatic> 
        props | harmonica type (chromatic or diatonic)
    <HarmonicaMoving>
        props | current tab
```

# <AudioPlayer\>
```
    This component uses HTML5's <audio> tag to play the
    mp3 files and passes the current playback time to
    onTimeUpdate() in <HarmonicaScorePlayer> every 50 
    milliseconds while playback is active.
    
    It has handler fuctions for its subcomponents
      - playHandler
      - pauseHandler
      - stopHandler
      - volumeChangeHandler
      - speedChangeHandler
```

>### SUBCOMPONENTS - return ...
```
    <AudioTransport> (play, pause, stop buttons)
        props |  playHandler
              |  pauseHandler
              |  stopHandler
    <AudioControls> (volume and speed controls)
        props |  volumeChangeHandler
              |  speedChangeHandler
```
# <ScoreSVG\>
```
    This component displays the current score SVG and draws 
    the cursor at the given current position

    It notifies <HarmonicaScorePlayer> onScoreClicked() when 
    user clicks on a note or rest   
```
# <HarmonicaStatic\>
```
    This component displays the non moving parts of the harmonica

    It can be "diatonic" (shorter, 10 holes) or "chromatic" (longer, 
    12 holes and with an slider icon)
```
# <HarmonicaMoving\>
```
    This component displays the moving parts of the harmonica

    When a new tab is received
      - updates active hole
      - updates position of slide 
``` 
