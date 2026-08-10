const routes = [
  { id: "line-a", label: "LINE A", code: "A" },
  { id: "line-b", label: "LINE B", code: "B" },
  { id: "line-c", label: "LINE C", code: "C" },
];

const tools = [
  {
    id: "faculty",
    code: "W01",
    line: "line-a",
    name: "教授資料處理系統",
    description: "輸入學校或系所名稱與公開網址，整理教授姓名、職稱與聯絡資料。",
    position: 24,
    url: "https://faculty-data-tool.pages.dev/",
    status: "online",
    statusLabel: "可使用",
    actionLabel: "Open tool",
  },
  {
    id: "booklist",
    code: "W02",
    line: "line-b",
    name: "推薦書單生成及複本比對",
    description: "產生推薦書單、比對館藏複本，並整理後續使用的 Excel 資料。",
    position: 50,
    url: "https://wilson100043-byte.github.io/booklist-generator/",
    status: "online",
    statusLabel: "可使用",
    actionLabel: "Open tool",
  },
  {
    id: "monthly-report",
    code: "W03",
    line: "line-c",
    name: "書單月報轉換工具",
    description: "安全檢查、整理並產生學校月報 Excel 新副本。",
    position: 50,
    url: "https://booklist-monthly-report.onrender.com/",
    status: "online",
    statusLabel: "可使用",
    actionLabel: "Open tool",
  },
];

const routeColors = {
  "line-a": "#1268e8",
  "line-b": "#c93416",
  "line-c": "#3e4a5d",
};

const routesElement = document.querySelector("#routes");
const listElement = document.querySelector("#tool-list");
const detailCode = document.querySelector("#detail-code");
const detailName = document.querySelector("#detail-name");
const detailDescription = document.querySelector("#detail-description");
const detailLine = document.querySelector("#detail-line");
const detailStatus = document.querySelector("#detail-status");
const detailStatusLabel = document.querySelector("#detail-status-label");
const detailAction = document.querySelector("#detail-action");
const detailActionLabel = document.querySelector("#detail-action-label");

function validateTools() {
  const ids = new Set(tools.map((tool) => tool.id));
  if (ids.size !== tools.length || tools.some((tool) => !routes.find((route) => route.id === tool.line))) {
    throw new Error("Tool entries need unique ids and valid route names.");
  }
}

function renderRoutes() {
  routesElement.innerHTML = routes
    .map((route) => {
      const stations = tools
        .filter((tool) => tool.line === route.id)
        .map(
          (tool) => `
            <button
              class="station"
              type="button"
              style="--station-x: ${tool.position}%"
              data-tool-id="${tool.id}"
              aria-pressed="${tool.id === tools[0].id}"
            >
              <span class="station__dot" aria-hidden="true"></span>
              <span class="station__label">
                <span class="station__code">${tool.code}</span>
                <span class="station__name">${tool.name}</span>
              </span>
            </button>`,
        )
        .join("");

      return `
        <article class="route" data-line="${route.id}" aria-labelledby="route-${route.id}">
          <h3 id="route-${route.id}" class="route__label">
            <span class="route__symbol">${route.code}</span>
            ${route.label}
          </h3>
          <div class="route__track">${stations}</div>
        </article>`;
    })
    .join("");
}

function renderDirectory() {
  listElement.innerHTML = tools
    .map(
      (tool) => `
        <li style="--tool-color: ${routeColors[tool.line]}">
          <span class="tool-list__code">${tool.code}</span>
          <span class="tool-list__name">${tool.name}</span>
          <span class="tool-list__description">${tool.description}</span>
          <span class="tool-list__line">${routes.find((route) => route.id === tool.line).label}</span>
        </li>`,
    )
    .join("");
}

function selectTool(toolId) {
  const tool = tools.find((entry) => entry.id === toolId);
  if (!tool) return;

  document.querySelectorAll(".station").forEach((station) => {
    station.setAttribute("aria-pressed", String(station.dataset.toolId === tool.id));
  });

  detailCode.textContent = tool.code;
  detailCode.style.backgroundColor = routeColors[tool.line];
  detailName.textContent = tool.name;
  detailDescription.textContent = tool.description;
  detailLine.textContent = routes.find((route) => route.id === tool.line).label;
  detailStatus.dataset.status = tool.status;
  detailStatusLabel.textContent = tool.statusLabel;
  detailActionLabel.textContent = tool.actionLabel;

  detailAction.href = tool.url;
  detailAction.target = "_blank";
  detailAction.rel = "noopener noreferrer";
  detailAction.removeAttribute("aria-disabled");
  detailAction.removeAttribute("tabindex");
}

validateTools();
renderRoutes();
renderDirectory();
routesElement.addEventListener("click", (event) => {
  const station = event.target.closest(".station");
  if (station) selectTool(station.dataset.toolId);
});
selectTool(tools[0].id);
