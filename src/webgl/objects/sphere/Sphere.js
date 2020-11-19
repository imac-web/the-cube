
import { SphereGeometry, ShaderMaterial, Mesh, Color, DoubleSide } from 'three'

import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'


export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(5, 128, 128);
    // const material = new MeshLambertMaterial({ wireframe: false, color: 0xFF0000 });
    const material = new ShaderMaterial({
      uniforms: {
        color1: { value: new Color(0xf6a130) },
        color2: { value: new Color(0x00ffae) }
      },
      vertexShader,
      fragmentShader
    });
    material.side = DoubleSide;
    
    super(geometry, material);
    
    this.position.x = 0
  }

  /*setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080',
        secondary: '#FF0080'
      }
    }
    
    const magicalObjectFolder = gui.addFolder('Blob');
    
    magicalObjectFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.material.uniforms.color1.value = new Color(value)
    })
    magicalObjectFolder.addColor(params.colors, 'secondary').onChange((value) => {
      this.material.uniforms.color2.value = new Color(value)
    })
  }*/

  /*update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }*/

}