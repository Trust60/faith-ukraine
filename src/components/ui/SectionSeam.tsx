import type { ReactNode } from "react";

type TSectionSeamProps = {
  children: ReactNode;
};

/**
 * Обгортка секції з тінню-затемненням на верхньому стику — як на сторінці «Партнери».
 * Градієнт сидить НАД секцією (bottom-full) і згасає вгору (to-t): найтемніший на самому
 * стику, світлішає в бік попередньої секції й не лягає на контент цієї. pointer-events-none,
 * aria-hidden — суто декоративний.
 */
export function SectionSeam({ children }: TSectionSeamProps) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-full h-5 bg-linear-to-t from-black/10 to-transparent"
      />
      {children}
    </div>
  );
}
