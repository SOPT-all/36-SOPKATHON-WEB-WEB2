import type { LocationDetail } from '@/shared/constants/mockData';
import PlaceCard from './PlaceCard';

interface PlaceCardListProps {
  places: LocationDetail[];
  selectedPlaceId: string | null;
  voteState: 'none' | 'positive' | 'negative';
  onVote: (type: 'positive' | 'negative') => void;
  activateStamp: (type: 'yes' | 'no') => void;
}

export default function PlaceCardList({
  places,
  selectedPlaceId,
  voteState,
  onVote,
  activateStamp,
}: PlaceCardListProps) {
  // 선택된 장소만 찾아서 표시
  const selectedPlace = selectedPlaceId
    ? places.find(place => place.id === selectedPlaceId)
    : places[0]; // 선택된 장소가 없으면 첫 번째 장소 표시

  // 선택된 장소가 없으면 아무것도 표시하지 않음
  if (!selectedPlace) {
    return null;
  }

  return (
    <div className="fixed bottom-2 mb-[44px] left-0 right-0 flex justify-center z-10">
      <PlaceCard
        id={selectedPlace.id}
        title={selectedPlace.title}
        location={selectedPlace.location}
        tag={selectedPlace.tag}
        positivePercent={selectedPlace.positivePercent}
        negativePercent={selectedPlace.negativePercent}
        voteState={voteState}
        onVote={onVote}
        activateStamp={activateStamp}
        reviews={selectedPlace.reviews}
        imageUrl={selectedPlace.imageUrl}
      />
    </div>
  );
}
