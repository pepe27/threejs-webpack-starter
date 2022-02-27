import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('/textures/NormalMap.png');

// Debugger - shows up on screen
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// 1 Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(.5,64,64);

// 2 Materials

const material = new THREE.MeshStandardMaterial() //MeshStandardMaterial convey the real world as much as possible
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929) //red 0xff0000

// 3 Mesh the Obj and Material ,4 Add Mesh to Scene
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight2.position.set(1,1,1); // x,y,z
pointLight2.intensity = 1;
scene.add(pointLight2)

gui.add(pointLight2.position, 'y');

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//For Resizing the Screen
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true //transparent background, for the rest of your website
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .25 * elapsedTime //speed of rotation

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick) //Vanilla JS
}

tick()