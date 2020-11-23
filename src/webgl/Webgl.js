import { Scene, PerspectiveCamera, PCFSoftShadowMap, WebGLRenderer, Color, AmbientLight, SpotLight } from 'three'

import { OrbitControls } from './controls/OrbitControls'
import { AmmoPhysics } from './physics/AmmoPhysics.js';


import MagicalObject from './objects/MagicalObject'
import Blob from './objects/blob/Blob'
import Sphere from './objects/Sphere'
import Floor from './objects/Floor'
import SkySphere from './objects/skySphere/SkySphere'

import {webglGuiFolder} from '../utils/gui'

export default class Webgl {
  constructor() {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)

    this.scene = new Scene()
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    // this.camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
    this.renderer = new WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap
    document.body.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.light = new AmbientLight( 0x404040, 2 ) // soft white light
    this.scene.add(this.light)
    this.spotlight = new SpotLight( 0xffffff )
    this.spotlight.position.set(10, 10, -10)
    this.spotlight.castShadow = true
    this.spotlight.shadow.camera.zoom = 1
    this.scene.add(this.spotlight)
    
    this.cube = new MagicalObject()
    this.scene.add(this.cube)

    this.blob = new Blob()
    this.scene.add(this.blob)

    this.sky = new SkySphere({
      colorUp: 0x7ee5fc,
      colorDown: 0x1844d7
    })
    this.scene.add(this.sky)

    this.floor = new Floor()
    this.scene.add(this.floor)

    this.camera.position.z = 5;

    this.time = 0
    
    this.setGui();

    window.addEventListener('resize', this.onResize)

    /*
      USE PHYSICS
    */
    AmmoPhysics().then((physics) => {
      this.physics = physics
      this.physics.addMesh(this.floor)
      this.addPhysicSphere()
      window.addEventListener('keydown', e => {
        if (e.code === "Space") {
          console.log("Space pressed")
          this.addPhysicSphere()
        }
      });
      this.start()
    })
  }

  addPhysicSphere() {
    this.spheres = new Sphere()
    this.scene.add(this.spheres)
    this.physics.addMesh(this.spheres, 1)
  }
  
  setGui() {
    this.cube.setGui(webglGuiFolder)
    this.blob.setGui(webglGuiFolder)
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  start() {
    requestAnimationFrame(this.start)
    this.time += 0.01;

    this.cube.update()
    this.blob.update(this.time)

    this.controls.update();

    this.renderer.render(this.scene, this.camera)
   
  }

  
}
