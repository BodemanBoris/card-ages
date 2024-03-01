const d = document,
  $btn = d.querySelector(".leftBtn"),
  $imgContainer = d.querySelector(".img__container");

$btn.addEventListener("click", () => {
  $imgContainer.classList.add("fadeOutLeft");
  $imgContainer.addEventListener("animationend", () => {
    $imgContainer.remove();
  });
});
