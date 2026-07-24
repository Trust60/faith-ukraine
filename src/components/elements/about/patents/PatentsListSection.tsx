import Image from "next/image";
import { Container } from "@/ui/Container";
import { StoryParagraph } from "../StoryParagraph";
import { PatentListItem } from "./PatentListItem";
import {
  PATENTS_LIST,
  PATENTS_LIST_CONCLUSION,
  PATENTS_LIST_INTRO,
  PATENTS_MARK,
} from "./content/patents-list-content";

/** Секція переліку патентів FAITH: вступ, нумерований список, знак ® та підсумок. */
export function PatentsListSection() {
  return (
    <section className="py-10 md:py-16">
      <Container className="[&_p]:text-justify">
        <StoryParagraph paragraph={PATENTS_LIST_INTRO} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          <ol className="list-decimal space-y-4 pl-6 text-justify marker:text-ink">
            {PATENTS_LIST.map((item, index) => (
              <PatentListItem key={index} text={item} />
            ))}
          </ol>
          <Image
            src={PATENTS_MARK.src}
            alt=""
            width={PATENTS_MARK.width}
            height={PATENTS_MARK.height}
            sizes="208px"
            aria-hidden="true"
            className="mx-auto h-auto w-32 md:w-40 lg:mx-0 lg:w-52"
          />
        </div>
        <div className="mt-10 md:mt-12">
          <StoryParagraph paragraph={PATENTS_LIST_CONCLUSION} />
        </div>
      </Container>
    </section>
  );
}
