import {
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionItem,
  Accordion,
} from '@chakra-ui/react';
import { useAmp } from 'next/amp';

import { FAQPageSD } from '~/components/SEO/StructuredData/FAQPage';
import type { PrimaryAccordionGroup as PrimaryAccordionGroupProps } from '~/services/cms-api/types/components/primary';

import { PrimaryRichText } from './PrimaryRichText';

export const PrimaryAccordionGroup = (
  primaryAccordionGroup: PrimaryAccordionGroupProps,
) => {
  const isAmp = useAmp();

  const accordionGroup = primaryAccordionGroup.accordion_group;
  const structuredData = accordionGroup.map(accordion => ({
    name: accordion.title,
    acceptedAnswer: {
      text: accordion.content,
    },
  }));

  return (
    <>
      <FAQPageSD mainEntity={structuredData} />

      {isAmp ? (
        accordionGroup.map(accordion => (
          <div style={{ margin: '0.5rem 0' }} key={accordion.id}>
            <strong>{accordion.title}</strong>
            <PrimaryRichText
              __component="primary.rich-text"
              rich_text={accordion.content}
              id={accordion.id}
            />
          </div>
        ))
      ) : (
        <Accordion allowMultiple defaultIndex={[]}>
          {accordionGroup.map(accordion => (
            <AccordionItem key={accordion.id}>
              <AccordionButton fontSize="1.25rem">
                <span>{accordion.title}</span>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <PrimaryRichText
                  __component="primary.rich-text"
                  rich_text={accordion.content}
                  id={accordion.id}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};
