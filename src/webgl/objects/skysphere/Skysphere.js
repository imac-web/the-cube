
import { SphereGeometry, ShaderMaterial, MeshLambertMaterial, Mesh, Color } from 'three'

import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

export default class Skysphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(8, 128, 128);
    const material = new MeshLambertMaterial({ wireframe: false, color: 0xFF0000 });
    /*const material = new ShaderMaterial({
      uniforms: {
        color1: { value: new Color(0xFF00FF) },
        color2: { value: new Color(0x00ffae) }
      },
      vertexShader,
      fragmentShader
    });*/

    super(geometry, material);
    
    this.position.x = 0
  }

}