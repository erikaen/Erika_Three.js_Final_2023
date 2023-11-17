import "./style.css";
import * as THREE from "three";

let camera, scene, renderer;
let mesh, mesh2;

// app
const app = document.querySelector("#app");

init();
animate();

// add texture loader
function init() {
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth / 2, window.innerWidth / 2);
  renderer.setPixelRatio(2);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 10);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('https://s33.postimg.cc/zaty10vot/out.png');
  const texture2 = textureLoader.load('https://s33.postimg.cc/x69kzy9hp/middle.png');

  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true });

  const geometry = new THREE.SphereGeometry(9.98, 50, 50);
  mesh = new THREE.Mesh(geometry, material);

  const geometry2 = new THREE.SphereGeometry(10, 50, 50);
  mesh2 = new THREE.Mesh(geometry2, material2);

  mesh2.rotation.y = -Math.PI / 2;
  mesh.rotation.y = -Math.PI / 2;

  scene.add(mesh2);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

document.addEventListener("mousemove", function (event) {
  const pos = (((360 * (event.pageX - window.innerWidth / 2) / window.innerWidth) * Math.PI) / 180) / 2 - Math.PI / 2;
  const pos2 = ((360 * (event.pageY - window.innerHeight / 8) / window.innerHeight) * Math.PI) / 180 - Math.PI / 2;

  mesh2.rotation.y = -pos - Math.PI;
  mesh.rotation.y = pos;
  mesh2.rotation.x = pos2 / 10;
  mesh.rotation.x = pos2 / 10;
});

document.addEventListener("touchmove", function (event) {
  event.preventDefault();

  const touchX = event.touches[0].pageX;
  const touchY = event.touches[0].pageY;

  const pos = (((360 * (touchX - window.innerWidth / 2) / window.innerWidth) * Math.PI) / 180) / 2 - Math.PI / 2;
  const pos2 = ((360 * (touchY - window.innerHeight / 8) / window.innerHeight) * Math.PI) / 180 - Math.PI / 2;

  mesh2.rotation.y = -pos - Math.PI;
  mesh.rotation.y = pos;
  mesh2.rotation.x = pos2 / 10;
  mesh.rotation.x = pos2 / 10;
});


function render() {
  mesh2.rotation.y -= 0.0009;
  mesh.rotation.y += 0.0009;
  renderer.render(scene, camera);
}
