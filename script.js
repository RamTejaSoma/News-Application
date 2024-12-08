// const API_KEY="e05f4c4b2d844dbfbd7f3afea0ffcc6b";
const API_KEY2="cfc5d92bb0cc00bfa1d6617ab25c91e9";
// const url="https://newsapi.org/v2/everything?q=";
const url2="https://gnews.io/api/v4/search?q=";

window.addEventListener("load",()=>fetchnews("Telangana"));

function reload() {
    window.location.reload();
}

async function fetchnews(query){
    const response= await fetch(`${url2}${query}&token=${API_KEY2}` );

    const data= await response.json();
    console.log(data);
    binddata(data.articles);
}
function binddata(articles){
    const template=document.querySelector(".template")
    const cardscontainer=document.querySelector(".card-container")
    cardscontainer.innerHTML = "";

   articles.forEach((article) => {
    if(!article.image){
        return ;
    }
    const cardclone=template.content.cloneNode(true);
    filldataincontainner(article,cardclone);

cardscontainer.appendChild(cardclone);


   });

}

function filldataincontainner(article,cardclone){
    const image=cardclone.querySelector("#news-img");
    const newstitle=cardclone.querySelector("#news-title");
    const newssource=cardclone.querySelector("#news-source");
    const newsdesc=cardclone.querySelector("#news-desc");

   image.src = article.image;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newssource.innerHTML=`${article.source.name} . ${date}`;
    
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url, "_blank")
    })
    
}
const searchbutton=document.querySelector(".search-button");
const searchtext=document.querySelector(".news-input");

searchbutton.addEventListener("click",()=>{
    const query=searchtext.value;
    if (!query) return;
    fetchnews(query);
    navitemselected.classList.remove("active");
    navitemselected=null;

})

let navitemselected=null;
function onNavItemClick(id){
    fetchnews(id);
    const navitem =document.getElementById(id)
    
        navitemselected?.classList.remove("active");
        
    
    navitemselected=navitem;
    navitemselected.classList.add("active");

}



