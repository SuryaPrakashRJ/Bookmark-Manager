let mySite = []

const inputBox = document.getElementById("input-box")
const inputBtn = document.getElementById("input-btn")
const ulList = document.getElementById("ul-list")
const deleteBtn = document.getElementById("delete-btn")
const urlBtn = document.getElementById("url-btn")

let savedSiteInLocalStorage = JSON.parse(localStorage.getItem("mySites"))
if(savedSiteInLocalStorage){
    mySite = savedSiteInLocalStorage
    renderSites(mySite)
}



inputBtn.addEventListener("click", function saveSite(){
    mySite.push(inputBox.value)
    localStorage.setItem("mySites", JSON.stringify(mySite))
    inputBox.value=""
    renderSites(mySite)
    
})

urlBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        mySite.push(tabs[0].url)
        localStorage.setItem("mySites", JSON.stringify(mySite))
        renderSites(mySite)
    })


})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    mySite = []
    renderSites(mySite)
})


function renderSites (site) {
    let siteItems = ""
    for(let i=0;i<site.length;i++){
        // siteItems += "<li> <a target='_blank' href='" + mySite[i] + "' style='text-decoration: none; '>" + mySite[i] +"</a> </li>"
        siteItems += `<li>
        <a href="${site[i]}" target="_blank" style= "text-decoration:none;">
        ${site[i]}
        </a>
        </li>`
     }
    ulList.innerHTML = siteItems 
}
  