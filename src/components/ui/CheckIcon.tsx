type TCheckIconProps = { className?: string };

/**
 * Каліграфічна галочка — як на WP (там вона растрова, тут перемальована у вектор,
 * тож лишається чіткою на будь-якому екрані). Колір — currentColor.
 */
export function CheckIcon({ className }: TCheckIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      role="presentation"
      className={className}
    >
      <path d="M18 243C85 248 140 280 176 330C260 189 378 92 488 32C497 27 503 37 496 44C380 144 270 298 186 468C180 481 170 481 164 468C124 380 74 302 16 254C10 249 11 242 18 243Z" />
    </svg>
  );
}
