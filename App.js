const apiKey = '3a08b62d7bfd4cf295f119025ba8a850'
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#source-selector');
const defaultSource = 'techcrunch';

window.addEventListener('load', async e => {
	updateNews();
	await updateSources();
	sourceSelector.value = defaultSource;
})

async function updateSources() {
	try {
		const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
		if (response.ok) {
			const json = await response.json();

			sourceSelector.innerHTML = json.sources
				.map(src => `<option value="${src.id}">${src.name}</option> `)
				.join('\n');
		}
		throw new Error('Request Failed!');
	} catch (error) {
		console.log(error);
	}
}

async function updateNews(source = defaultSource ) {
	try {
		const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
		if (response.ok) {
			const json = await response.json();

			main.innerHTML = json.articles.map(createArticle).join('\n');
		}
		throw new Error('Request Failed!');
	} catch (error) {
		console.log(error);
	}
}

function createArticle(article) {
	return (`
		<div class="article">
			<a href="${article.url}">
				<h2>${article.title}</h2>
				<img src="${article.urlToImage}" alt="${article.title}">
				<p>${article.description}</p>
			</a>
		</div>
	`);
}
