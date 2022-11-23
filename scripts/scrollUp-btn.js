const scrollUpButton = document.querySelector(".scrollUpButton");
const button_img = document.querySelector(".scrollUpButton img");

// responsive script
let viewport500_match = window.matchMedia("(max-width: 500px)").matches;

// if (viewport500_match) {
// 	button_img.style.width = "30px";
// 	scrollUpButton.style.right = "20px";
// }

viewport500_match ? scrollToDisplay = 50 : scrollToDisplay = 300;

window.onscroll = function () {
	if (document.body.scrollTop > scrollToDisplay || document.documentElement.scrollTop > scrollToDisplay) {
		scrollUpButton.style.display = "inherit";
	} else {
		scrollUpButton.style.display = "none";
	}
};

// onClick animate
const scrollUpDelay = 400;
scrollUpButton.addEventListener("click", () => {
	anime({
		targets: scrollUpButton,
		translateY: [
			{ value: -30, easing: "easeOutElastic(1, .6)" },
			{ value: 0, easing: "linear", duration: 400, delay: 100 },
		],
	});
	// animation waiting delay
	setTimeout(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, scrollUpDelay);
});
