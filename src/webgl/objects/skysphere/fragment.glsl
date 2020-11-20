
uniform vec3 color1;
uniform vec3 color2;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float d = distance(vUv.y, 0.);
  vec3 gradient = mix(color1, color2, d); 

  gl_FragColor = vec4(gradient, 1.); 
}