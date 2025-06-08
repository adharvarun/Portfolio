'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useNavigationState() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle navigation from projects page to home
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link?.href.includes('/') && pathname === '/projects') {
        sessionStorage.setItem('returningFromProjects', 'true');
      }
    };

    // Add click listener
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]);
} 