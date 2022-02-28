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

//Light2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.34,-0.67,0.69); // x,y,z
pointLight2.intensity = 1;
scene.add(pointLight2)

//make a GUI Folder
const light1 = gui.addFolder('Light 1')

//specify a min/max to get the slider in the GUI
//once you find a value you like, can hardcode 
light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper);

//Light3
const pointLight3 = new THREE.PointLight(0x30a8d2, 2)
pointLight3.position.set(.8,0.34,.34); // x,y,z
pointLight3.intensity = 4;
scene.add(pointLight3)

const light2 = gui.addFolder('Light 2')
//specify a min/max to get the slider in the GUI
//once you find a value you like, can hardcode 
light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

//control colors on the GUI
const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
      pointLight3.color.set(light2Color.color);
    })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2);

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
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth /2;
const windowY = window.innerHeight /2;

function onDocumentMouseMove(e) {
    mouseX = (e.clientX - windowX)
    mouseY = (e.clientY - windowY)
}



const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime //auto-rotation, without user mouse input

    //allow user to effect x/y/z-rotation with mousemove, play around with number amounts
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y) 
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x) 
    sphere.rotation.z += -.05 * (targetY - sphere.rotation.x) 

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick) //Vanilla JS
}

tick()