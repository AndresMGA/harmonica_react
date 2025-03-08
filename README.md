

```
                    +--------------------------------------------------------+
                    |                   HarmonicaScorePlayer                 |
                    |                                                        |
                    +--------------------------------------------------------+
                    /             |             |              |             \
                  /               |             |              |               \
            +-------------+ +------------+ +----------+ +-------------+ +-------------+ 
            | AudioPlayer | |  ScoreSVG  | | CountIn  | |  Harmonica  | |  Harmonica  |
            |             | |            | |          | |   Static    | |    Moving   |
            +-------------+ +------------+ +----------+ +-------------+ +-------------+
              /        \       
            /            \
    +------------+ +-------------+    
    |   Audio    | |    Audio    |   
    | Transport  | |   Controls  |   
    +------------+ +-------------+   

```
# <HarmonicaScorePlayer\>
```
This component is responsible for following tasks:
```
>#### DOWNLOAD REQUIRED FILES - useEffect()...
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
>#### UPDATE STATE - onTimeUpdate(time, stepPlay=false)...
```
    This function is triggered from <AudioPlayer>
    It receives the current playback time and checks 
    for a matching item in events.json

    If a new event is due:
        If it is a count-in event:
            - passes count to <CountIn> 
            - passes count to <AudioPlayer> 
                (this is to ensure that metronome can be heard
                when <CountIn> is displayed)
        If it is a note or rest
            - passes new cursor position to <ScoreSVG>
            - passes new tab to <HarmonicaMoving>

    If stepPlay=True it will trigger <AudioPlayer> pause at the end 
    of the note event
        
```

>#### HANDLE CLICKS ON SCORE - onScoreClicked(location)...
```
    When <ScoreSVG> is clicked, finds the timestamp of 
    the nearest item in event.json and passes it 
    to onTimeUpdate(time, stepPlay=true)

    stepPlay is set to True toplay only 1 note
```
>#### SUBCOMPONENTS - return ...
```
    <AudioPlayer>
        props | mp3 files
              | onTimeUpdated
              | count
              | pause
    <ScoreSVG>
        props | svg files
              | current cursor position
              | onScoreClicked
    <CountIn> 
        props | count number
    <HarmonicaStatic> 
        props | harmonica type (chromatic or diatonic)
    <HarmonicaMoving>
        props | current tab
```

# <AudioPlayer\>
```
    This component uses hidden HTML5's <audio> tags to 
    play the mp3 files and passes the current playback 
    time to onTimeUpdate() in <HarmonicaScorePlayer> every 
    50 milliseconds while playback is active.

    It plays 3 audio files simultaneously
      - harmonica
      - accompaniment
      - metronome    
    
    It has handler fuctions for its subcomponents
      - playHandler
      - pauseHandler
      - stopHandler
      - volumeChangeHandler
      - speedChangeHandler

    Metronome track volume is overriden to at least 0.5 if
    a count in value other than 0 is received
```

>#### SUBCOMPONENTS - return ...
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
# <CountIn\>
```
    This component is only visible in the first few seconds of
    playback, before any notes or rest events are due.

    When a new count in number is received it is displayed on top 
    of <ScoreSVG>

    When a 0 value is received it gets set to invisible.
``` 
# <HarmonicaStatic\>
```
    This component displays the non moving parts of the harmonica

    It can be "diatonic" (shorter, 10 holes) or "chromatic" (longer, 
    12 holes and with a slider button icon)
```
# <HarmonicaMoving\>
```
    This component displays the moving parts of the harmonica

    When a new tab is received
      - updates active hole
      - updates position of slider button 
``` 
