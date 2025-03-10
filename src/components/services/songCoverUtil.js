import { searchTrack } from './spotifyService';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getSongCoversMap = async (songNames, onProgress = null) => {
  const coversMap = {};
  
  for (let i = 0; i < songNames.length; i++) {
    const songName = songNames[i];
    
    try {

      const trackData = await searchTrack(songName);
      await delay(100);
      
      coversMap[songName] = trackData?.album?.images?.[0]?.url || null;
      
      if (onProgress) {
        onProgress(i + 1, songNames.length, songName);
      }
    } catch (error) {
      console.error(`Error fetching cover for "${songName}":`, error);
      coversMap[songName] = null;
      
    
      if (onProgress) {
        onProgress(i + 1, songNames.length, songName);
      }
    }
  }
  
  return coversMap;
};

export const extractUniqueSongNames = (userData) => {
  const uniqueSongs = new Set();
  
  for (const user of Object.values(userData)) {
    for (const song of Object.values(user)) {
      uniqueSongs.add(song.name);
    }
  }
  
  return Array.from(uniqueSongs);
};