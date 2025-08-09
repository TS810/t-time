import { useEffect } from 'react';
import '../sub.css';

export default function Comment() {
    useEffect(() => {
        document.body.classList.add('comment-css');
    
        return () => {
          document.body.classList.remove('comment-css');
        };
      }, []);
  return (
    <div className="comment">
        이 공간은 태산이의 스물한 살 생일을 축하하기 위해 만들었습니다.<br></br>
        조금 느리더라도 꾸준히 업데이트 하면서 오랫동안 유지할 계획이에요.<br></br>
        생각만 해두고 만들지 않은 기능이나 빠진 내용들이 꽤 있어서 당분간은 잦은 수정이 있을 것 같아요.<br></br>
        조용히 바뀌고 업데이트 될 예정이니 귀여운 태산이를 모아 보고 싶을 때 들러주세요 (0.&lt;)<br></br>
        <br></br>
        네잎클로버 옆 세잎클로버의 소중함을 아는 마음,<br></br>
        사랑과 행복을 모두 소중히 하는 마음,<br></br>
        원도어의 행복을 책임져주겠다는 마음,<br></br>
        언제나 마지막 인사로는 사랑한다고 말해주는 마음 덕에 저도 매일매일 즐겁고 큰 힘을 얻어요.<br></br>
        <br></br>
        태산이를 좋아하며 새롭게 발견한 취향을 탐구하며<br></br>
        또 한번 넓어진 세상에서 태산이의 음악과 말로 용기를 얻으며 살고 있어요.<br></br>
        이렇게 누군가의 생일을 함께 축하하며 8월 10일을 기억하게 된 것도 좋고요.<br></br>
        <br></br>
        여러분도 태산이를, 보넥도를 좋아하며 얻는 즐거움과 벅찬 마음을 다양한 방식으로 간직하고 소중히 하시길
        진심으로 바라고 응원합니다.<br></br>
        이 글을 발견하신 분들도, 발견하지 못한 분들도 모두 행복한 하루 보내시길 바라요!<br></br><br></br>
        하나<br></br>
        둘<br></br>
        셋<br></br>
        떵꺼양아생일축하해
    </div>
  );
}


