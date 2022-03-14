import * as Utils from './components/system.js';

const LoadUI = function () {
    const load_icon = document.getElementById("loader");
    this.hide = function () {
        load_icon.style.display = 'none';
    }
}


const App = function () {

    let engine, camera, scene;

    const canvas = document.getElementById('canvas');

    this.start = function () {

        engine = Utils.Engine(canvas);

        scene = new BABYLON.Scene(engine);

        camera = Utils.Camera(canvas, scene);

        Utils.Env(scene);

        loadModel();

        animate()
    }



    function loadModel() {

        Promise.all([
            BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/", "car.glb", scene).then((result) => {
                let assets = result.meshes[0];
                assets.scaling = new BABYLON.Vector3(1.66, 1.66, 1.66)
            }),
        ]).then(() => {
            new LoadUI().hide();
            animate();
        });
    }


    function animate() {
        engine.runRenderLoop(() => {
            scene.render();
        });
        window.addEventListener("resize", () => {
            engine.resize();
        });
    }
}

var app = new App();
app.start()