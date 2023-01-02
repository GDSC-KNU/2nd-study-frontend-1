function getScrollPercent(scrollPosFromTargetContentTop, HeightOfTargetContent) {
  const progress = ((scrollPosFromTargetContentTop) / (HeightOfTargetContent)) * 100;

  if (progress < 0) return 0.00;
  if (progress > 100) return 100.00;
  return progress;
}

function getScrollPositionFromTargetContentTop(className, offset) {
  const targetContent = document.querySelector(className);
  const targetContentOffsetTop = targetContent.offsetTop;

  const scrollPos = window.scrollY;

  return scrollPos - targetContentOffsetTop + offset;
}

function getHeightOfTargetContent(className, offset) {
  const targetContent = document.querySelector(className);
  const targetContentHeight = targetContent.clientHeight;

  const winHeight = window.innerHeight;

  return targetContentHeight - winHeight + offset;
}

function setProgressBar(progress) {
  const progressBar = document.querySelector(".navbar__progress-bar");

  // in order to put text as a property, add "" to the value
  progressBar.style.setProperty('--progressPercent', `"${progress.toFixed(2)}%"`);
  progressBar.style.width = progress + "%";
}

function useProgressBar() {
  const navbarHeight = document.querySelector('.navbar').clientHeight;

  const scrollPosFromTargetContentTop = getScrollPositionFromTargetContentTop('.container-bordered', navbarHeight);
  const HeightOfTargetContent = getHeightOfTargetContent('.container-bordered', navbarHeight);

  const progress = getScrollPercent(scrollPosFromTargetContentTop, HeightOfTargetContent);

  setProgressBar(progress);
}

document.addEventListener('scroll', useProgressBar);