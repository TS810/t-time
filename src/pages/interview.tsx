import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import '../sub.css';

interface InterviewItem {
  content: string;
  date: string;
  link: string;
}

export default function Interview() {
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);

  useEffect(() => {
    document.body.classList.add('interview-css');
    fetchData();

    return () => {
      document.body.classList.remove('interview-css');
    };
  }, []);

  async function fetchData() {
    const { data, error } = await supabase
      .from('interview')
      .select('content, date, link')
      .order('date', { ascending: true });

    if (error) {
      console.error('데이터 가져오기 실패:', error);
      return;
    }
    if (data) {
      setInterviews(data as InterviewItem[]);
    }
  }

  return (
    <div className="interview-container">
      <div className="interview-content">
        {interviews.map((item, index) => (
          <div key={index} className="interview-item">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="interview-text"
            >
              {item.content}↗
            </a>
          </div>
          
        ))}
      </div>
    </div>
  );
}
