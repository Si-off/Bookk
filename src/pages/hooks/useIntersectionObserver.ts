import { useEffect, useRef } from 'react';

type Options = {
  root: Element | Document;
  rootMargin: string;
  threshold: number;
};

const useIntersectionObserver = (callback: () => void, options?: Options) => {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (target && target.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              callback();
            }
          });
        },
        { ...options },
      );

      observer.observe(target.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [target, callback, options]);

  return target;
};

export default useIntersectionObserver;
