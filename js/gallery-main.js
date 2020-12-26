const galleryImgs = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

/*
Разбей задание на несколько подзадач:

V 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
V 2. Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
V 3. Открытие модального окна по клику на элементе галереи.
V 4. Подмена значения атрибута src элемента img.lightbox__image.
V 5. Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
V 6. Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

Дополнительно
Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

V Закрытие модального окна по клику на div.lightbox__overlay.
V Закрытие модального окна по нажатию клавиши ESC.
Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".


<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
*/

const refGallery = document.querySelector("ul.js-gallery");
const refModal = document.querySelector(".js-lightbox");

refGallery.addEventListener("click", onGalleryClick);

let imageIndex;

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName === "UL") {
    return;
  }
  openModal();
  refModal.addEventListener("click", closeModal);
  window.addEventListener("keydown", closeModal);
}

function openModal() {
  refModal.classList.add("is-open");
  refModal
    .querySelector("img")
    .setAttribute("src", event.target.dataset.source);
  console.log(Number(event.target.dataset.index));
  imageIndex = Number(event.target.dataset.index);
  // console.log(imageIndex);
}

function slideImages() {
  if (imageIndex > galleryImgs.length || imageIndex < 0) {
    return;
  }
  refModal
    .querySelector("img")
    .setAttribute("src", galleryImgs[imageIndex].original);
  console.log(galleryImgs[imageIndex].original);
}

function closeModal() {
  if (event.code === "ArrowRight") {
    if (imageIndex < galleryImgs.length - 1) {
      imageIndex += 1;
    }
    console.log("clickR", imageIndex);
    slideImages();
    return;
  } else if (event.code === "ArrowLeft") {
    if (imageIndex > 0) {
      imageIndex -= 1;
    }
    console.log("clickL", imageIndex);
    slideImages();
    return;
  } else if (
    event.target.dataset.action !== "close-lightbox" &&
    !event.target.classList.contains("lightbox__overlay") &&
    event.code !== "Escape"
  ) {
    return;
  }

  refModal.classList.remove("is-open");
  refModal.removeEventListener("click", closeModal);
  window.removeEventListener("keydown", closeModal);
  refModal.querySelector("img").removeAttribute("src");
  // imageIndex = 0;
  //   console.log("click");
}

galleryImgs.map((item, index) => {
  const galleryItem = document.createElement("li");
  const linkItem = document.createElement("a");
  const imgItem = document.createElement("img");
  galleryItem.classList.add("gallery__item");
  linkItem.classList.add("gallery__link");
  imgItem.classList.add("gallery__image");
  refGallery.appendChild(galleryItem);
  galleryItem.appendChild(linkItem);
  linkItem.appendChild(imgItem);
  linkItem.setAttribute("href", item.original);
  imgItem.setAttribute("src", item.preview);
  imgItem.setAttribute("alt", item.description);
  imgItem.setAttribute("data-source", item.original);
  imgItem.setAttribute("data-index", index);
});

// console.log(refGallery.querySelector("img").dataset.index);
