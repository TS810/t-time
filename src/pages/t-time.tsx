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
  const [error, setError] = useState('');
  const [sbError, setSbError] = useState('');

  useEffect(() => {
    document.body.classList.add('t-time-css');

    fetch('http://localhost:4000/playlists')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPlaylists(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('서버에서 데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      });

    const fetchSupabaseData = async () => {
      const { data, error } = await supabase.from('t-time').select('*');
      if (error) {
        setSbError(error.message);
      } else if (data) {
        setSongItems(data);
      }
    };
    fetchSupabaseData();

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
                    >↗
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
    <div className="topContainer" style={{ width: '100vw', padding: '7vh 10vw', boxSizing:'border-box'}}>
      <div className="des">
      태산이가 추천/언급한 곡<br></br>
      날짜 클릭시 플레이리스트 이동
      </div>
      <div className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
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
