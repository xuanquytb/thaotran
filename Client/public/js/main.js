// Active input
const inputElement = document.querySelector("#search__input");
const active__overlay = document.querySelector(".overlay");
const events = ["focus", "blur"];
events.forEach((event) => {
  inputElement.addEventListener(event, () => {
    if (event === "focus") {
      active__overlay.style.display = "block";
    } else {
      active__overlay.style.display = "none";
    }
  });
});
// Click to next, pre icon
const slider = document.querySelector("#slider__category");
const slider__iconNext = document.querySelector("#category__next");
const slider__iconPre = document.querySelector("#category__pre");
slider__iconNext.onclick = function () {
  slider.style.transform = "translateX(-600px)";
  document.querySelector(".list__category-next-icon").style.display = "none";
  document.querySelector(".list__category-pre-icon").style.display = "block";
};
slider__iconPre.onclick = function () {
  slider.style.transform = "translateX(0)";
  document.querySelector(".list__category-next-icon").style.display = "block";
  document.querySelector(".list__category-pre-icon").style.display = "none";
};

//  Slick section 1
$(document).ready(function () {
  $(".slider__s1").slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left slick__pre-icon' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right slick__next-icon' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
});
// countdown time
let time__second = document.querySelector("#time__second");
let time__minute = document.querySelector("#time__minute");
let time__hours = document.querySelector("#time__hours");
function setTime() {
  if (time__second.value <= 60) {
    time__second.value--;
  }
  if (time__second.value == 0) {
    time__second.value = 59;
    time__minute.value--;
  }
  if (time__minute.value == 0) {
    time__hours.value--;
    time__minute.value = 59;
  }
}
setInterval(setTime, 1000);
// Slick section 2
$(document).ready(function () {
  $(".slider__active").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow:
      "<button type='button' class='slick-prev pull-left' id='slick__prevActive'><i class='fa fa-angle-left slick__pre-icon' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right' id='slick__nextActive'><i class='fa fa-angle-right slick__next-icon' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
});
// Slick section 5
$(document).ready(function () {
  $(".slider__section5-content").slick({
    infinite: true,
    slidesToShow: 1,
    dots: true,
    autoplaySpeed: 2000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left slick__pre-icon' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right slick__next-icon' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
});
// Slick section 6
$(document).ready(function () {
  $(".slider__section6").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    dots: true,
    autoplaySpeed: 2000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left slick__pre-icon' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right slick__next-icon' aria-hidden='true'></i></button>",

    responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
});
// Slick section 6
$(document).ready(function () {
  $(".slider__section8-active").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: false,
    autoplaySpeed: 2000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left slick__pre-icon' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right slick__next-icon' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  });
});

// show more
const showMore = document.querySelector("#show__more");
const btnShowMore = document.querySelector("#btn__showMore");
btnShowMore.onclick = function () {
  btnShowMore.innerHTML = "Đang Tải ....";
  setTimeout(function () {
    showMore.style.display = "flex";
    btnShowMore.innerHTML = "Xem Thêm";
  }, 3000);
};

// active content
const content__listItem = document.querySelectorAll(".content__list-item");
const content__active = document.querySelector(".content__active");
const btn__show = document.querySelector(".content__show");
content__listItem.forEach((item) => {
  item.onclick = function () {
    document
      .querySelector(".content__list-item.border__active")
      .classList.remove("border__active");
    this.classList.add("border__active");
    content__active.style.display = "none";
    btn__show.style.display = "none";
    setTimeout(() => {
      content__active.style.display = "flex";
      btn__show.style.display = "flex";
    }, 200);
  };
});
