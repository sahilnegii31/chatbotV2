// /**
//  * Hero visual: a slowly spinning milky-way disk with Earth in front.
//  * Earth uses an equirectangular map that scrolls so it looks like
//  * the planet is rotating on its axis.
//  */
// function EarthScene() {
//   return (
//     <div className="relative mx-auto aspect-square w-full max-w-[460px]">
//       {/* Distant galaxy — flattened disk that rotates independently of Earth */}
//       <div className="galaxy-disk pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80">
//         <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,transparent_0deg,#7c5cff55_70deg,transparent_140deg,#5eead455_210deg,transparent_280deg,#a78bfa44_330deg,transparent_360deg)] blur-2xl" />
//         <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35),rgba(124,92,255,0.12)_40%,transparent_68%)]" />
//       </div>

//       {/* Atmosphere halo */}
//       <div className="absolute inset-[8%] rounded-full bg-cyan-300/20 blur-2xl" />

//       {/* Planet */}
//       <div
//         className="earth-globe absolute inset-[12%] overflow-hidden rounded-full shadow-[inset_-28px_-10px_50px_rgba(0,0,20,0.65),0_0_80px_rgba(94,234,212,0.25)]"
//         role="img"
//         aria-label="Rotating Earth"
//       >
//         {/* Night-side shading so it reads as a sphere, not a flat disk */}
//         <div className="absolute inset-0 rounded-full bg-[linear-gradient(105deg,rgba(255,255,255,0.18)_0%,transparent_32%,rgba(0,0,0,0.55)_78%)]" />
//       </div>

//       {/* Tiny orbiting moon */}
//       <div className="absolute inset-0 animate-[spin_18s_linear_infinite]">
//         <span className="absolute left-[6%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-slate-200 shadow-[0_0_12px_white]" />
//       </div>
//     </div>
//   )
// }

// export default EarthScene
