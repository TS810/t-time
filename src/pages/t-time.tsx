import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import '../sub.css';

interface Track {
  id: string;
  name: string;
  artist: string;
}

interface Playlist {
  id: string;
  name: string;
  url: string;
  tracks: Track[];
}

interface SongItem {
  id: string;
  title: string;
  artist: string;
  link: string | null;
  compose: boolean;
  write: boolean;
  arrange: boolean;
  cover: boolean;
  date: string;
}

export default function TTime() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songItems, setSongItems] = useState<SongItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const [sbError, setSbError] = useState('');

  useEffect(() => {
    document.body.classList.add('t-time-css');

    // Supabase에서 playlist_data, track_data 가져와서 조합
    const fetchSupabasePlaylists = async () => {
      try {
        const { data: playlistData, error: playlistError } = await supabase
          .from('playlist_data')
          .select('*');

        const { data: trackData, error: trackError } = await supabase
          .from('track_data')
          .select('*');

        if (playlistError) throw playlistError;
        if (trackError) throw trackError;

        // playlist_data + track_data -> Playlist[] 형태로 변환
        const playlistsFromSb: Playlist[] = playlistData.map((pl) => ({
          id: pl.id || pl.playlist_name, // id 없으면 이름 사용
          name: pl.playlist_name,
          url: pl.playlist_url,
          tracks: trackData
            .filter((t) => t.playlist_name === pl.playlist_name)
            .map((t) => ({
              id: `${t.playlist_name}-${t.track_name}`, // 고유 키
              name: t.track_name,
              artist: t.track_artist,
            })),
        }));

        setPlaylists(playlistsFromSb);
      } catch (err: any) {
        setSbError(err.message || '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    // 기존 t-time 크레딧 데이터 가져오기
    const fetchSupabaseCredits = async () => {
      const { data, error } = await supabase.from('t-time').select('*');
      if (error) {
        setSbError(error.message);
      } else if (data) {
        setSongItems(data);
      }
    };

    fetchSupabasePlaylists();
    fetchSupabaseCredits();

    return () => {
      document.body.classList.remove('t-time-css');
    };
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;

  const sortedPlaylists = [...playlists].sort((a, b) => a.name.localeCompare(b.name));

  const LABEL_MAP = {
    compose: '작곡 | compose',
    write: '작사 | lyrics',
    arrange: '편곡 | arrange',
    cover: '커버 | cover',
  };

  const renderCreditTable = (key: 'compose' | 'write' | 'arrange' | 'cover') => {
    const filtered = songItems
      .filter((item) => item[key])
      .sort((a, b) => {
        const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateCompare !== 0) return dateCompare;
        return a.title.localeCompare(b.title, 'ko');
      });

    if (filtered.length === 0) return null;

    return (
      <div className="madeTs" key={key}>
        <table>
          <thead>
            <tr style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left' }}>{LABEL_MAP[key]}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderTop: '1px solid #ddd' }}>
                <td style={{ padding: '0.5rem' }}>
                  {item.title}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arrow-icon"
                      title="바로가기"
                    >
                      ↗
                    </a>
                  )}
                  <br />
                  <span className="artist-gray">{item.artist}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="topContainer" style={{ width: '100vw', padding: '7vh 10vw', boxSizing: 'border-box' }}>
      <div className="des">
        태산이가 추천/언급한 곡
        <br />
        날짜 클릭시 플레이리스트 이동
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {sortedPlaylists.map((playlist) => (
            <div className="recommendTs" key={playlist.id}>
              <table>
                <thead>
                  <tr style={{ backgroundColor: 'black' }}>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>
                      <a
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: 'none',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {playlist.name}
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {playlist.tracks.map((track) => (
                    <tr key={track.id} style={{ borderTop: '1px solid #ddd' }}>
                      <td style={{ padding: '0.5rem' }}>
                        {track.name}
                        <br />
                        <span className="artist-gray">{track.artist}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {sbError && <p>Supabase 에러: {sbError}</p>}
        </div>
        <div>
          {renderCreditTable('compose')}
          {renderCreditTable('write')}
          {renderCreditTable('arrange')}
          {renderCreditTable('cover')}
        </div>
      </div>
    </div>
  );
}
