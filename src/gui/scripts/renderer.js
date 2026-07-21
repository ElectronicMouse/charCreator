async function loadSystems() {
  const systems = await window.api.listSystems();
  const select = document.getElementById("system");

  systems.forEach(sys => {
    const option = document.createElement("option");
    option.value = sys;
    option.textContent = sys;
    select.appendChild(option);
  });
}

loadSystems();

// Handle Generate button click
document.getElementById("generateBtn").onclick = async () => {
  const name = document.getElementById("name").value;
  const system = document.getElementById("system").value;
  resolver("generate", name, system);
};


async function resolver(input, ...params) {
  switch (input) {
    case "generate":
      const result = await window.api.generate(params[0], params[1]);
      break;
      case "trace":
      window.api.trace(params[0], params[1], params[2]);
      break;
      case "cleartrace":
      window.api.cleartrace();
      break;
    default:
      renderResult.innerHTML = "";
      break;
  }
}