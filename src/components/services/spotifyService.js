import axios from "axios";

const clientId = "CLIENT_ID";
const clientSecret = "CLIENT_SECRET";

const getToken = async () => {
  const response = await axios("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    data: "grant_type=client_credentials",
    method: "POST",
  });
  return response.data.access_token;
};

export const searchTrack = async (trackName) => {
  const token = await getToken();
  const result = await axios(
    `https://api.spotify.com/v1/search?q=${trackName}&type=track`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  return result.data.tracks.items[0];
};
