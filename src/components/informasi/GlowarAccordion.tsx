
import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconTitleRow } from "@/components/ui/IconTitleRow";
import { LucideIcon } from "lucide-react";

interface AccordionItemData {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string;
  iconColor?: string;
}

interface GlowarAccordionProps {
  items: AccordionItemData[];
}

export const GlowarAccordion: React.FC<GlowarAccordionProps> = ({ items }) => {
  const accordionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(Flip);
    
    const ctx = gsap.context(() => {
      // Animate accordion items on scroll
      gsap.from(".accordion-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: accordionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, accordionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={accordionRef} className="w-full">
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="accordion-item border border-white/10 rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline group">
              <IconTitleRow
                icon={item.icon}
                iconColor={item.iconColor || "bg-amethyst text-background"}
                title={item.title}
                className="flex-1"
              />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="pt-2 text-foreground/80 font-sans leading-relaxed border-t border-white/10 mt-2">
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
