export default [
  { key: 'Login', value: 'login' },
  { key: 'Galeria de imagenes', value: 'imageGallery' },
  { key: 'Galeria de productos', value: 'productGallery' },
  { key: 'Archivo', value: 'file' },
  { key: 'Imagen', value: 'image' }
];


export const loginHTML = `<div class="card w-25 p-4">
  <div class="row">
    <div class="col-lg-12">
      <label>Usuario</label>
      <input class="form-control" placeholder="Usuario"/>
    </div>
    <div class="col-lg-12">
      <label>Contraseña</label>
      <input class="form-control" placeholder="Contraseña"/>
    </div>
  </div>
  <button class="btn btn-primary mt-3">
    Login
  </button>
</div>`;
