import { useEffect } from 'react';

const useReveal = (selector = '.reveal-item', threshold = 0.1) => {
  useEffect(() => {
    const observerOptions = {
      threshold,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, we can stop observing
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold]);
};

export default useReveal;
