export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.05] mix-blend-overlay"
    >
      <svg
        className="noise-layer h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4"
        style={{ animation: "noise-shift 9s steps(8) infinite" }}
      >
        <filter id="jcm-noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#jcm-noise-filter)" />
      </svg>
    </div>
  );
}
