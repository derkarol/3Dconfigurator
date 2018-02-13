
//const THREE = require('./three.js');
let controls = require('./OrbitControls.js');
// let sphere = require('./anySphere.js');
//const THREE = require("THREE");
//let texture = require('./textures.js');
const metalTexture = require('./bump.js');
let THREEx = require('./threex.windowresize.js');

//let camera = require('./OrbitControls.js');

function init() {
  var scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000);
  var spotLight_01 = getSpotlight('rgb(145, 200, 255)', 1);
  var spotLight_02 = getSpotlight('rgb(255, 220, 180)', 1);

  spotLight_01.name = 'spotLight_01';
  spotLight_02.name = 'spotLight_02';

  // create geometric objects
  var plane = getPlane(50, 50);
  var sphere = getSphere(1);
  sphere.name = 'sphere';

  // var villa = getVilla(scene);
  // add objects to the scene

  //scene.add(sphere);
  scene.add(plane);
  scene.add(spotLight_01);
  scene.add(spotLight_02);

  // transform objects
  camera.position.x = 0;
  camera.position.y = 6;
  camera.position.z = 6;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  spotLight_01.position.x = 6;
  spotLight_01.position.y = 8;
  spotLight_01.position.z = -20;

  spotLight_02.position.x = -12;
  spotLight_02.position.y = 6;
  spotLight_02.position.z = -10;

  plane.rotation.x = Math.PI/2;

  sphere.position.y = sphere.geometry.parameters.radius;

  // material adjustments
  var planeMaterial = plane.material;
  planeMaterial.roughness = 0.65;
  planeMaterial.metalness = 0.75;

    //?<O>O>? i mooved it to textures.js
   let textureLoader = new THREE.TextureLoader();
   //let texture = textureLoader.load(getTexture());
   let texture = require('./textures.js');
   planeMaterial.map = texture;

  var repetition = 6;
  var textures = [1, 1];
  // ['map']// we will add 'bumpMap' and 'roughnessMap'
  // textures.forEach((mapName) => {
  //   planeMaterial[mapName].wrapS = THREE.RepeatWrapping;
  //   planeMaterial[mapName].wrapT = THREE.RepeatWrapping;
  //   planeMaterial[mapName].repeat.set(repetition, repetition);
  // });
  //?<O>O>? I mooved it to bump.js
  //var sphereMaterial = sphere.material;
  // let metalTexture = textureLoader.load(getBumpMap());//?<O>O> shouldnt it be bumpMap

  let sphereMaterial = sphere.material;//?<O>O>? to anySphere.js?
  sphereMaterial.bumpMap = metalTexture;
  sphereMaterial.roughnessMap = metalTexture;
  sphereMaterial.bumpScale = 0.01;
  sphereMaterial.roughness = 0.75;
  sphereMaterial.metalness = 0.25;

//  var villaMaterial = villa.material;
//  villMaterial.roughness = 0.65;
//  villeMaterial.metalness = 0.75;

  let renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  document.getElementById('webgl').appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // let controls = new THREE.OrbitControls(camera, renderer.domElement);
  let controls = require('./OrbitControls.js');
  // var winResize = new THREEx.WindowResize(renderer, camera);
  update(renderer, scene, camera);
}

// function getVilla(scene) {
//   var loader = new THREE.JSONLoader();
//   loader.load('models/VVH01.json', function(geo) {
//       mesh = new THREE.Mesh(geo);
// //      mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
//       //mesh.translation = THREE.GeometryUtils.center(geo);
//       var material = new THREE.MeshStandardMaterial({
//         color: 0xffffff,
//   });
//       var mesh = new THREE.Mesh(geo, material);
//       scene.add(mesh);
//   });
// }

function getSphere(radius) {
  var geo = new THREE.SphereGeometry(radius, 24, 24);
  var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  var mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  return mesh;
}

function getPlane(w, h) {
  var geo = new THREE.PlaneGeometry(w, h);
  var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  return mesh;
}

function getSpotlight(color, intensity) {
  var light = new THREE.SpotLight(color, intensity);
  light.castShadow = true;
  light.shadow.mapSize.x = 4096;
  light.shadow.mapSize.y = 4096;
  return light;
}
 let control = document.getElementById("length");
 function darken(){
   return control.value;
    };
function update(renderer, scene, camera) {
  var spotLight_01 = scene.getObjectByName('spotLight_01');
  spotLight_01.intensity = (darken() - 1.5) * 0.015;
  spotLight_01.intensity = spotLight_01.intensity;
  var spotLight_02 = scene.getObjectByName('spotLight_02');
  spotLight_02.intensity = (darken() - 1.5) * 0.015;
  spotLight_02.intensity = Math.abs(spotLight_02.intensity);
  renderer.render(scene, camera);
  requestAnimationFrame(function() {
    update(renderer, scene, camera);
  })
}

init();
console.log(darken());
getTexture();
getBumpMap();
