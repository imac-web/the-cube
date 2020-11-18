
//uniform vec3 color1;
//uniform vec3 color2;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float d = distance(vPosition, normalize(vPosition) * 0.8);
  vec3 color1 = vec3(0., 0., 0.2);
  vec3 color2 = vec3(0., 0.4, 1.);
  //vec3 finalColor = mix(vPosition, vPosition, d);

  //gl_FragColor = vec4(finalColor, 1.);

  float uvD = length(vUv); 
  vec3 gradient = mix(color1, color2, uvD); 
  gl_FragColor = vec4(gradient,1.); 
}