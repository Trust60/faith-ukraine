import { LiposomeTypeItem } from "./LiposomeTypeItem";
import type { TLiposomeType } from "./LiposomeTypeItem";

type TLiposomeTypeCardProps = {
  types: readonly TLiposomeType[];
};

/** Картка-рамка зі списком різновидів ліпосом FAITH. */
export function LiposomeTypeCard({ types }: TLiposomeTypeCardProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-ink/25 p-6 md:p-8">
      {types.map((type) => (
        <LiposomeTypeItem
          key={type.title}
          title={type.title}
          text={type.text}
          size={type.size}
        />
      ))}
    </div>
  );
}
