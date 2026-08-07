'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

function AccordionColumn({
  items,
  openId,
  onToggle,
  baseId,
}: {
  items: AccordionItem[];
  openId: string | null;
  onToggle: (id: string) => void;
  baseId: string;
}) {
  return (
    <div className="border-t border-stone-200">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="border-b border-stone-200">
            <h2>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-amber-700"
              >
                <span className="font-tenor text-lg tracking-tight text-stone-900 sm:text-xl">
                  {item.title}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-stone-400 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`pb-8 text-stone-600 leading-relaxed ${isOpen ? '' : 'invisible'}`}
                  aria-hidden={!isOpen}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductAccordion({
  leftItems,
  rightItems,
}: {
  leftItems: AccordionItem[];
  rightItems: AccordionItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <AccordionColumn
        items={leftItems}
        openId={openId}
        onToggle={toggle}
        baseId={`${baseId}-left`}
      />
      <div className="lg:border-l lg:border-stone-200 lg:pl-12 xl:pl-16">
        <AccordionColumn
          items={rightItems}
          openId={openId}
          onToggle={toggle}
          baseId={`${baseId}-right`}
        />
      </div>
    </div>
  );
}
