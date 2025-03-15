
const githubApiBase = process.env.REACT_APP_GIT + window.location.pathname +"/";
const token = process.env.REACT_APP_TOKEN;

export const listFiles = async () => {
    try {
      const response = await fetch(githubApiBase, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch file list');
      }
  
      const data = await response.json();
      // Filter files
      const svgs = data.filter(file => file.name.endsWith('.svg')).map(file => file.name);
      const mp3s = data.filter(file => file.name.endsWith('.mp3')).map(file => file.name);

      
      return [mp3s, svgs];
    } catch (error) {
        return 'Error fetching file list:' + error;
      
    }
  };
  
  export const downloadMp3s = async (mp3Files) => {
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
      return mp3Urls;
    } catch (error) {
      return ["Error downloading MP3s:" + error];
    }
  };

  export const downloadSVGs = async (svgFiles) => {
    try {
      const svgUrls = await Promise.all(
        svgFiles.map(async (file) => {
          const response = await fetch(`${githubApiBase}${file}`, {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3.raw",
            },
          });
  
          if (!response.ok) {
            console.error(`No ${file} present`);
            return null;
          }
  
          const text = await response.text(); 
          const blob = new Blob([text], { type: "image/svg+xml" });
          return URL.createObjectURL(blob);
        })
      );
  
      return svgUrls.filter(Boolean);
    } catch (error) {
      console.error("Error downloading SVGs:", error);
      return [];
    }
  };
  
  

  
  export const downloadEvents = async () => {
    try {
      const response = await fetch(`${githubApiBase}events.json`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3.raw",
        },
      });
      if (!response.ok) {
        console.warn("No events.json present");
        return;
      }
  
      return (await response.json());
    } catch (error) {
      return "Error downloading events:" + error;
    }
  };

  export const downloadVideo = async () => {
    try {
      const response = await fetch(`${githubApiBase}video.mp4`, {
        headers: {
          Authorization: `token ${token}`,
         Accept: "application/vnd.github.v3.raw",
        },
      });
      if (!response.ok) {
        console.warn("No video present");
        return;
      }
  
      const videoBlob = await response.blob();
      console.log("Original Blob Type:", videoBlob.type); // Debugging
  
      // Force correct MIME type
      const fixedBlob = new Blob([videoBlob], { type: "video/mp4" });
  
      const blobSizeMB = (fixedBlob.size / (1024 * 1024)).toFixed(2);
      console.log("Fixed Blob size:", blobSizeMB, "MB");
      console.log("Fixed Blob Type:", fixedBlob.type);
  
      const videoUrl = URL.createObjectURL(fixedBlob);
      return videoUrl;
    } catch (error) {
      return "Error downloading video:" + error;
    }
  };
  
  export const downloadAll = async (setMP3s,setSVGs,setEvents,setVideo) => {
    const [mp3Files, svgFiles] = await listFiles();
    setMP3s(await downloadMp3s(mp3Files));
    setSVGs(await downloadSVGs(svgFiles));
    setVideo(await downloadVideo());
    let eventsWithoutIndex = await downloadEvents();
    const eventsWithIndex = eventsWithoutIndex.map((event, index) => ({
        ...event,  // Spread existing event properties
        idx: index // Add new idx field
      }));
    
    setEvents(eventsWithIndex);
    
  };
  