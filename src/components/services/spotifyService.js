import axios from 'axios';

const clientId = 'ec1885ca0b244605b24fb0932da89e98';
const clientSecret = '95f9d8d8ae424819acefa9fa87a3fe73';

const getToken = async () => {
  const response = await axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  });
  return response.data.access_token;
};

export const searchTrack = async (trackName) => {
  const token = await getToken();
  const result = await axios(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  return result.data.tracks.items[0];
};
