import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());

let accessToken = '';
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (Date.now() < tokenExpiresAt) {
    // 토큰 아직 유효하면 재사용
    return accessToken;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  const data = await response.json();

  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000; // 만료시간 업데이트

  return accessToken;
}

app.get('/playlists', async (req, res) => {
  try {
    const token = await getAccessToken();
    const userId = '315h6cmi7zzlwqzqup6l424erpzu';

    // 플레이리스트 목록 가져오기
    const playlistsRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const playlistsData = await playlistsRes.json();

    // 각 플레이리스트의 트랙 가져오기
    const playlistsWithTracks = await Promise.all(
      playlistsData.items.map(async (playlist) => {
        const tracksRes = await fetch(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const tracksData = await tracksRes.json();

        return {
          id: playlist.id,
          name: playlist.name,
          url: playlist.external_urls.spotify,
          tracks: tracksData.items.map((item) => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists.map((a) => a.name).join(', '),
          })),
        };
      })
    );

    res.json(playlistsWithTracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러' });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});
