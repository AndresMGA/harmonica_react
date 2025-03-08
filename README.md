

<h2>App</h2>
  <blockquote>
    <p>Download All Files</p>
    <ul>
      <li>1_harmonica.mp3</li>
      <li>2_accompaniment.mp3</li>
      <li>3_metronome.mp3</li>
      <li>score-1.svg</li>
      <li>score-2.svg</li>
      <li>score-3.svg</li>
      <li>events.json</li>
      <li>meta.json</li>
    </ul>
    </blockquote>
    <blockquote>
    <p>Update Function</p>
   
      <p>This function is triggered by <code>AudioPlayer</code></p>
      <p>Checks current playback time for new events</p>
      <p>If new event is due:</p>
      <ul>
        <li>passes new cursor position to ScoreSVG</li>
        <li>passes new tab to HarmonicaMoving</li>
      </ul>
    </blockquote>
    
    <p>Score Clicked Function</p>
    
      <p>When score is clicked, finds time of nearest event and passes its time to the Update Function</p>
    

    <p>Create 4 sub-components</p>
    <ul>
      <li><b>AudioPlayer</b>
        <ul>
          <li>props:
            <ul>
              <li>mp3 files</li>
              <li>onTimeUpdated</li>
            </ul>
          </li>
        </ul>
      </li>
      

      <li><b>ScoreSVG</b>
        <ul>
          <li>props:
            <ul>
              <li>svg files</li>
              <li>current cursor position</li>
              <li>onScoreClicked</li>
            </ul>
          </li>
        </ul>
      </li>

      <li><b>HarmonicaStatic</b>
        <ul>
          <li>props:
            <ul>
              <li>harmonica type (chromatic or diatonic)</li>
            </ul>
          </li>
        </ul>
      </li>

      <li><b>HarmonicaMoving</b>
        <ul>
          <li>props:
            <ul>
              <li>current tab</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </blockquote>

  <h2>AudioPlayer</h2>
  <blockquote>
    <p>This component plays the mp3 files, and triggers the update function in App every 50ms when playback is active</p>
    <p>It has handler functions for its subcomponents:</p>
    <ul>
      <li>playHandler</li>
      <li>pauseHandler</li>
      <li>stopHandler</li>
      <li>volumeChangeHandler</li>
      <li>speedChangeHandler</li>
    </ul>

    <p>Creates 2 sub-components</p>
    <ul>
      <li><b>AudioTransport</b> (play, pause, stop buttons)
        <ul>
          <li>props:
            <ul>
              <li>playHandler</li>
              <li>pauseHandler</li>
              <li>stopHandler</li>
            </ul>
          </li>
        </ul>
      </li>
      
      <li><b>AudioControls</b> (volume and speed controls)
        <ul>
          <li>props:
            <ul>
              <li>volumeChangeHandler</li>
              <li>speedChangeHandler</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </blockquote>

  <h2>ScoreSVG</h2>
  <blockquote>
    <p>This component displays the current score SVG and draws the cursor at the given current position</p>
    <p>It notifies App when user clicked on a note or rest</p>
  </blockquote>

  <h2>HarmonicaStatic</h2>
  <blockquote>
    <p>This function displays the non-moving parts of the harmonica</p>
    <p>Can be chromatic or diatonic</p>
  </blockquote>

  <h2>HarmonicaMoving</h2>
  <blockquote>
    <p>This function displays the moving parts of the harmonica</p>
    <p>When a new tab is received:</p>
    <ul>
      <li>updates active hole</li>
      <li>updates position of slide</li>
    </ul>
  </blockquote>


  <h2>HarmonicaMoving</h2>

    <p>This function displays the moving parts of the harmonica</p>
    <p>When a new tab is received:</p>
    <ul>
      <li>updates active hole</li>
      <li>updates position of slide</li>
    </ul>

