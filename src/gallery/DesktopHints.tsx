/** Subtle keyboard hints for desktop visitors. */
export function DesktopHints() {
  return (
    <div className="gr-hints" aria-hidden="true">
      <span>
        <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> / <kbd>↑</kbd> <kbd>←</kbd> <kbd>↓</kbd> <kbd>→</kbd> jalan
      </span>
      <span>gerakkan mouse / drag untuk melihat</span>
      <span>klik lukisan untuk info</span>
      <span>
        <kbd>ESC</kbd> lepas kursor
      </span>
    </div>
  )
}
