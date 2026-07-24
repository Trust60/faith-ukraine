import type { Metadata } from "next";
import { ExclusivitySection } from "@/components/elements/about/exclusivity/ExclusivitySection";

export const metadata: Metadata = {
  title: "Ексклюзивність FAITH — офіційні права на бренд в Україні",
  description:
    "Офіційні документи, що підтверджують ексклюзивні права на торговельну марку та дистрибуцію косметики FAITH в Україні: свідоцтво на торговельну марку та лист-авторизація від FAITH Co., Ltd.",
};

export default function ExclusivityPage() {
  return <ExclusivitySection />;
}
