import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// Add Firebase products that you want to use
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	addDoc,
	setDoc,
	doc,
	increment,
	updateDoc,
	onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyCfd3SatHBUIE1IOkMIchKQiuY-PKnaFic",
	authDomain: "my-testing-c3f4e.firebaseapp.com",
	projectId: "my-testing-c3f4e",
	storageBucket: "my-testing-c3f4e.appspot.com",
	messagingSenderId: "1019389789219",
	appId: "1:1019389789219:web:4e1321bbcf2ed0950ddd96",
	measurementId: "G-D73BT7CZ86",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const buttons = [
	{
		name: "Profile",
		btn_id: "profileBtn",
		counter_id: "profileCounter",
		img_id: "profileImg",
		collection: "profile",
		liked_yet: false,
	},
	{
		name: "About me",
		btn_id: "aboutBtn",
		counter_id: "aboutCounter",
		img_id: "aboutImg",
		collection: "about",
		liked_yet: false,
	},
	{
		name: "Skills",
		btn_id: "skillsBtn",
		counter_id: "skillsCounter",
		img_id: "skillsImg",
		collection: "skills",
		liked_yet: false,
	},
];

const updateIcon = (params) => {

		const getLocal = localStorage.getItem(params.collection, params.liked_yet)
		const loadedState = JSON.parse(getLocal);
		params.liked_yet = loadedState
		console.log('loaded state', loadedState)
		if (loadedState) {
			document.getElementById(params.img_id).src = "./img/heart-red.svg";
		} else {
			document.getElementById(params.img_id).src = "./img/heart.svg";
		}
}

buttons.forEach((params) => {

    let button = document.getElementById(params.btn_id)
    let image = document.getElementById(params.img_id)
    let counter = document.getElementById(params.counter_id)

	// button listener
	const postBtn = document.getElementById(params.btn_id);
	postBtn.addEventListener("click", () => {
		postData();
	});

	counter.innerHTML = "wait...";
	// listen for changes in database
	onSnapshot(doc(db, "likes-counter", "likes"), (doc) => {
		counter.innerHTML = doc.data()[params.collection];
		updateIcon(params)
	});

	// manage data to database
	const postData = async () => {
		button.disabled = true;
		counter.innerHTML = "wait...";
		const likesRef = doc(db, "likes-counter", "likes");
		// post dislike
		if (params.liked_yet) {
			await updateDoc(likesRef, {
				[params.collection]: increment(-1),
			}).then(() => {
				console.log(`posted dislike in: ${params.collection}`);
				image.src = "./img/heart.svg";
				params.liked_yet = false;
				button.disabled = false;
			});
			// post like
		} else {
			await updateDoc(likesRef, {
				[params.collection]: increment(1),
			}).then(() => {
				console.log(`posted like in: ${params.collection}`);
				image.src = "./img/heart-red.svg";
				params.liked_yet = true;
				button.disabled = false;
			});
		}

		localStorage.setItem(params.collection, params.liked_yet);
		console.log(`saved: ${params.collection} /// like: ${params.liked_yet}`)
	};
});

document.getElementById('reset').addEventListener('click', () => {

	const likesRef = doc(db, "likes-counter", "likes");
	buttons.forEach(el => {

		let img = document.getElementById(el.img_id)
		let button = document.getElementById(el.btn_id)

		updateDoc(likesRef, {
			[el.collection]: 0,
		}).then(() => {
			img.src = "./img/heart.svg";
			el.liked_yet = false;
			localStorage.setItem(el.collection, el.liked_yet);
			console.log(`${el.collection} reset to zero`);
			button.disabled = false;
		});		
	});
})