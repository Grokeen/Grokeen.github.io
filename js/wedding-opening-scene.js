import * as THREE from "./vendor/three-r186/three.module.js";
import { openingState } from "./wedding-opening-state.js";

export function createOpeningScene() {
  const scene = new THREE.Scene();
  const stage = new THREE.Group();
  scene.add(stage);
  const materials = {};
  function material(name, color, roughness = .72, metalness = 0) {
    if (!materials[name]) materials[name] = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    return materials[name];
  }
  const skin = material("skin", "#e9bc9a");
  const ivory = material("ivory", "#fff6e4");
  const hair = material("hair", "#322724");
  const suit = material("suit", "#39433d");
  const shirt = material("shirt", "#f8f6ec");
  const leaf = material("leaf", "#859b71");
  const gold = material("gold", "#bda66e", .45, .45);
  const pink = material("pink", "#d7a292");
  const dark = material("dark", "#302b27");
  const sphereGeometry = new THREE.SphereGeometry(1, 20, 16);
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 12);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  function mesh(parent, geometry, mat, position, scale) {
    const object = new THREE.Mesh(geometry, mat);
    if (position) object.position.set(...position);
    if (scale) object.scale.set(...scale);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function ball(parent, mat, position, scale) { return mesh(parent, sphereGeometry, mat, position, scale); }
  function segment(object, from, to, radius) {
    direction.subVectors(to, from);
    object.position.copy(from).add(to).multiplyScalar(.5);
    object.scale.set(radius, direction.length(), radius);
    object.quaternion.setFromUnitVectors(yAxis, direction.normalize());
  }

  const platform = mesh(stage, new THREE.CylinderGeometry(3.5, 3.65, .16, 80), material("stone", "#e9e3d3"), [0, -.09, 0]);
  platform.receiveShadow = true;
  const rim = mesh(stage, new THREE.TorusGeometry(3.5, .025, 8, 100), gold, [0, .015, 0]);
  rim.rotation.x = Math.PI / 2;
  materials.floor = new THREE.ShadowMaterial({ color: "#596448", opacity: .16 });
  const floor = mesh(scene, new THREE.PlaneGeometry(160, 160), materials.floor, [0, -.19, 0]);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;

  function person(bride) {
    const root = new THREE.Group();
    root.position.x = bride ? -1.5 : 1.5;
    root.rotation.y = bride ? Math.PI / 2 : -Math.PI / 2;
    stage.add(root);
    if (bride) {
      const profile = [[.68, .1], [.76, .18], [.64, .55], [.46, 1.1], [.29, 1.6], [.26, 1.72]].map(([r, y]) => new THREE.Vector2(r, y));
      mesh(root, new THREE.LatheGeometry(profile, 48), ivory);
      ball(root, ivory, [0, 1.96, 0], [.3, .46, .23]);
      mesh(root, new THREE.TorusGeometry(.285, .028, 8, 32), gold, [0, 1.65, 0]).rotation.x = Math.PI / 2;
      ball(root, ivory, [0, .12, -.48], [.56, .07, .65]);
      // A flowing veil remains visible when the camera reaches the rear of the couple.
      ball(root, material("veil", "#eee5d8"), [0, 2.03, -.25], [.35, .62, .08]);
    } else {
      [-.16, .16].forEach(x => {
        ball(root, suit, [x, .8, 0], [.14, .72, .15]);
        ball(root, dark, [x, .13, .07], [.15, .12, .24]);
      });
      mesh(root, new THREE.CylinderGeometry(.32, .27, .95, 24), suit, [0, 1.98, 0]);
      mesh(root, new THREE.BoxGeometry(.21, .67, .035), shirt, [0, 2.07, .29]);
      ball(root, gold, [0, 2.32, .325], [.09, .045, .035]);
      [-.13, .13].forEach(x => {
        const lapel = mesh(root, new THREE.BoxGeometry(.09, .42, .05), suit, [x, 2.2, .32]);
        lapel.rotation.z = x < 0 ? -.18 : .18;
      });
      [1.78, 1.94].forEach(y => ball(root, gold, [.06, y, .288], [.018, .018, .012]));
    }
    ball(root, skin, [0, 2.47, 0], [.11, .2, .11]);
    const head = new THREE.Group();
    head.position.y = 2.8;
    root.add(head);
    ball(head, skin, [0, 0, 0], [.28, .32, .27]);
    mesh(head, new THREE.SphereGeometry(.29, 24, 16, Math.PI, Math.PI), hair, [0, .015, -.015], [1, 1.1, 1]);
    mesh(head, new THREE.SphereGeometry(.3, 24, 12, 0, Math.PI * 2, 0, 1.08), hair, [0, .025, 0], [1, 1.1, 1]);
    [-1, 1].forEach(side => {
      ball(head, skin, [side * .272, -.035, 0], [.045, .08, .045]);
      ball(head, dark, [side * .095, .015, .247], [.022, .029, .015]);
      ball(head, pink, [side * .155, -.075, .218], [.05, .026, .014]);
      if (bride) ball(head, gold, [side * .274, -.104, .015], [.022, .03, .022]);
    });
    ball(head, skin, [0, -.04, .268], [.035, .04, .045]);
    const smile = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-.065, -.13, .239), new THREE.Vector3(0, -.168, .28), new THREE.Vector3(.065, -.13, .239));
    mesh(head, new THREE.TubeGeometry(smile, 12, .009, 5, false), dark);
    if (bride) {
      ball(head, hair, [0, -.04, -.285], [.16, .15, .14]);
      for (let i = 0; i < 5; i++) ball(head, ivory, [(i - 2) * .055, .23 + Math.sin(i) * .012, -.19], [.025, .026, .025]);
    } else {
      const fringe = ball(head, hair, [-.04, .21, .15], [.24, .09, .11]);
      fringe.rotation.z = .18;
    }
    const arms = [-1, 1].map(side => {
      const upper = mesh(root, cylinderGeometry, bride ? skin : suit);
      const lower = mesh(root, cylinderGeometry, bride ? skin : suit);
      const elbow = ball(root, bride ? skin : suit, [0, 0, 0], [.115, .115, .115]);
      const hand = ball(root, skin, [0, 0, 0], [.105, .12, .095]);
      const cuff = bride ? null : ball(root, shirt, [0, 0, 0], [.112, .07, .105]);
      return { side, upper, lower, elbow, hand, cuff };
    });
    return { root, head, arms };
  }
  const bride = person(true);
  const groom = person(false);
  const bouquet = new THREE.Group();
  stage.add(bouquet);
  const ribbon = new THREE.Group();
  bouquet.add(ribbon);
  for (let i = 0; i < 7; i++) {
    const angle = i * Math.PI * 2 / 7;
    const x = i === 0 ? 0 : Math.cos(angle) * .18;
    const z = i === 0 ? 0 : Math.sin(angle) * .18;
    const y = .33 + (i === 0 ? .08 : Math.sin(i) * .025);
    const stem = mesh(bouquet, cylinderGeometry, leaf);
    segment(stem, new THREE.Vector3(0, -.13, 0), new THREE.Vector3(x, y, z), .017);
    for (let petal = 0; petal < 5; petal++) {
      const theta = petal * Math.PI * 2 / 5;
      ball(bouquet, i % 4 === 0 ? pink : ivory, [x + Math.cos(theta) * .065, y, z + Math.sin(theta) * .065], [.065, .045, .065]);
    }
    ball(bouquet, gold, [x, y + .015, z], [.028, .024, .028]);
    const green = ball(bouquet, leaf, [x * 1.4, y - .08, z * 1.4], [.045, .13, .035]);
    green.rotation.z = angle;
  }
  mesh(bouquet, new THREE.TorusGeometry(.065, .026, 8, 20), ivory, [0, .045, 0]).rotation.x = Math.PI / 2;
  [-1, 1].forEach(side => {
    const tail = mesh(ribbon, new THREE.BoxGeometry(.05, .28, .02), ivory, [side * .07, -.12, 0]);
    tail.rotation.z = side * .25;
  });

  // Sparse sculpted garden details leave the full orbit and the bouquet readable.
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3 + .2;
    const tree = new THREE.Group();
    tree.position.set(Math.cos(angle) * 5.4, -.17, Math.sin(angle) * 5.4);
    stage.add(tree);
    mesh(tree, new THREE.CylinderGeometry(.055, .09, 1.55, 8), material("wood", "#a8997b"), [0, .77, 0]);
    const green = material("canopy" + (i % 2), i % 2 ? "#a6b693" : "#91a37e");
    ball(tree, green, [0, 1.88, 0], [.53, .73, .47]);
    ball(tree, green, [-.3, 1.63, .06], [.36, .46, .34]);
    ball(tree, green, [.3, 1.72, -.03], [.33, .49, .35]);
  }
  scene.add(new THREE.HemisphereLight("#fffaf0", "#bac2a4", 2.6));
  const sunlight = new THREE.DirectionalLight("#fff5df", 3.2);
  sunlight.position.set(4, 8, 5);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1024, 1024);
  sunlight.shadow.camera.left = -6;
  sunlight.shadow.camera.right = 6;
  sunlight.shadow.camera.top = 6;
  sunlight.shadow.camera.bottom = -6;
  sunlight.shadow.normalBias = .04;
  scene.add(sunlight);
  const fill = new THREE.DirectionalLight("#eef2e5", 1.2);
  fill.position.set(-4, 4, -5);
  scene.add(fill);

  function moveArms(person, hands) {
    person.arms.forEach(arm => {
      const shoulder = new THREE.Vector3(arm.side * .3, 2.27, 0);
      const wrist = new THREE.Vector3(arm.side * .105, hands.y, hands.z);
      const elbow = new THREE.Vector3(arm.side * .35, (2.27 + hands.y) / 2 - .12, hands.z * .48);
      segment(arm.upper, shoulder, elbow, .115);
      segment(arm.lower, elbow, wrist, .095);
      arm.elbow.position.copy(elbow);
      arm.hand.position.copy(wrist);
      if (arm.cuff) arm.cuff.position.copy(wrist).lerp(elbow, .12);
    });
  }
  function apply(progress) {
    const state = openingState(progress);
    moveArms(bride, state.brideHands);
    moveArms(groom, state.groomHands);
    bride.head.rotation.x = state.phase === 2 ? -.12 : 0;
    groom.head.rotation.x = state.phase === 2 ? -.18 : 0;
    bouquet.position.set(state.bouquet.x, state.bouquet.y, state.bouquet.z);
    bouquet.rotation.set(.1, state.bouquetSpin, Math.sin(state.bouquetSpin) * .25);
    ribbon.rotation.z = Math.sin(state.bouquetSpin) * .25;
    scene.updateMatrixWorld(true);
    return state;
  }
  function frameCamera(camera, aspect, progress) {
    const state = openingState(progress);
    camera.aspect = aspect;
    // Fit the pair and the high arc even on narrow portrait displays.
    const radius = Math.max(9.4, 3.25 / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect));
    camera.position.set(Math.sin(state.cameraAngle) * radius, 4.8, Math.cos(state.cameraAngle) * radius);
    camera.lookAt(0, 1.9, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
  }
  function dispose() {
    const geometries = new Set();
    scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); });
    geometries.forEach(geometry => geometry.dispose());
    Object.values(materials).forEach(mat => mat.dispose());
    sunlight.shadow.dispose();
  }
  apply(0);
  return { scene, bride, groom, bouquet, apply, frameCamera, dispose };
}
