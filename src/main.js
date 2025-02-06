import './style.css'

let gl,
  program,
  square_vertex_buffer,
  square_vao,
  square_index_buffer,
  indices;

// Shader 
const getShader = (id) =>
{
  const script = document.querySelector(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if(script.type == 'x-shader/x-vertex')
  {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if(script.type == 'x-shader/x-fragment')
  {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else
  {
    console.error(`Unkown shader type: ${script.type}`);
    return null;
  }

  // Compile the shader using supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  {
    console.error(`Error compiling shader ${id}:`, gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

// Create a program
const initProgram = () =>
{
  const vertex_shader = getShader('#vertex-shader');
  const fragment_shader = getShader('#fragment-shader');

  // Create a program
  program = gl.createProgram();

  // Attach shaders to program
  gl.attachShader(program, vertex_shader);
  gl.attachShader(program, fragment_shader);
  gl.linkProgram(program);

  if(!gl.getProgramParameter(program, gl.LINK_STATUS))
  {
    console.error('Could not initlaize shaders');
  };

  // Use this program
  gl.useProgram(program);

  // program.aVertexPosition = gl.getAttribLocation(program, 'a_vertex_position');
}

const initBuffers = () =>
{
  // const vertices = 
  // [
  //   -0.7, 0.2, 0.0,
  //   -0.4, -0.4, 0.0,
  //   0.4, -0.4, 0.0,
  //   0.7, 0.2, 0.0,
  //   0.0, 1.0, 1.0
  // ];

const vertices = [
    //  POSITION     |  COLOR
    // x    y    z   | r    g    b
    -1.0,  -1.0, 0.5,  1.0, 0.0, 0.0,
    -0.5, -0.5, 0.5,  0.0, 1.0, 0.0,
    -0.5, -0.5, 0.5,  0.0, 0.0, 1.0
]

  // Indices
  // indices = [0, 1, 2, 0, 2, 3, 0, 4, 3];
  // indices = [0, 1, 2, 0, 2, 3];
  indices = [0, 1, 2];

  // Create VAO instance and bind so we can work on it
  square_vao = gl.createVertexArray();
  gl.bindVertexArray(square_vao);

  // Set up VBO
  // create buffer, bind buffer, pass data to the buffer, unbind buffer when done
  square_vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, square_vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Provide instructions for VAO to use data in later draw
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT,  0);
  gl.enableVertexAttribArray(0);

  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT,  3 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(0);

  // Set up IBO
  // Create buffer, bind buffer, pass buffer data
  square_index_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, square_index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  // Clean
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

const draw = () =>
{
  // Clear the scene
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Bind the VAO
  gl.bindVertexArray(square_vao);

  // Use the buffers
  // gl.bindBuffer(gl.ARRAY_BUFFER, square_vertex_buffer);
  // gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
  // gl.enableVertexAttribArray(program.aVertexPosition);

  // Bind IBO
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, square_index_buffer);

  // Draw to the scene using triangle primitivies
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  // Clean
  gl.bindVertexArray(null);
  // gl.bindBuffer(gl.ARRAY_BUFFER, null);
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}


const init = () =>
{
  const el_canvas = document.querySelector('#webgl-canvas');
  if(!el_canvas)
  {
    console.log("No canvas element is present");
    return;
  }

  // Set the canvas to the size of the screen
  el_canvas.width = window.innerWidth;
  el_canvas.height = window.innerHeight;

  gl = el_canvas.getContext('webgl2')
  if(!gl)
  {
    console.log("No webgl context was created.");
    return;
  }

  // Set the clear color to be black
  gl.clearColor(0, 0, 0, 1);
  
  initProgram();
  initBuffers();
  draw();
};

// functions to call when the window loads
window.onload = init;