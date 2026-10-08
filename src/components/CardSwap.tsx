'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useMemo,
  useEffect
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  cardDistance?: number;
  verticalDistance?: number;
  activeIndex?: number;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  href?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, href, children, ...rest }, ref) => {
  const content = (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-0 right-0 lg:right-0 w-full h-full rounded-2xl border border-zinc-700/60 bg-zinc-800 text-white shadow-2xl overflow-hidden cursor-pointer group transition-all duration-500 ease-out transform-gpu ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {content}
      </a>
    );
  }

  return content;
});
Card.displayName = 'Card';

const CardSwap: React.FC<CardSwapProps> = ({
  cardDistance = 20,
  verticalDistance = 15,
  activeIndex = 0,
  children
}) => {
  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  useEffect(() => {
    if (refs.length === 0) return;

    const total = refs.length;

    refs.forEach((r, i) => {
      const el = r.current;
      if (!el) return;

      if (i < activeIndex) {
        gsap.to(el, {
          y: -120,
          x: 30,
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          ease: 'power2.out',
          zIndex: 0
        });
      } else {
        const relIdx = i - activeIndex;
        gsap.to(el, {
          x: relIdx * cardDistance,
          y: relIdx * verticalDistance,
          scale: 1 - relIdx * 0.04,
          opacity: 1 - relIdx * 0.18,
          duration: 0.5,
          ease: 'power2.out',
          zIndex: total - relIdx
        });
      }
    });
  }, [activeIndex, refs, cardDistance, verticalDistance]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i]
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div className="relative w-full max-w-[500px] mx-auto h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] transform-gpu">
      {rendered}
    </div>
  );
};

export default CardSwap;