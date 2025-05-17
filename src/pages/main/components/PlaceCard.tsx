import { useNavigate } from 'react-router-dom';
import PlaceImage from '@/shared/assets/images/place-image.jpg';

interface PlaceCardProps {
  id: string; // 장소 ID (상세 페이지 이동용)
  imageUrl?: string; // 장소 이미지
  title: string; // 장소 이름 (예: "장소명 디미데이터")
  location: string; // 위치 (예: "지역")
  tag: string; // 평가 태그 (예: "평가칩")
  positivePercent: number; // 긍정적 반응 퍼센트
  negativePercent: number; // 부정적 반응 퍼센트
  voteState: 'none' | 'positive' | 'negative'; // 투표 상태
  isSelected?: boolean; // 현재 선택된 장소인지 여부 (지도에서 선택 시)
  onVote?: (id: string, isPositive: boolean) => void; // 투표 기능
  activateStamp?: (type: 'yes' | 'no') => void; // 도장 활성화 함수
}

const PlaceCard = ({
  id,
  imageUrl,
  title,
  location,
  tag,
  positivePercent,
  negativePercent,
  voteState,
  isSelected = false,
  onVote,
  activateStamp,
}: PlaceCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };

  const handlePositiveVote = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (voteState !== 'positive') {
      onVote && onVote(id, true);
      activateStamp && activateStamp('yes');
    }
  };

  const handleNegativeVote = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (voteState !== 'negative') {
      onVote && onVote(id, false);
      activateStamp && activateStamp('no');
    }
  };

  // 투표 중인 상태인지 확인
  const isVoting = voteState === 'positive' || voteState === 'negative';

  return (
    <div 
      onClick={handleCardClick} 
      className="flex flex-col items-start w-[343px] p-3 gap-3 flex-shrink-0 cursor-pointer"
      style={{ 
        display: 'flex',
        width: '343px',
        padding: '12px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
        flexShrink: 0,
        borderRadius: '12px',
        background: '#FFF'
      }}
    >
      {/* 장소 정보 섹션 */}
      <div className="flex items-center w-full">
        {/* 장소 이미지 */}
        <img 
          className="w-16 h-16 rounded-lg mr-3" 
          src={PlaceImage} 
          alt={title} 
        />
        
        {/* 장소 정보 */}
        <div className="flex flex-col">
          <div className="text-black text-base font-bold">
            {title}
          </div>
          <div className="text-zinc-500 text-xs">
            {location}
          </div>
          <div className="mt-1">
            <span className="px-2 py-1 bg-teal-400 rounded text-white text-xs">
              {tag}
            </span>
          </div>
        </div>
      </div>
      
      {/* 버튼 섹션 */}
      <div className="flex w-full gap-2">
        {/* "아니어유?" 버튼 */}
        {voteState === 'negative' ? (
          // 부정 투표 선택 상태 - 활성화된 아니어유 버튼
          <button 
            onClick={handleNegativeVote}
            className="flex-1 py-2 bg-teal-400 text-center text-sky-100 text-xs font-bold"
            style={{ borderRadius: '12px' }}
          >
            아니어유? ({negativePercent}%)
          </button>
        ) : (
          // 기본 상태 또는 긍정 투표 선택 상태
          <button 
            onClick={handleNegativeVote}
            className={`flex-1 py-2 ${voteState === 'positive' ? 'bg-gray-400 text-gray-300' : 'bg-sky-100 text-teal-400'} text-center text-xs ${voteState === 'positive' ? 'font-medium' : 'font-semibold'}`}
            style={{ borderRadius: '12px' }}
          >
            {voteState === 'positive' ? `아니어유? (${negativePercent}%)` : '아니어유?'}
          </button>
        )}
        
        {/* "맞아유..." 버튼 */}
        {voteState === 'positive' ? (
          // 긍정 투표 선택 상태 - 활성화된 맞아유 버튼
          <button 
            onClick={handlePositiveVote}
            className="flex-1 py-2 bg-violet-600 text-center text-purple-100 text-xs font-bold"
            style={{ borderRadius: '12px' }}
          >
            맞아유... ({positivePercent}%)
          </button>
        ) : (
          // 기본 상태 또는 부정 투표 선택 상태
          <button 
            onClick={handlePositiveVote}
            className={`flex-1 py-2 ${voteState === 'negative' ? 'bg-gray-400 text-gray-300' : 'bg-purple-100 text-violet-600'} text-center text-xs ${voteState === 'negative' ? 'font-medium' : 'font-semibold'}`}
            style={{ borderRadius: '12px' }}
          >
            {voteState === 'negative' ? `맞아유... (${positivePercent}%)` : '맞아유...'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceCard; 