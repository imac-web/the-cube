
import { SphereGeometry, MeshPhysicalMaterial, Object3D, Color, Mesh, CanvasTexture, RepeatWrapping } from 'three'
import { noise } from 'utils/perlin'

export default class Blob extends Object3D {
  constructor() {
    super();
    const geometry = new SphereGeometry(1, 128, 128)
    
    this.canvas = this.createCanvas()
    const texture = new CanvasTexture(this.canvas)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set( 1, 1 )
    
    const material = new MeshPhysicalMaterial({
      // alphaMap: texture,
      map: texture,
      transparent: false
    })

    this.mesh = new Mesh(geometry, material)
    this.add(this.mesh)

    this.position.x = -2
    this.noiseScale = 2
    this.coef = 1
    this.peakHeight = 0.2
  }

  setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080',
        secondary: '#FF0080'
      },
      debug: true,
      noiseScale: 2, 
      coef: 1,
      peakHeight: 0.2
    }
    
    const magicalObjectFolder = gui.addFolder('Blob');
    const positionFolder = magicalObjectFolder.addFolder('Position')
    magicalObjectFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.mesh.material.uniforms.color1.value = new Color(value)
    })
    magicalObjectFolder.addColor(params.colors, 'secondary').onChange((value) => {
      this.mesh.material.uniforms.color2.value = new Color(value)
    })

    magicalObjectFolder.add(params, 'debug').onChange(() => {
      this.canvas.style.display = params.debug ? 'block' : 'none'
    })

    magicalObjectFolder.add(params, 'noiseScale').min(0).max(30).onChange((value) => {
      this.noiseScale = value
    })
    magicalObjectFolder.add(params, 'coef').min(0).max(10).onChange((value) => {
      this.coef = value
    })
    magicalObjectFolder.add(params, 'peakHeight').min(0).max(10).onChange((value) => {
      this.peakHeight = value
    })
    magicalObjectFolder.add(params, 'scale').min(0).max(10).onChange((value) => {
      this.scale.x = value
      this.scale.y = value
      this.scale.z = value
    })
    positionFolder.add(this.position, 'x').min(-10).max(10);
    positionFolder.add(this.position, 'y').min(-10).max(10);
    positionFolder.add(this.position, 'z').min(-10).max(10);
  }

  createCanvas () {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024

    const context = canvas.getContext('2d')
    context.fillStyle = '#dddd00'
    context.fillRect(0, 0, canvas.width, canvas.height) // x, y, width, height
    context.fillStyle = 'white'
    context.fillRect(0, canvas.width * 0.5, canvas.width * 0.5, canvas.width * 0.5) // x, y, width, height
    context.fillStyle = 'green'
    context.fillRect(50, 50, 50, 50) // x, y, width, height
    context.fillStyle = 'blue'
    context.font = '70px Arial'
    context.fillText("Hello World", 0, canvas.height * 0.4) // string, x, y

    
    // debug
    document.body.append(canvas)
    canvas.style.position = 'absolute'
    canvas.style.left = '0px'
    canvas.style.bottom = '0px'
    canvas.style.zIndex = '100'
    canvas.style.border = '1px solid red'
    canvas.style.width = '100px'
    canvas.style.height = '100px'

    return canvas
  }

  update (time) {
    for (let i = 0; i < this.mesh.geometry.vertices.length; i++) {
      const point = this.mesh.geometry.vertices[i];
      point.normalize().multiplyScalar(1 + this.peakHeight * noise.perlin3(
        point.x * this.noiseScale + (this.coef*time),
        point.y * this.noiseScale + (this.coef*time),
        point.z * this.noiseScale + (this.coef*time)
      ))
    }
  
    this.mesh.geometry.verticesNeedUpdate = true
    this.mesh.geometry.computeVertexNormals()
  }
}