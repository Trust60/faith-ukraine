import { Container } from "@/ui/Container";
import { FramedImage } from "@/ui/FramedImage";
import { GALLERY } from "./content/cooperation-content";

/** Галерея фото з кабінетів партнерів: смуга з чотирьох знімків (2 колонки на мобільному). */
export function ProfessionalsGallery() {
  return (
    <Container>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {GALLERY.images.map((image) => (
          <li key={image.src}>
            <FramedImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="aspect-[3/4] rounded-[16px]"
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}
