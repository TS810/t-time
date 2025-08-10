import { useEffect } from 'react';
import '../sub.css';
import aboutSandsound from '../../public/img/about-sandsound.png'
import aboutTp1 from '../../public/img/about-tp1.png'
import aboutTp2 from '../../public/img/about-tp2.png'
import { Link } from 'react-router-dom';

export default function About() {
    useEffect(() => {
        document.body.classList.add('about-css');
    
        return () => {
          document.body.classList.remove('about-css');
        };
      }, []);
  return (
    <div className="about-container">
        <div className="about-mainText about-main1">
        저라는 산에 편하게 놀러 오실 수 있도록<br></br>
        저도 제 자신을 아끼고 사랑할게요
        </div>
        <div className="about-content">
          <div className="about-photo">
            <img className="about-photo-1" src={aboutSandsound} alt="" />
            <img className="about-photo-2" src={aboutTp1} alt="" />
          </div>
          <table className="about-table1">
          <tr>
            <td>별명</td>
            <td>자이언트 마운틴, 간지 폭풍 GIANT MOUNTAIN⛰️, 간.폭.자.마, 탯냥🐈‍⬛이</td>
          </tr>
          <tr>
            <td>생일</td>
            <td>2004.08.10.</td>
          </tr>
          <tr>
            <td>성격</td>
            <td>친해지면 말이 많아짐, 하후하후 성장하는 노력파</td>
          </tr>
          </table>
          
          <div className="about-direct">
            <Link className="sub-a" to="/hbd"><span>BEE HAPPY</span> BIRTHDAY, TS! ↗</Link>
            <Link className="sub-a" to="/t-time">T<span>ㅡ</span>Time ↗</Link>
            <Link className="sub-a" to="/interview">10039192 ↗</Link>
          </div>
        
          <div className="about-photo3">
            <img src={aboutTp2} alt="" />
          </div>
          <div className="about-mainText about-main2">
          여러분이 저의 나무가 되어주세요.<br></br>
          저에게 뿌리를 내려주시고 같이 성장할 수 있도록.
          </div>
          <table className="about-table2">
            <tr>
              <td>좋아하는 음식</td>
              <td><span>푸딩</span>, 아이스티(레몬!), <span>치즈 케이크</span>, 고구마 케이크, 연어, 라면</td>
            </tr>
            <tr>
              <td>좋아하는 거</td>
              <td>🐝☘️, 무한도전, 수영, 음악 감상, 커스텀하기, 소설 읽기, 음악 크게 듣기, MCR, 오아시스 등등 너무 많다 🙀</td>
            </tr>
            <tr>
              <td>싫어하는 거...</td>
              <td>가지💢(.. 빼고 다 먹어요), 달달한 제육볶음</td>
            </tr>
            <tr>
              <td>타자 속도</td>
              <td>270타<span>(정확도 100%)</span></td>
            </tr>
          </table>
      </div>
    </div>
  );
}


