import * as Three from "three";
import backgroundTexture from "/background.jpg";
import eyeTexture from "/eye.jpg";
import membraneImage from "/membrane.png";
import nucleusImage from "/back.jpg";
import sunImage from "/sun.jpg";
import boxImage from "/box.jpg";
import colorImage from "/Color.png";
import normalMap from "/NormalGL.png";
import displacement from "/Displacement.png";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { emissive, shadow } from "three/tsl";

const loader = new Three.TextureLoader();

const scene = new Three.Scene();
const group = new Three.Group();



const col = loader.load(colorImage);
const normap = loader.load(normalMap);
const dis = loader.load(displacement);




const background = loader.load(backgroundTexture);
// background.mapping = Three.EquirectangularReflectionMapping;
scene.background = background;

const sun = loader.load(sunImage);
sun.mapping = Three.EquirectangularReflectionMapping;

const texture = loader.load(eyeTexture);
texture.mapping = Three.EquirectangularReflectionMapping;

const boxx = loader.load(boxImage);
boxx.mapping = Three.EquirectangularReflectionMapping;

const membrane = loader.load(membraneImage);
membrane.mapping = Three.EquirectangularReflectionMapping;


const nucleusTexture = loader.load(nucleusImage);
//nucleusTexture.mapping = Three.EquirectangularReflectionMapping;



const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2.3;
// camera.position.x = 1;
// camera.position.y  = -0.5;


const renderer = new Three.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new Three.SphereGeometry(2.10, 154, 154);
const material = new Three.MeshPhysicalMaterial({
    color: 'white',
    // emissive: 'lightblue',
    // emissiveIntensity: 0.5,
    metalness: 0,
    roughness: 0,
    transmission: 1, 
    thickness: 0.1,  
    ior: 1.5,   
    transparent: true,
    opacity: 1,      
    side: Three.DoubleSide,
    clearcoat: 1,
    clearcoatRoughness: 0,
   // wireframe: true
});



const sphere = new Three.Mesh(geometry, material);

const material2 = new Three.MeshPhysicalMaterial({
  color: 'white',
  emissive: 'white',
  emissiveIntensity: 0.3,
  opacity: 1,
  ior: 1.5,
  thickness: 0.1,
  map: membrane,
  side: Three.DoubleSide,
  //wireframe: true
 

});
const geometry2 = new Three.SphereGeometry(2, 164, 164);
const sphere2 = new Three.Mesh(geometry2, material2);

const material3 = new Three.MeshPhongMaterial({
  map: texture,
  
});

const irisGeometry = new Three.CircleGeometry(0.6, 64);
const iris = new Three.Mesh(irisGeometry, material3);
//iris.rotation.x = Math.PI / 2;
iris.position.set(0,0,2);


const cylinder = new Three.ConeGeometry(0.6,0.10, 64, 64, true); 
const materialc = new Three.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1, 
    thickness: 0.1,  
    ior: 1.5,        
    transparent: true,
    opacity: 1,      
    side: Three.DoubleSide,
    clearcoat: 1,
    clearcoatRoughness: 0,
});
const secondIris = new Three.Mesh(cylinder, materialc);
secondIris.rotation.x = Math.PI / 2;
secondIris.position.set(0,0,2.06);


const nucleusForm = new Three.SphereGeometry( 1, 64, 64);
const materialNucleus = new Three.MeshStandardMaterial({
  map: nucleusTexture,
  side: Three.DoubleSide,
  color:'white',
  metalness: 0,
  roughness: 0,
  transmission: 0, 
  thickness: 0.2,  
  ior: 1.5,  
  opacity: 1,      
})
const nucleus = new Three.Mesh(nucleusForm, materialNucleus);
group.add(nucleus);




const adngeo = new Three.SphereGeometry(0.97, 124, 124 ); 
const adnmaterial = new Three.MeshPhysicalMaterial( { 
  color: col, 
  map: col,
  normalMap: normap,
  displacementBias: dis, 
  displacementScale: 0.1,
  side: Three.DoubleSide,
  opacity: 1,
  metalness: 0,
  roughness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0,
  ior: 1.5,  
  thickness: 0.2,
 }  ); 
const torusKnot = new Three.Mesh( adngeo, adnmaterial ); 
group.add( torusKnot );



const irismovement = new Three.Group();
irismovement.add(iris);
group.add(irismovement);


group.add(sphere, sphere2, irismovement);
group.position.set(0,0,0);
scene.add(group);

// const light2 = new Three.SpotLight('white', 20);
// light2.position.set(4, 0, 0);
// scene.add(light2);

// const light4 = new Three.SpotLight('white',20 );
// light4.position.set(0, 1, 5);
// scene.add(light4);

const light3 = new Three. SpotLight('white', 30);
light3.position.set(0, 2, 3);
scene.add(light3);



const light4 = new Three.PointLight('white',5);
light4.position.set(0,0, 0);
scene.add(light4);



const ambientLight = new Three.AmbientLight('white', 0.2);
scene.add(ambientLight);





const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI; 
controls.minPolarAngle = 0;
controls.rotateSpeed = 0.4;
controls.zoomSpeed = 0.6;

function animate() {
  requestAnimationFrame(animate);
   controls.update();
 nucleus.rotation.x += 0.005;
 nucleus.rotation.y += 0.005;
 nucleus.rotation.z += 0.005;  
 group.rotation.z += 0.005;
 renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
