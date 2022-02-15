import { useEffect } from 'react'

export const useClickOutside = (
  insideRefs: any[],
  isVisible: any,
  onClose: () => void,
) => {
  useEffect(() => {
    const handleWindowClick = (event: { target: any; }) => {
      const someRefContainTarget = insideRefs
        .filter((ref: { current: any; }) => ref.current)
        .some((ref: { current: { contains: (arg0: any) => any; }; }) => ref.current.contains(event.target));

      if (someRefContainTarget) {
        return;
      }

      if (!isVisible) {
        return;
      }

      if (onClose) {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener('click', handleWindowClick);
    }

    return () => {
      if (isVisible) {
        window.removeEventListener('click', handleWindowClick);
      }
    };
  }, [isVisible, onClose]);
};