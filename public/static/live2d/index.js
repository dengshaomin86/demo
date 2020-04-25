// import "./live2d.css";
import "./live2d.js";

const context = require.context("./model", true, /.json$/);
const models = {};
context.keys().forEach(key => {
  const name = key.substring(key.indexOf("/") + 1, key.lastIndexOf("/"));
  const dress = key.substring(key.lastIndexOf("/") + 1, key.lastIndexOf(".json"));
  const except = ["physics", "pose"];
  if (!except.includes(dress)) {
    if (!models[name]) models[name] = [];
    models[name].push(dress);
  }
});

const live2dFn = {
  load(name, dress) {
    if (!document.getElementById("live2d")) live2dFn.createDom();
    if (!(name && dress && Object.keys(models).includes(name) && models[name].includes(dress))) {
      const localObj = localStorage.getItem("live2d");
      if (localObj) {
        name = JSON.parse(localObj).name;
        dress = JSON.parse(localObj).dress;
      } else {
        name = Object.keys(models)[0];
        dress = models[name][0];
      }
    }
    localStorage.setItem("live2d", JSON.stringify({
      name,
      dress
    }));
    const url = `/static/live2d/model/${name}/${dress}.json`;
    console.log(url);
    /*global loadlive2d*/
    loadlive2d("live2d", url);
  },
  createDom() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "live2d");
    canvas.setAttribute("width", "360");
    canvas.setAttribute("height", "800");
    canvas.style.position = "fixed";
    canvas.style.right = "0";
    canvas.style.bottom = "0";
    canvas.style.zIndex = "999999";
    canvas.style.backgroundColor = "transparent";
    document.getElementsByTagName("body")[0].appendChild(canvas);
  },
  change: {
    role(e) {
      const localObj = localStorage.getItem("live2d");
      if (!localObj) return;
      let name = JSON.parse(localObj).name;
      let idx = Object.keys(models).findIndex(item => item === name);
      if (e === "prev") {
        idx = idx === 0 ? Object.keys(models).length - 1 : idx - 1;
      } else {
        idx = idx === Object.keys(models).length - 1 ? 0 : idx + 1;
      }
      name = Object.keys(models)[idx];
      const dress = models[name][0];
      live2dFn.load(name, dress);
    },
    dress(e) {
      const localObj = localStorage.getItem("live2d");
      if (!localObj) return;
      const name = JSON.parse(localObj).name;
      let dress = JSON.parse(localObj).dress;
      let idx = models[name].findIndex(item => item === dress);
      if (e === "prev") {
        idx = idx === 0 ? models[name].length - 1 : idx - 1;
      } else {
        idx = idx === models[name].length - 1 ? 0 : idx + 1;
      }
      dress = models[name][idx];
      live2dFn.load(name, dress);
    }
  }
};

window.live2dFn = live2dFn;

export {
  models
};
