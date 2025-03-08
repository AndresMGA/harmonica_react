

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


  <h2>HarmonicaMoving</h2>

    <p>This function displays the moving parts of the harmonica</p>
    <p>When a new tab is received:</p>
    <ul>
      <li>updates active hole</li>
      <li>updates position of slide</li>
    </ul>

