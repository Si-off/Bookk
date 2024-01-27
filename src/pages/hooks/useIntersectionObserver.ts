import { useEffect, useRef } from 'react';

type Options = {
  root?: Element | Document;
  rootMargin?: string;
  threshold?: number;
};

const useIntersectionObserver = (callback: () => void, options?: Options) => {
  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (target && target.current) {
      const intersectionObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              callback();
            }
          });
        },
        { ...options },
      );
      intersectionObserver.observe(target.current);
      return () => {
        intersectionObserver.disconnect();
      };
    }
  }, [target, callback, options]);

  return target;
};

export default useIntersectionObserver;
