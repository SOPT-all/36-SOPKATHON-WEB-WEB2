import NaverMap from '@/shared/components/NaverMap';

const MainPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-[23.4375rem] h-[41.6875rem] mx-auto flex-shrink-0">
        <NaverMap useCurrentLocation={true} className="w-full h-full" />
      </div>
    </div>
  );
};

export default MainPage;
