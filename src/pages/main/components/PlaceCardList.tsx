import { useState, useEffect } from 'react';
import PlaceCard from './PlaceCard';
import type { LocationDetail } from '@/shared/constants/mockData';

interface PlaceCardListProps {
  places: LocationDetail[]; // 장소 데이터 배열
  selectedPlaceId?: string; // 지도에서 선택된 장소 ID
  voteState: 'none' | 'positive' | 'negative'; // 투표 상태
  onVote?: (id: string, isPositive: boolean) => void; // 투표 기능
  activateStamp?: (type: 'yes' | 'no') => void; // 도장 활성화 함수
}

const PlaceCardList = ({ 
  places, 
  selectedPlaceId, 
  voteState, 
  onVote, 
  activateStamp 
}: PlaceCardListProps) => {
  // 선택된 장소만 찾아서 표시
  const selectedPlace = selectedPlaceId 
    ? places.find(place => place.id === selectedPlaceId) 
    : places[0]; // 선택된 장소가 없으면 첫 번째 장소 표시

  // 선택된 장소가 없으면 아무것도 표시하지 않음
  if (!selectedPlace) {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-0 right-0 flex justify-center z-10">
      <PlaceCard
        id={selectedPlace.id}
        title={selectedPlace.title}
        location={selectedPlace.location}
        tag={selectedPlace.tag}
        positivePercent={selectedPlace.positivePercent}
        negativePercent={selectedPlace.negativePercent}
        voteState={voteState}
        isSelected={true}
        onVote={onVote}
        activateStamp={activateStamp}
      />
    </div>
  );
};

export default PlaceCardList; 