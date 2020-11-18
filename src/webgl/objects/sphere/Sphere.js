
import { SphereGeometry, ShaderMaterial, Mesh, Color, DoubleSide } from 'three'

import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'


export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(15, 128, 128);
    // const material = new MeshLambertMaterial({ wireframe: false, color: 0xFF0000 });
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader
    });
    material.side = DoubleSide;
    super(geometry, material);
    
    //this.position.x = 4
    //this.noiseScale = 2
  }

/*  setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080',
        secondary: '#FF0080'
      }
    }
    
    const magicalObjectFolder = gui.addFolder('Sphere');
    
    magicalObjectFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.material.uniforms.color1.value = new Color(value)
    })
    magicalObjectFolder.addColor(params.colors, 'secondary').onChange((value) => {
      this.material.uniforms.color2.value = new Color(value)
    })
  }*/

/*  update (time) {
    for (let i = 0; i < this.geometry.vertices.length; i++) {
      const point = this.geometry.vertices[i];
      point.normalize().multiplyScalar(1 + 0.2 * noise.perlin3(
        point.x * this.noiseScale + time,
        point.y * this.noiseScale + time,
        point.z * this.noiseScale + time
      ))
    }
  
    this.geometry.verticesNeedUpdate = true
    this.geometry.computeVertexNormals()
  }*/
}