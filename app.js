const tools = [
  {
    name: "教授資料處理系統",
    image: "assets/faculty-data.png",
    url: "https://faculty-data-tool.pages.dev/",
  },
  {
    name: "推薦書單生成及複本比對",
    image: "assets/booklist-generator.png",
    url: "https://wilson100043-byte.github.io/booklist-generator/",
  },
  {
    name: "書單月報轉換工具",
    image: "assets/monthly-report.png",
    url: "https://booklist-monthly-report.onrender.com/",
  },
  {
    name: "續訂回覆合併台",
    image: "assets/renewal-reply-merge.png",
    url: "https://wilson100043-byte.github.io/renewal-reply-merge/",
  },
];

const viewport = document.querySelector("#gallery-viewport");
const ring = document.querySelector("#gallery-ring");
const nav = document.querySelector("#gallery-nav");
const status = document.querySelector("#gallery-status");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileLayout = window.matchMedia("(max-width: 42rem)");
const anglePerCard = 360 / tools.length;

let rotation = 0;
let velocity = 0;
let activeIndex = 0;
let dragging = false;
let dragDistance = 0;
let pointerX = 0;
let lastPointerTime = 0;
let lastMoveAt = 0;
let hoverPaused = false;
let snapping = false;
let snapId = 0;
let snapAfterInertia = false;
let lastFrameTime = performance.now();

const dragSensitivity = 0.22;
const maxVelocity = 0.24;

function renderGallery() {
  ring.innerHTML = tools
    .map(
      (tool, index) => `
        <article
          class="gallery-card${index === 0 ? " is-active" : ""}"
          style="--card-angle: ${index * anglePerCard}deg; --float-delay: ${index * -1.2}s"
          data-index="${index}"
        >
          <a
            class="gallery-card__link"
            href="${tool.url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="開啟${tool.name}"
            ${index === 0 ? "" : 'tabindex="-1"'}
          >
            <div class="gallery-card__float">
              <figure class="gallery-card__surface">
                <img
                  class="gallery-card__image"
                  src="${tool.image}"
                  alt="${tool.name}首頁畫面"
                  draggable="false"
                />
                <figcaption class="gallery-card__meta">
                  <span class="gallery-card__name">${tool.name}</span>
                  <span class="gallery-card__open">OPEN</span>
                </figcaption>
              </figure>
            </div>
          </a>
        </article>`,
    )
    .join("");

  nav.innerHTML = tools
    .map(
      (tool, index) => `
        <button
          type="button"
          data-index="${index}"
          aria-label="顯示${tool.name}"
          aria-current="${index === 0}"
        ></button>`,
    )
    .join("");
}

function setRadius() {
  const width = window.innerWidth;
  const radius = width < 672 ? Math.max(245, width * 0.66) : Math.min(520, width * 0.34);
  document.documentElement.style.setProperty("--radius", `${radius}px`);
}

function normalizeAngle(value) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

function nearestRotation(index) {
  const base = -index * anglePerCard;
  return base + Math.round((rotation - base) / 360) * 360;
}

function rotateTo(index) {
  const currentSnap = ++snapId;
  const target = nearestRotation(index);
  velocity = 0;
  snapping = true;
  const start = rotation;
  const distance = target - start;
  const startedAt = performance.now();
  const duration = reducedMotion.matches ? 1 : 560;

  function step(now) {
    if (currentSnap !== snapId) return;
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    rotation = start + distance * eased;
    if (progress < 1) requestAnimationFrame(step);
    else snapping = false;
  }

  requestAnimationFrame(step);
}

function updateActiveCard() {
  const nextIndex = ((Math.round(-rotation / anglePerCard) % tools.length) + tools.length) % tools.length;
  if (nextIndex === activeIndex) return;

  activeIndex = nextIndex;
  document.querySelectorAll(".gallery-card").forEach((card, index) => {
    const isActive = index === activeIndex;
    card.classList.toggle("is-active", isActive);
    card.querySelector("a").tabIndex = isActive ? 0 : -1;
  });
  nav.querySelectorAll("button").forEach((button, index) => {
    button.setAttribute("aria-current", String(index === activeIndex));
  });
  status.textContent = `${tools[activeIndex].name}，第 ${activeIndex + 1} 個，共 ${tools.length} 個`;
}

function paint() {
  ring.style.transform = `rotateY(${rotation}deg)`;
  document.querySelectorAll(".gallery-card").forEach((card, index) => {
    const distance = Math.abs(normalizeAngle(index * anglePerCard + rotation));
    const opacity = Math.max(0.18, 1 - distance / 155);
    card.style.setProperty("--card-opacity", opacity.toFixed(3));
    card.style.zIndex = String(1000 - Math.round(distance));
  });
  updateActiveCard();
}

function animate(now) {
  const frameTime = Math.min(32, now - lastFrameTime);
  lastFrameTime = now;

  if (!dragging && Math.abs(velocity) > 0.004) {
    rotation += velocity * frameTime;
    velocity *= Math.pow(0.9, frameTime / (1000 / 60));
  } else if (!dragging && snapAfterInertia) {
    velocity = 0;
    snapAfterInertia = false;
    rotateTo(activeIndex);
  }

  paint();
  requestAnimationFrame(animate);
}

viewport.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  dragging = true;
  snapping = false;
  snapId += 1;
  dragDistance = 0;
  pointerX = event.clientX;
  lastPointerTime = performance.now();
  lastMoveAt = lastPointerTime;
  velocity = 0;
});

viewport.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const now = performance.now();
  const delta = event.clientX - pointerX;
  const elapsed = Math.max(4, now - lastPointerTime);
  const nextVelocity = (delta * dragSensitivity) / elapsed;
  pointerX = event.clientX;
  lastPointerTime = now;
  if (delta !== 0) lastMoveAt = now;
  dragDistance += Math.abs(delta);
  if (dragDistance > 4 && !viewport.hasPointerCapture(event.pointerId)) {
    viewport.setPointerCapture(event.pointerId);
    document.body.classList.add("is-dragging");
  }
  velocity = Math.max(-maxVelocity, Math.min(maxVelocity, velocity * 0.65 + nextVelocity * 0.35));
  rotation += delta * dragSensitivity;
});

function endDrag(event) {
  if (!dragging) return;
  dragging = false;
  snapAfterInertia = dragDistance > 8;
  if (!snapAfterInertia || performance.now() - lastMoveAt > 80) velocity = 0;
  if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  document.body.classList.remove("is-dragging");
}

viewport.addEventListener("pointerup", endDrag);
viewport.addEventListener("pointercancel", endDrag);
viewport.addEventListener("dragstart", (event) => event.preventDefault());

viewport.addEventListener("click", (event) => {
  const link = event.target.closest(".gallery-card__link");
  if (!link) return;
  const index = Number(link.closest(".gallery-card").dataset.index);

  if (dragDistance > 8 || index !== activeIndex) {
    event.preventDefault();
    if (dragDistance <= 8) rotateTo(index);
  }
});

viewport.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();

  if (event.key === "Home") rotateTo(0);
  if (event.key === "End") rotateTo(tools.length - 1);
  if (event.key === "ArrowLeft") rotateTo((activeIndex - 1 + tools.length) % tools.length);
  if (event.key === "ArrowRight") rotateTo((activeIndex + 1) % tools.length);
});

ring.addEventListener("pointerover", (event) => {
  if (event.target.closest(".gallery-card__link")) hoverPaused = true;
});

ring.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget?.closest?.(".gallery-card__link")) hoverPaused = false;
});

nav.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) rotateTo(Number(button.dataset.index));
});

window.addEventListener("resize", setRadius, { passive: true });
mobileLayout.addEventListener("change", () => {
  setRadius();
  rotateTo(activeIndex);
});

window.setInterval(() => {
  if (!dragging && !snapping && !hoverPaused && !reducedMotion.matches && !mobileLayout.matches) {
    rotateTo((activeIndex + 1) % tools.length);
  }
}, 9000);

renderGallery();
setRadius();
paint();
requestAnimationFrame(animate);
