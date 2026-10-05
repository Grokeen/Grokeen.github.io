export const clamp = (value) => Math.max(0, Math.min(1, value));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (start, end, value) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

// Every pose comes only from scroll progress, so reversing the scroll reverses the scene.
export function openingState(value) {
  const progress = clamp(value);
  let brideY, brideZ;
  if (progress < .18) {
    const windup = ease(0, .18, progress);
    brideY = lerp(1.9, 1.55, windup);
    brideZ = lerp(.5, .35, windup);
  } else if (progress < .32) {
    const lift = ease(.18, .32, progress);
    brideY = lerp(1.55, 2.6, lift);
    brideZ = lerp(.35, .65, lift);
  } else {
    const follow = ease(.32, .56, progress);
    brideY = lerp(2.6, 2.05, follow);
    brideZ = lerp(.65, .8, follow);
  }
  const reach = ease(.32, .72, progress);
  const settle = ease(.8, 1, progress);
  const groomY = lerp(1.85, 2.1, reach) - settle * .18;
  const groomZ = lerp(.3, .7, reach) - settle * .2;
  let bouquet;
  if (progress <= .32) {
    bouquet = { x: -1.5 + brideZ, y: brideY, z: 0 };
  } else if (progress < .76) {
    const flight = (progress - .32) / .44;
    bouquet = { x: lerp(-.85, .8, flight), y: lerp(2.6, 2.1, flight) + 1.65 * 4 * flight * (1 - flight), z: Math.sin(Math.PI * flight) * .16 };
  } else {
    bouquet = { x: 1.5 - groomZ, y: groomY, z: 0 };
  }
  const flight = clamp((progress - .32) / .44);
  return {
    progress, cameraAngle: Math.PI / 7 + Math.PI * 2 * progress,
    brideHands: { y: brideY, z: brideZ }, groomHands: { y: groomY, z: groomZ },
    bouquet, bouquetSpin: flight * Math.PI * 4,
    brideLean: Math.sin(progress * Math.PI) * .035,
    groomLean: Math.sin(reach * Math.PI) * -.035,
    phase: progress < .18 ? 0 : progress < .32 ? 1 : progress < .76 ? 2 : 3
  };
}
