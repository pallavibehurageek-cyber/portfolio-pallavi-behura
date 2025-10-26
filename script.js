// =============== DARK/LIGHT MODE TOGGLE ===============
(function() {
  const nav = document.querySelector('nav');
  const modeBtn = document.createElement('button');
  modeBtn.className = 'mode-toggle';
  modeBtn.innerHTML = '🌙';
  nav.appendChild(modeBtn);

  function setMode(mode) {
    document.body.classList.toggle('dark-mode', mode === 'dark');
    modeBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('color-mode', mode);
  }
  const savedMode = localStorage.getItem('color-mode') || 'light';
  setMode(savedMode);

  modeBtn.onclick = () => setMode(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
})();

// =============== SMOOTH SCROLL NAVIGATION ===============
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});

// =============== ACTIVE NAV LINK ON SCROLL ===============
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  let found = false;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top <= 80 && rect.bottom > 80 && !found){
      document.querySelectorAll('nav a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + section.id));
      found = true;
    }
  });
});

// =============== COUNTER WITH COOL ANIMATION ===============
(function() {
  let count = 0;
  const btn = document.getElementById('countBtn');
  const counter = document.getElementById('counter');
  btn.onclick = function() {
    let target = ++count;
    let start = Number(counter.textContent);
    let step = target > start ? 1 : -1;
    let animate = setInterval(() => {
      start += step;
      counter.textContent = start;
      if(start === target) clearInterval(animate);
    }, 20);
  };
})();

// =============== BUTTON RIPPLE EFFECT ===============
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', function(e){
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  });
});

// =============== JS TESTER PLAYGROUND ===============
function runCode() {
  const input = document.getElementById("jsinput")?.value;
  const output = document.getElementById("jsoutput");
  try {
    output.textContent = eval(input);
  } catch (err) {
    output.textContent = err.message;
  }
}
window.runCode = runCode;

// =============== JavaScript Quiz ===============
function quizAnswer(choice) {
  const resultBox = document.getElementById('quizResult');
  if (choice === 'script') {
    resultBox.textContent = "✅ Correct! Great job — 'script' is used for JavaScript!";
    resultBox.style.color = "green";
  } else {
    resultBox.textContent = "❌ Oops! Try again — it's the 'script' tag.";
    resultBox.style.color = "crimson";
  }
}
window.quizAnswer = quizAnswer;

// =============== Button Designer Playground ===============
document.addEventListener("DOMContentLoaded", function() {
  const styledBtn = document.getElementById("styledBtn");
  const colorPicker = document.getElementById("btnColor");
  const radiusSlider = document.getElementById("radius");

  styledBtn.style.backgroundColor = colorPicker.value;
  styledBtn.style.borderRadius = radiusSlider.value + "px";

  colorPicker.addEventListener("input", () => {
    styledBtn.style.backgroundColor = colorPicker.value;
  });
  radiusSlider.addEventListener("input", () => {
    styledBtn.style.borderRadius = radiusSlider.value + "px";
  });
  styledBtn.addEventListener("click", () => {
    styledBtn.textContent = "Clicked!";
    setTimeout(() => styledBtn.textContent = "Preview Button", 800);
  });
});

// =============== Color Mixer Playground ===============
document.addEventListener("DOMContentLoaded", function() {
  const r = document.getElementById('rRange');
  const g = document.getElementById('gRange');
  const b = document.getElementById('bRange');
  const colorBox = document.getElementById('colorBox');
  const rgbVals = document.getElementById('rgbVals');

  function updateColor() {
    const color = `rgb(${r.value}, ${g.value}, ${b.value})`;
    colorBox.style.background = color;
    rgbVals.textContent = color;
    rgbVals.style.fontWeight = 'bold';
  }
  [r, g, b].forEach(slider => slider.addEventListener('input', updateColor));
  updateColor();
});

// =============== Contact Form Async Feedback ===============
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const feedback = document.querySelector(".feedback");
  feedback.textContent = "Sending...";
  feedback.style.color = "#20c997";
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      feedback.textContent = "Thank you! Your message was sent successfully.";
      feedback.style.color = "#20c997";
      form.reset();
    } else {
      feedback.textContent = "Oops! There was a problem submitting your form.";
      feedback.style.color = "#e65c4f";
    }
  } catch (error) {
    feedback.textContent = "A network error occurred. Please try again.";
    feedback.style.color = "#e65c4f";
  }
});

// =============== Ripple Effect CSS (inject if not in style.css) ===============
const style = document.createElement('style');
style.textContent = `
.ripple {
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(32,201,151,0.20);
  pointer-events: none;
  transform: scale(0);
  animation: ripple-ani .5s cubic-bezier(.43,.11,.55,.86);
  z-index: 3;
}
@keyframes ripple-ani {
  to { transform: scale(2.5); opacity:0; }
}
.mode-toggle {
  background: #fff;
  border: 1.5px solid #eee;
  border-radius: 50%;
  font-size: 1.32em;
  padding: 3px 10px;
  margin-left: 20px;
  cursor: pointer;
  transition: background .18s, box-shadow .12s;
  box-shadow: 0 2px 8px #eee;
}
body.dark-mode {
  --main-bg: #1e2332;
  --card-bg: #21253a;
  --primary: #20c997;
  --badge-hover: #c96cd7;
  --accent: #c96cd7;
  --heading: #edeeff;
}
body.dark-mode section { box-shadow: 0 4px 22px #20c99718; }
body.dark-mode .badge { color: #fff; }
body.dark-mode footer { background: #21253a; color: #ccc!important; }
body.dark-mode .header-left h1, body.dark-mode .header-left h2 { color: #edeeff;}
body.dark-mode nav a { color: #edeeff;}
`;
document.head.appendChild(style);
// ================== FETCH LATEST GITHUB PROJECTS ==================
async function loadGitHubProjects() {
  const projectsSection = document.getElementById("projectList");
  projectsSection.innerHTML = "<li>Loading latest projects from GitHub...</li>";

  try {
    const response = await fetch("https://api.github.com/users/pallavibehurageek-cyber/repos?sort=updated");
    const repos = await response.json();
    projectsSection.innerHTML = "";

    // Filter top 5 repositories by recent update
    repos.slice(0, 5).forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${repo.name}</strong>: ${repo.description || "No description provided."}
        <br>
        ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}
        <br>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      projectsSection.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading GitHub projects:", error);
    projectsSection.innerHTML = "<li>Unable to load GitHub data.</li>";
  }
}
document.addEventListener("DOMContentLoaded", loadGitHubProjects);
