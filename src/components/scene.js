import * as THREE from 'three'
import AppUtils from '../utils/app-utils';

const STEP = 0.0009;

const rr = (min, max) => AppUtils.randomRange(min, max);


// instanciate the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x1f1f1f )
// instanciate the camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
// instanciate the mesh
// const complexGeometry = new THREE.TorusKnotBufferGeometry(10, 3, 512, 128, 2, 3);
// complexGeometry.computeVertexNormals();

const geometries = [
	new THREE.TorusKnotBufferGeometry(10, 3, 512, 128, 2, 3),
	new THREE.BoxGeometry(17, 17, 19),
	new THREE.CapsuleGeometry(10, 15, 32, 64),
	new THREE.ConeGeometry(rr(11,16), 20),
	new THREE.CylinderGeometry(rr(3,9), (3,9), 20, 64),
	new THREE.DodecahedronGeometry(rr(12,17)),
	new THREE.IcosahedronGeometry(rr(12,17)),
	new THREE.OctahedronGeometry(rr(12,17)),
	new THREE.TetrahedronGeometry(rr(12,17)),
	new THREE.TorusGeometry(15, 4, 24, 128)
];
const geometry = geometries[AppUtils.random(geometries.length)];


const normalMaterial = new THREE.MeshNormalMaterial();
normalMaterial.flatShading = false;

// const complex = new THREE.Mesh(complexGeometry, normalMaterial);
const randGeometry = new THREE.Mesh(geometry, normalMaterial);
randGeometry.scale.setScalar(0.15);
randGeometry.castShadow = true;
randGeometry.receiveShadow = true;

let renderer;
scene.add(randGeometry);
camera.position.z = 5;

const animate = () => {
	requestAnimationFrame(animate);
	randGeometry.rotation.x += STEP;
	randGeometry.rotation.y += STEP;
	randGeometry.rotation.z += STEP;
	renderer.render(scene, camera);
}


const resize = () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

export const createScene = (el) => {
	renderer = new THREE.WebGLRenderer({antialias: true, canvas: el});
	resize();
	animate();
}


window.addEventListener('resize', resize);


function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
	pointIsWorld = (pointIsWorld === undefined)? false: pointIsWorld;

	if (pointIsWorld) {
		obj.parent.localToWorld(obj.position);
	}

	obj.position.sub(point);
	obj.position.applyAxisAngle(axis, theta);
	obj.position.add(point);

	if (pointIsWorld) {
		obj.parent.worldToLocal(obj.position);
	}

	obj.rotateOnAxis(axis, theta);
}