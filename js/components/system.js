
function Scene(engine) {

    const scene = new BABYLON.Scene(engine);

    scene.debugLayer.show({ showExplorer: true, embedMode: true });

    return scene;
}

function Engine(canvas) {

    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingsBuffer: true, stencil: true });
    return engine;
}

function Camera(canvas, scene) {

    const camera = new BABYLON.ArcRotateCamera("camera", -1.079, 1.21, 10, new BABYLON.Vector3(0, 1, 0), scene);

    camera.attachControl(canvas, true);
    camera.upperRadiusLimit = 20;

    camera.wheelPrecision = 50;

    return camera;
}

function Env(scene) {

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.3;
    light.specular = BABYLON.Color3.Black();

    const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-3, 3, 0), scene);
    pointLight.intensity = 1;

    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("assets/environment.dds", scene);
    hdrTexture.gammaSpace = false;
    // scene.environmentTexture = hdrTexture;

    const gl = new BABYLON.GlowLayer("glow", scene, {
        mainTextureSamples: 4,
        blurKernelSize: 20
    });
}

export { Scene, Engine, Camera, Env }