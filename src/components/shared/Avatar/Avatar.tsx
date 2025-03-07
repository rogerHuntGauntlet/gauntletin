import React from 'react';
import Image from 'next/image';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  const avatarClasses = [
    styles.avatar,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  // If no image is provided, show initials
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!src) {
    return (
      <div className={`${avatarClasses} ${styles.initialsAvatar}`}>
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <div className={avatarClasses}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`(max-width: 768px) 100vw, ${getSizeInPixels(size)}px`}
        className={styles.image}
      />
    </div>
  );
};

// Helper function to get size in pixels
function getSizeInPixels(size: string): number {
  switch (size) {
    case 'xs': return 24;
    case 'sm': return 32;
    case 'md': return 48;
    case 'lg': return 64;
    case 'xl': return 96;
    default: return 48;
  }
} 