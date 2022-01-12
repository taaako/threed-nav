import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Model.css";
import Modal from "react-modal";

const style = {
  height: 300,
  width: 300
};

class Model extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
  }

  sceneSetup = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      20,
      width / height,
      0.1,
      1000
    );

    this.camera.position.z = 8;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.el.appendChild(this.renderer.domElement);
  };

  addCustomSceneObjects = () => {
    var loader = new GLTFLoader().setPath("myAvatar/");
    loader.load("scene.gltf", (gltf) => {
      this.avatar = gltf.scene;
      this.scene.add(this.avatar);
    });

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    if (this.avatar) this.avatar.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={(ref) => (this.el = ref)} />;
  }
}

class NavText extends Component {
  render (){
    return(
      <div className="navText">
        <p>Welcome!</p>
        <p>インストールして使ってみてね！</p>
      </div>
    );
  }
}

function NavModal () {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button className="modal-open" onClick={() => setIsOpen(true)}>FAQ</button>
      <Modal className="modal" isOpen={modalIsOpen}>
        <div className="faq">
          <h2>お問い合わせ/よくある質問</h2>
          <p>Q1. aaa</p>
          <p>Q2. bbb</p>
          <p>Q3. ccc</p>
          <h3>その他お問い合わせ</h3>
          <p>mail : threed-nav.info@threed-nav.jp</p>
          <h4>こちらまで</h4>
        </div>
        <button className="modal-close" onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export { NavText, Model, NavModal };

// class Container extends React.Component {
//   state = { isMounted: true };

//   render() {
//     const { isMounted = true } = this.state;
//     return (
//       <>
//         <button
//           onClick={() =>
//             this.setState((state) => ({ isMounted: !state.isMounted }))
//           }
//         >
//           {isMounted ? "Unmount" : "Mount"}
//         </button>
//         {isMounted && <Model />}
//       </>
//     );
//   }
// }

// export default Container;
