const API_KEY = "dcaaff525ad0493e911ac0551eddbbee";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));
function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    
    bindData(data.articles); 
}

function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");

    cardsContainer.innerHTML= "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        //to fill the data in cards
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    //it is done by query selector
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    //src lena hai
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML = article.description;

    //Date lena
    const date= new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    //handling the click if user want to go the orginal url
    cardClone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url, "_blank");
        //blank means new tap
    });
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    //curselectednav agar null nahi hai 
    //remove purani active class
    //add new navitem
    //curnav ko active kardo
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

//jab bhi search par click ho toh yeh 
// aynonemus function chale
searchButton.addEventListener('click' ,() =>{
    const query = searchText.value;
    //if user ese hi bas search tab hit kar de
    if(!query) return;
    fetchNews(query);
    //also handle current 
    //active state
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
} )