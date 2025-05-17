import type { ReactNode } from 'react';
import { Header } from '@/shared/components';

interface MobileLayoutProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  children: ReactNode;
}

const MobileLayout = ({ 
  title, 
  showBackButton = true, 
  onBackClick, 
  children 
}: MobileLayoutProps) => {
  return (
    <div className="w-96 h-[667px] relative bg-white overflow-hidden">

      {/* Header with back button */}
      <div className="w-full pt-14">
        <Header 
          title={title} 
          showBackButton={showBackButton} 
          onBackClick={onBackClick} 
        />
      </div>

      {/* Content Area */}
      <div className="mt-4 px-4">
        {children}
      </div>

    </div>
  );
};

export default MobileLayout; 