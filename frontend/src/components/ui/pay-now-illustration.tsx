import React from 'react';

interface PayNowIllustrationProps {
  width?: number;
  height?: number;
  className?: string;
}

export const PayNowIllustration: React.FC<PayNowIllustrationProps> = ({
  width = 200,
  height = 150,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/pay_now.svg" 
        alt="Pay Now Illustration"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
};
