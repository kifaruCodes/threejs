import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Texture loader
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('textures/normal_map.png');

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .7, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
    metalness : 0.7,
    roughness : 0.5,
    normalMap : normalTexture,
    color : new THREE.Color(0xFFFFFF)
})


// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
// pointlight 1
const pointLight = new THREE.PointLight(0xFF0000, 0.7)
pointLight.position.set(-3,3.1,-2.5)
scene.add(pointLight)
// dat gui for point light 1
const light1 = gui.addFolder('Light 1')
light1.add(pointLight.position, 'x').min(-5).max(5).step(0.1)
light1.add(pointLight.position, 'y').min(-5).max(5).step(0.1)
light1.add(pointLight.position, 'z').min(-5).max(5).step(0.1) 
light1.add(pointLight, 'intensity').min(0).max(5).step(0.1) 
const light1Color = {
    color : 0xFF0000
}
light1.addColor(light1Color, 'color')
.onChange(() => {
    pointLight.color.set(light1Color.color)
})
// point light helper 1
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

// point light 2
const pointLight2 = new THREE.PointLight(0x0C00FF, 0.7)
pointLight2.position.set(1.1,-2,-1.8)
scene.add(pointLight2)
// dat gui
const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'x').min(-5).max(5).step(0.1)
light2.add(pointLight2.position, 'y').min(-5).max(5).step(0.1)
light2.add(pointLight2.position, 'z').min(-5).max(5).step(0.1)
light2.add(pointLight2, 'intensity').min(0).max(5).step(0.1) 
const light2Color = {
    color : 0x0C00FF
}
light2.addColor(light2Color, 'color')
.onChange(() => {
    pointLight2.color.set(light2Color.color)
})
// point light helper
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)


// point light 3
const pointLight3 = new THREE.PointLight(0xffffff, 0.1)
pointLight3.position.set(2,3,4)
scene.add(pointLight3)
// dat gui
const light3 = gui.addFolder('Light 3')
light3.add(pointLight3.position, 'x').min(-5).max(5).step(0.1)
light3.add(pointLight3.position, 'y').min(-5).max(5).step(0.1)
light3.add(pointLight3.position, 'z').min(-5).max(5).step(0.1)
light3.add(pointLight3, 'intensity').min(0).max(5).step(0.1)
const light3Color = {
    color : 0xFF0000
}
light3.addColor(light3Color, 'color')
.onChange(() => {
    pointLight3s.color.set(light3Color.color)
}) 
// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
    alpha: true
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

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseX = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.005 * (targetX - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()