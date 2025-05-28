class Search extends ItemList{
    constructor(){
        super();
    }

    async onLoadElements(query){
        this.query = query;
        var response = await fetch('../data/webpages.json');
        var json = await response.json();

        this.count = Object.keys(json.item).length;

        var queryStr = query.get("search");

        var resultList = document.getElementById('search-results');
        var resultHeading = document.getElementById('search-heading');

        resultList.innerHTML = "";

        console.log(resultHeading);
        console.log("Count: " + this.count);

        var resultCtr = 0

        for(let i = this.beginRange; i < this.count; i++){
            // Validate to check if the next item is not null.
            if(json.item[i] == null){
                continue;
            }
            if(resultCtr == 15){
                this.stepRange = i - this.beginRange;
                this.beginRange = resultCtr;
                break;
            }

            if(json.item[i].webpage.match(new RegExp(queryStr, "i")) == null){
                continue;
            }

            let currentDiv = document.createElement("div");
            currentDiv.setAttribute("class", "secondary-card clickable");
            currentDiv.onclick = () => {
                window.location.href = json.item[i].link;
            };

            let currentTitle = document.createElement("p");
            currentTitle.setAttribute("class", "title");
            currentTitle.innerHTML = json.item[i].webpage;

            let currentDescription = document.createElement("p");
            currentDescription.setAttribute("class", "description");
            currentDescription.innerHTML = json.item[i].link;

            currentDiv.appendChild(currentTitle);
            currentDiv.appendChild(currentDescription);

            resultList.appendChild(currentDiv);

            resultCtr++;
        }

        if(resultCtr == 0){
            resultHeading.innerHTML = "No search results for " + queryStr;
        }else{
            //Make the result text plural if possible.
            let resultText = "result";
            if(resultCtr > 1){
                resultText = "results";
            }

            //Set the result heading.
            resultHeading.innerHTML = "Showing " + resultCtr + " " + resultText + ' for "' + queryStr + '"';
        }
    }
}

var search = null;

document.addEventListener("DOMContentLoaded", () => {
    search = new Search();

    const query = new URLSearchParams(window.location.search);
    search.onLoadElements(query);
});