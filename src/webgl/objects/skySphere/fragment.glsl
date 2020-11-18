
uniform vec3 color1;
uniform vec3 color2;

varying vec3 vPosition;

void main() {

  vec3 finalColor = mix(color1, color2, vPosition.y*0.3);

  gl_FragColor = vec4(finalColor, 1.);
}