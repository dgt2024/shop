let reviews;
const block = document.getElementById('reviews-public');
const loading = document.getElementById('loading');
const review_div = document.getElementById('reviews-public');
const send_rev = document.getElementById('rev-send');
const rev_name = document.getElementById('rev-name');
const rev_review = document.getElementById('rev-rev');
send_rev.addEventListener('click', function() {
	loadReview(rev_name.value, rev_review.value, document.querySelector("input[name=\"star\"]:checked").id[4]);
	rev_name.value = '';
	rev_review.value = '';
	review_div.innerHTML = '';
	main();
});
async function loadReview(name, review, rating) {
	await fetch(`https://script.google.com/macros/s/AKfycbwtQMbikRLT9NTDt1cTe_vH-Uo1vf1zNSVx4SLcOTVgOpMTXPOF6GazomZYIbxM9uawCA/exec?name=${name}&review=${review}&rating=${rating}`);
}
async function loadReviews() {
	const res = await fetch('https://script.google.com/macros/s/AKfycbwtQMbikRLT9NTDt1cTe_vH-Uo1vf1zNSVx4SLcOTVgOpMTXPOF6GazomZYIbxM9uawCA/exec');
	reviews = await res.json();
}
async function main() {
	block.style.display = 'none';
	loading.style.display = 'flex';
	await loadReviews();
	block.style.display = 'flex';
	loading.style.display = 'none';
	console.log(reviews);
	for(let i = 0; i < reviews.length; i++) {
		let rating_date = '';
		for(let x = 0; x < reviews[i][2]; x++) {
			rating_date += '★';
		}
		for(let x = 0; x < 5 - reviews[i][2]; x++) {
			rating_date += '☆';
		}
		review_div.innerHTML = `
			<div class="rev"><p>${reviews[i][0]}</p><p>${reviews[i][1]}</p><p>${rating_date}</p></div>
		` + review_div.innerHTML;
	}
}
main();