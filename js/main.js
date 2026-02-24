document.addEventListener('DOMContentLoaded', () => {

  // ---- LIGHTBOX FOTO ----
  const photoLightbox = document.getElementById('photo-lightbox');
  const lbImg         = document.getElementById('lb-img');
  const lbClose       = document.getElementById('lb-close');
  const lbPrev        = document.getElementById('lb-prev');
  const lbNext        = document.getElementById('lb-next');

  let currentGroup = [];
  let currentIndex = 0;

  function getGroupTriggers(groupName) {
    return Array.from(document.querySelectorAll(`.lightbox-trigger[data-group="${groupName}"]`));
  }

  document.querySelectorAll('.lightbox-trigger').forEach((trigger, i) => {
    trigger.addEventListener('click', () => {
      const groupName = trigger.dataset.group || `solo-${i}`;
      currentGroup = getGroupTriggers(groupName).length > 0
        ? getGroupTriggers(groupName)
        : [trigger];
      currentIndex = currentGroup.indexOf(trigger);
      if (currentIndex === -1) currentIndex = 0;
      openPhoto(currentIndex);
    });
  });

  function openPhoto(index) {
    lbImg.src = currentGroup[index].dataset.src;
    photoLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbPrev.style.display = currentGroup.length > 1 ? 'flex' : 'none';
    lbNext.style.display = currentGroup.length > 1 ? 'flex' : 'none';
  }

  function closePhoto() {
    photoLightbox.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closePhoto);
  photoLightbox.addEventListener('click', e => {
    if (e.target === photoLightbox) closePhoto();
  });
  lbPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    openPhoto(currentIndex);
  });
  lbNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    openPhoto(currentIndex);
  });


  // ---- LIGHTBOX VIDEO ----
  const videoLightbox = document.getElementById('video-lightbox');
  const vlbVideo      = document.getElementById('vlb-video');
  const vlbClose      = document.getElementById('vlb-close');

  document.querySelectorAll('.video-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      vlbVideo.src = trigger.dataset.video;
      videoLightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      vlbVideo.play().catch(() => {});
    });
  });

  function closeVideo() {
    videoLightbox.classList.remove('open');
    vlbVideo.pause();
    vlbVideo.src = '';
    document.body.style.overflow = '';
  }

  vlbClose.addEventListener('click', closeVideo);
  videoLightbox.addEventListener('click', e => {
    if (e.target === videoLightbox) closeVideo();
  });


  // ---- CHIUDI CON ESC ----
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (photoLightbox.classList.contains('open')) closePhoto();
      if (videoLightbox.classList.contains('open')) closeVideo();
    }
    if (photoLightbox.classList.contains('open')) {
      if (e.key === 'ArrowLeft')  lbPrev.click();
      if (e.key === 'ArrowRight') lbNext.click();
    }
  });

});