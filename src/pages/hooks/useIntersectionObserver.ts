import { useEffect, useRef } from 'react';

type Options = {
  root: Element | Document;
  rootMargin: string;
  threshold: number;
};

interface Params {
  callback: () => void;
  options?: Options;
}

const useIntersectionObserver = ({ callback, options }: Params) => {
  const target = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!target.current || !target) return;

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
  }, [target, callback]);

  return target;
};

export default useIntersectionObserver;
