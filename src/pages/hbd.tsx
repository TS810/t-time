import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import '../sub.css';

interface HBDItem {
  id: string;
  type: 'from' | 'to';
  ppl: string;
  content: string;
  date: string; // "2024-08-10"
  time: string; // "12:00"
  link: string;
  img_url: string;
}

export default function Birthday() {
  const [hbdList, setHbdList] = useState<HBDItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.classList.add('bd-css');

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('hbd')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) {
        setError('불러오기 실패');
        console.error(error);
      } else {
        setHbdList(data);
      }
    };

    fetchData();

    return () => {
      document.body.classList.remove('bd-css');
    };
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="bubble-container">
      {hbdList.map((item) => {
        const formattedDate = new Date(item.date).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        const displayTime = item.time.slice(0, 5); // "12:00"

        const formatted = formattedDate.replace(/\. /g, '년 ').replace('.', '월').replace('.', '일');

        if (item.type === 'to') {
          return (
            <div key={item.id} className="to-container">
              <div className="to-bubble">
                <div className="to-who">FROM. {item.ppl}</div>
                <div
                  className="to-text"
                  dangerouslySetInnerHTML={{ __html: item.link
                    ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="hbd-link">${item.content}</a>`
                    : item.content
                  }}
                ></div>
                <div className="live-img">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img src={item.img_url} alt="" />
                    </a>
                  ) : (<img src={item.img_url} alt="" />)}
                </div>
                <div className="to-date">{formatted} {displayTime}</div>
              </div>
            </div>
          );
        }

        if (item.type === 'from') {
          return (
            <div key={item.id} className="from-container">
              <div className="from-bubble">
                <div className="from-who">TO. {item.ppl}</div>
                <div
                  className="from-text"
                  dangerouslySetInnerHTML={{ __html: item.link
                    ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="hbd-link">${item.content}</a>`
                    : item.content
                  }}
                ></div>
                <div className="live-img">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img src={item.img_url} alt="" />
                    </a>
                  ) : (<img src={item.img_url} alt="" />)}
                </div>
                <div className="from-date">{formatted} {displayTime}</div>
              </div>
            </div>
          );
        }

        if (item.type === 'live') {
          return (
            <div key={item.id} className="live-container">
              <div className="live-bubble">
                <div className="live-title">(LIVE)</div>
                <div className="live-title">{item.content}</div>
                <div className="live-img">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img src={item.img_url} alt="" />
                    </a>
                  ) : (<img src={item.img_url} alt="" />)}
                </div>
                <div className="live-date">{formatted} {displayTime}</div>
              </div>
            </div>
          );
        }

        if (item.type === 'official') {
          return (
            <div key={item.id} className="official-container">
              <div className="official-bubble">
                <div className="official-title">HAPPY TAESAN DAY!</div>
                <div className="official-img">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img src={item.img_url} alt="" />
                    </a>
                  ) : (<img src={item.img_url} alt="" />)}
                </div>
                <div className="official-date">{formatted} {displayTime}</div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
