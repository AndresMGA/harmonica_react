import { useState, useEffect,useContext } from "react";
import { AppContext } from "./Context"; // Import context

import AudioPlayer from "./AudioPlayer";
import ScoreSVG from "./ScoreSVG";
import ChromaticHarmonica from "./ChromaticHarmonica";
import ChromaticHarmonicaMoving from "./ChromaticHarmonicaMoving";

function App() {
  const { setCursor, setTime, setTab} = useContext(AppContext); // Use context
  const [audioUrls, setAudioUrls] = useState([]);
  const [svgText, setSvgText] = useState(["", "", ""]);
  const githubApiBase = process.env.REACT_APP_GIT + window.location.pathname +"/";
  const token = process.env.REACT_APP_TOKEN;
  

  useEffect(() => {

    const listFiles = async () => {
      try {
        const response = await fetch(githubApiBase, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch file list');
        }

        const data = await response.json();
        // Filter out SVG files from the directory
        const svgs = data.filter(file => file.name.endsWith('.svg')).map(file => file.name);
        const mp3s = data.filter(file => file.name.endsWith('.mp3')).map(file => file.name);
        return [mp3s,svgs];
      } catch (error) {
        console.log('Error fetching SVG files list:', error);
      }
    };

    const downloadMp3s = async (mp3Files) => {
      try {
        const mp3Urls = await Promise.all(
          mp3Files.map(async (file) => {
            const response = await fetch(`${githubApiBase}${file}`, {
              headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3.raw",
              },
            });
            if (!response.ok) {
              return [`no ${file} present`];
            }
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          })
        );
        setAudioUrls(mp3Urls);
      } catch (error) {
        console.error("Error downloading MP3s:", error);
      }
    };



    const downloadSVGs = async (svgFiles) => {
      try {
        const svgStrings = await Promise.all(
          svgFiles.map(async (file) => {
            const response = await fetch(`${githubApiBase}${file}`, {
              headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3.raw",
              },
            });
            if (!response.ok) {
              return [`no ${file} present`];
            }
            return await response.text();
          })
        );
        setSvgText(svgStrings);
      } catch (error) {
        console.log("Error downloading SVGs:", error);
      }
    };

    const downloadAll = async () => {
      const [mp3Files,svgFiles] = await listFiles();
      downloadMp3s(mp3Files);
      downloadSVGs(svgFiles);
    };

    downloadAll();
  }, []); // Empty dependency array → Runs only once when component mounts

let prevTime = 0;
const handleTimeUpdate = (time) => {


       
    const tabs = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
      "-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9", "-10", "-11", "-12",
      "1*", "2*", "3*", "4*", "5*", "6*", "7*", "8*", "9*", "10*", "11*", "12*",
      "-1*", "-2*", "-3*", "-4*", "-5*", "-6*", "-7*", "-8*", "-9*", "-10*", "-11*", "-12*"
    ];

    if (Math.floor(time) !== prevTime) {
      prevTime = Math.floor(time);
    const newCursorPosition = [time * 100, time*100, 20, 20]; // Example movement
    setCursor(newCursorPosition);
    setTab(tabs[Math.floor(Math.random() * 48)]);
    }
    
};


  return (
    <div>
      <AudioPlayer audioFiles={audioUrls} onTimeUpdate={handleTimeUpdate}/>
      <ScoreSVG svgContent={svgText} />
      <ChromaticHarmonica />
      <ChromaticHarmonicaMoving />
    </div>
  );
}

export default App;
