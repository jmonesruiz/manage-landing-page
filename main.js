//////// MOBILE MENU ////////
const hamburger = document.getElementById("hamburger-checkbox");
const overlay = document.querySelector(".mobile-nav-overlay");
const nav = document.getElementById("nav");

hamburger.addEventListener("change", updateNav);

function updateNav() {
	if (hamburger.checked) {
		overlay.style.setProperty("display", "unset");
		nav.style.setProperty("display", "unset");
	} else {
		overlay.style.removeProperty("display");
		nav.style.removeProperty("display");
	}
}

//////// SLIDER ////////

const buttonLeft = document.getElementById("slider__button-left");
const buttonRight = document.getElementById("slider__button-right");
const sliderItems = document.getElementById("slider__items");
const sliderItemArr = document.querySelectorAll(".slider__item");
const sliderMobileDots = document.querySelectorAll(".slider__mobile-dot");

const maxPos = sliderItemArr.length - 1;
let currentPos = 1;
let mediaQuery = window.matchMedia("(max-width: 720px)");
let inMobile = mediaQuery.matches;
mediaQuery.addEventListener("change", () => {
	inMobile = mediaQuery.matches;
	if (!inMobile) {
		hamburger.checked = false;
		updateNav();
	}
	moveSlider(currentPos);
});
moveSlider(currentPos);

buttonLeft.addEventListener("click", () => {
	if (currentPos > 0) {
		sliderMobileDots.item(currentPos).classList.remove("slider__mobile-dot--active");
		currentPos--;
		sliderMobileDots.item(currentPos).classList.add("slider__mobile-dot--active");
		moveSlider(currentPos);
		if (currentPos === 0) {
			buttonLeft.style.setProperty("display", "none");
		}
		buttonRight.style.removeProperty("display");
	}
});

buttonRight.addEventListener("click", () => {
	if (currentPos < maxPos) {
		sliderMobileDots.item(currentPos).classList.remove("slider__mobile-dot--active");
		currentPos++;
		sliderMobileDots.item(currentPos).classList.add("slider__mobile-dot--active");

		moveSlider(currentPos);
		if (currentPos === maxPos) {
			buttonRight.style.setProperty("display", "none");
		}
		buttonLeft.style.removeProperty("display");
	}
});

sliderMobileDots.forEach((item, index) => {
	item.addEventListener("click", () => {
		sliderMobileDots.item(currentPos).classList.remove("slider__mobile-dot--active");
		currentPos = index;
		item.classList.add("slider__mobile-dot--active");
		moveSlider(currentPos);
		buttonRight.style.removeProperty("display");
		buttonLeft.style.removeProperty("display");
		if (currentPos === maxPos) {
			buttonRight.style.setProperty("display", "none");
		}
		if (currentPos === 0) {
			buttonLeft.style.setProperty("display", "none");
		}
	});
});

function moveSlider(pos) {
	if (pos >= 0 && pos <= maxPos) {
		if (!inMobile) {
			if (pos === 0) {
				sliderItems.style.setProperty("margin-left", "calc(3rem + (10vw + 3rem) * 2)");
			} else {
				sliderItems.style.setProperty(
					"margin-left",
					`calc((10vw + 3rem) * -1 - (40vw + 3rem) * ${pos - 1})`
				);
			}
		} else {
			sliderItems.style.setProperty("margin-left", `calc(((100vw - 6rem) * -${pos}) + 3rem)`);
		}
	}
}

//////// CONTACT FORM ////////

const contactForm = document.getElementById("contact-form");
const contactFormEmail = document.getElementById("contact-form-email");

contactForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!contactFormEmail.checkValidity()) {
		contactFormEmail.focus();
		contactFormEmail.select();
	} else {
		// do something with contactFormEmail.value
		contactFormEmail.value = "";
	}
});
