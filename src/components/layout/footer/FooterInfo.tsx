import Image from "next/image";
import { ContactRow } from "./ContactRow";
import { SocialLink } from "./SocialLink";
import {
  CONTACTS,
  DISTRIBUTOR,
  MANUFACTURER,
  SOCIAL_LINKS,
} from "./footer-config";

/** Ліва колонка футера: дистриб'ютор, контакти, виробник, соцмережі. */
export function FooterInfo() {
  return (
    <div className="flex flex-col gap-8 text-ink">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Image
          src="/footer-logo.webp"
          alt="FAITH Ukraine Distribution"
          width={72}
          height={72}
          sizes="72px"
          className="size-16 lg:size-18"
        />
        <div>
          <p className="font-serif text-lg text-ink-soft sm:text-base">
            {DISTRIBUTOR.title}
          </p>
          <p className="text-sm">{DISTRIBUTOR.subtitle}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        {CONTACTS.map((item) => (
          <li key={item.label}>
            <ContactRow item={item} />
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-lg text-ink-soft">
          {MANUFACTURER.heading}
        </h2>
        <p className="max-w-sm text-sm leading-relaxed">
          {MANUFACTURER.address}
        </p>
      </div>

      <ul className="flex items-center gap-4">
        {SOCIAL_LINKS.map((item) => (
          <li key={item.label}>
            <SocialLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
