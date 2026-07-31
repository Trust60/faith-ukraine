/**
 * Фонове YouTube-відео головної. Параметри — ті самі, що на WP: autoplay без звуку,
 * зациклено (loop потребує playlist з тим самим id), без контролів і брендингу.
 */
const YOUTUBE_BASE = "https://www.youtube.com/embed";

const buildSrc = (id: string, extra: Record<string, string>) => {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...extra,
  });
  return `${YOUTUBE_BASE}/${id}?${params.toString()}`;
};

/** Секція «Насичення шкіри колагеном» — заголовок, підзаголовок і відео 16/9. */
export const DELIVERY_SECTION = {
  heading: "Насичення шкіри колагеном, прицільна доставка компонентів",
  subheading: "Унікальна система транспорту компонентів в глибокі шари шкіри.",
  video: {
    src: buildSrc("WdqeL5tUILQ", { start: "122", end: "205" }),
    title: "Система прицільної доставки компонентів FAITH",
  },
} as const;
