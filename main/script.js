const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', () => {
  const vol = parseFloat(volumeSlider.value);
  document.querySelectorAll('.disk-audio').forEach(a => a.volume = vol);
});

const rotations = new Map();
const loopIds   = new Map();

let currentAudio   = null;
let currentDiskImg = null;

document.querySelectorAll('.disk').forEach(diskEl => {
  const btn     = diskEl.querySelector('.playPauseBtn');
  const audio   = diskEl.querySelector('.disk-audio');
  const diskImg = diskEl.querySelector('.spinning-disk');

  rotations.set(diskImg, 0);

  function spin() {
    let r = rotations.get(diskImg) + 0.5;
    rotations.set(diskImg, r);
    diskImg.style.transform = `rotate(${r}deg)`;
    const id = requestAnimationFrame(spin);
    loopIds.set(diskImg, id);
  }

  btn.addEventListener('click', () => {
    const isNowPlaying = !audio.paused;

    if (isNowPlaying) {
      audio.pause();
      cancelAnimationFrame(loopIds.get(diskImg));
      btn.textContent = 'Play';
      return;
    }

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      const prevBtn = currentAudio.parentElement.querySelector('.playPauseBtn');
      prevBtn.textContent = 'Play';

      cancelAnimationFrame(loopIds.get(currentDiskImg));
      const finalRot = rotations.get(currentDiskImg);
      currentDiskImg.style.transform = `rotate(${finalRot}deg)`;
    }
    currentAudio   = audio;
    currentDiskImg = diskImg;
    audio.currentTime = 0;
    audio.play();
    btn.textContent = 'Pause';

    spin();
  });

  audio.addEventListener('ended', () => {
    cancelAnimationFrame(loopIds.get(diskImg));
    btn.textContent = 'Play';
    currentAudio = null;
    currentDiskImg = null;
  });

  audio.volume = parseFloat(volumeSlider.value);
});

const text = "Raynen";
const typedTextEl = document.getElementById("typed-text");
let index = 0;
let deleting = false;

function typeLoop() {
  if (!deleting) {
    if (index < text.length) {
      typedTextEl.textContent = text.slice(0, index + 1);
      index++;
      setTimeout(typeLoop, 250);
    } else {
      setTimeout(() => {
        deleting = true;
        typeLoop();
      }, 1000);
    }
  } else {
    if (index > 0) {
      typedTextEl.textContent = text.slice(0, index - 1);
      index--;
      setTimeout(typeLoop, 200);
    } else {
      setTimeout(() => {
        deleting = false;
        typeLoop();
      }, 1000);
    }
  }
}

typeLoop();

