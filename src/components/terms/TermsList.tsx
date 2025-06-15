
import React from "react";

interface TermsListProps {
  items: string[];
}

export const TermsList: React.FC<TermsListProps> = ({ items }) => {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-amethyst/60 mt-2 flex-shrink-0"></span>
          <span className="text-sm md:text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
};
