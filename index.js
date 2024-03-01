let d = document,
  isAnimating = false,
  pullDeltaX = 0,
  DECITION_THRESHOLD = 95;

const startDrag = (event) => {
  if (isAnimating) return;

  const $agusImg = event.target.closest("#agusImg");

  if ($agusImg === null) return;

  const startX = event.pageX ?? event.touches[0].pageX;

  d.addEventListener("mousemove", onMove);
  d.addEventListener("mouseup", onEnd);

  d.addEventListener("touchmove", onMove, { passive: true });
  d.addEventListener("touchend", onEnd, { passive: true });

  function onMove(event) {
    const currentX = event.pageX ?? event.touches[0].pageX;
    pullDeltaX = currentX - startX;

    if (pullDeltaX === 0) return;

    isAnimating = true;
    const deg = pullDeltaX / 10;

    /* if (pullDeltaX > 0) {
      $like.style.opacity = `${pullDeltaX / 100}`;
    } else {
      $nope.style.opacity = `${Math.abs(pullDeltaX / 100)}`;
    } */

    $agusImg.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
    $agusImg.style.cursor = "grabbing";
  }

  function onEnd(event) {
    d.removeEventListener("mousemove", onMove);
    d.removeEventListener("mousup", onEnd);

    d.removeEventListener("touchmove", onMove, { passive: true });
    d.removeEventListener("touchend", onEnd, { passive: true });

    const decitionMade = Math.abs(pullDeltaX) >= DECITION_THRESHOLD;

    if (decitionMade) {
      if (pullDeltaX > 0) {
        $agusImg.classList.add("go-right");
      } else {
        $agusImg.classList.add("go-left");
      }
      $agusImg.addEventListener("transitionend", () => {
        $agusImg.remove();
        $agusImg.removeAttribute("style");
        $agusImg.classList.remove("reset");
      });
    } else {
      $agusImg.classList.add("reset");
      $agusImg.classList.remove("go-left", "go-right");
    }

    $agusImg.addEventListener("transitionend", () => {
      $agusImg.removeAttribute("style");
      $agusImg.classList.remove("reset");

      /* $like.removeAttribute("style");
      $nope.removeAttribute("style"); */
      pullDeltaX = 0;
      isAnimating = false;
    });
  }
};

d.addEventListener("mousedown", startDrag);
d.addEventListener("touchStart", startDrag, { passive: true });
