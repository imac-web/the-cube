
import { SphereGeometry, ShaderMaterial, Mesh, Color } from 'three'

import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'


export default class SkySphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(60, 128, 128);
    const material = new ShaderMaterial({
      uniforms: {
        color1: { value: new Color(0xFF00FF) },
        color2: { value: new Color(0x00ffae) }
      },
      vertexShader,
      fragmentShader
    });

    super(geometry, material);
    
    this.position.z = -65
  }

  setGui(gui) {
    const params = {
      scale : 1,
      colors: {
        primary: '#FF0080',
        secondary: '#FF0080'
      }
    }
    
    const magicalObjectFolder = gui.addFolder('SkySphere');
    
    magicalObjectFolder.addColor(params.colors, 'primary').onChange((value) => {
      this.material.uniforms.color1.value = new Color(value)
    })
    magicalObjectFolder.addColor(params.colors, 'secondary').onChange((value) => {
      this.material.uniforms.color2.value = new Color(value)
    })
  }
}