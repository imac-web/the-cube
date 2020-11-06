
import { SphereGeometry, MeshLambertMaterial, Mesh } from 'three'
import {noise} from '../../utils/perlin'


export default class Blob extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(1, 128, 128);
    const material = new MeshLambertMaterial({ wireframe: false, color: 0xFF0000 });
    super(geometry, material);
    
    this.position.x = -2

    this.noiseScale = 2
  }

  update (time) {
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
  }
}