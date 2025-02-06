import './style.css';

let gl,
    program,
    square_vertex_buffer,
    square_vao,
    square_index_buffer,
    indices;

const init = () =>
{
    // Get dom el and check if it exists
    const el_canvas = document.querySelector('#webgl_canvas');
    if(!el_canvas)
    {
        console.error("Canvas element not found");
        return;
    }

    const gl = el_canvas.getContext('webgl2');
    if(!gl)
    {
        console.error("WebGL2 context could not be created. Your browser does not support WebGL2");
        return;
    }

    console.log("WebGL2 context successfully created", gl);
}

// when window loads, run init
window.onload = init();