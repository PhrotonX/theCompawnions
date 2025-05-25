class Gallery{
    constructor(){
        this.beginRange = 0;
        this.endRange = 15;
        this.count = 0;
        this.rangeSize = 16;
    }

    async onLoadElements(query){
        var response = await fetch('../data/information.json');
        var json = await response.json();

        this.count = Object.keys(json.item).length;

        const table = document.getElementById('gallery-table');

        table.innerHTML = "";
        
        console.log("Count: " + this.count);

        var currentTr = null;
        var resultCtr = 0
        // Fill the table from HTML with contents.
        for(let i = this.beginRange; i <= this.endRange; i++){
            // Validate to check if the next item is not null.
            if(json.item[i] == null){
                return;
            }

            // Filters the resulting JSON file based on query parameter.
            if(query != null){
                let queryStr = query.get("gallery-search");
                let queryFilter = query.get("gallery-filter");
                switch(queryFilter){
                    case "breed":
                        if(json.item[i].breed.match(new RegExp(queryStr, "i")) == null){
                            continue;
                        }
                        break;
                    case "gender":
                        //console.log(new RegExp(queryStr, "i"));
                        console.log(json.item[i].gender + " and " + queryStr);
                        if(json.item[i].gender != queryStr){
                            continue;
                        }
                        break;
                    case "age":
                        if(json.item[i].age.match(new RegExp(queryStr, "i")) == null){
                            continue;
                        }
                        break;
                }

                //if(queryFilter == "gender"){
                    
                //}
            }

            // If the current item is in 0 or fifth index then make a new table row.
            if((resultCtr % 4) == 0){
                currentTr = document.createElement("tr");
            }
            
            var currentTd = document.createElement("td");

            var currentDiv = document.createElement("div");
            currentDiv.setAttribute("class", "gallery-item clickable");

            // Set the image.
            var img = document.createElement("img");
            img.src = json.item[i].image.src;
            img.setAttribute("alt", json.item[i].image.alt);
            currentDiv.appendChild(img);

            // Set the properties.
            var breed = document.createElement("p");
            breed.innerHTML = "Breed:" + json.item[i].breed;
            currentDiv.appendChild(breed);

            var gender = document.createElement("p");
            gender.innerHTML = "Gender:" + json.item[i].gender;
            currentDiv.appendChild(gender);

            var age = document.createElement("p");
            age.innerHTML = "Age:" + json.item[i].age;
            currentDiv.appendChild(age);

            currentTd.appendChild(currentDiv);
            // Append the items into the table row.
            currentTr.appendChild(currentTd);

            // If the current item is in the fifth column, then append the row into the table.
            if((i % 4) == 0){
                table.appendChild(currentTr);
            }

            resultCtr++;
        }

        //var countInfo = document.getElementById("gallery-page-info");
        //countInfo.innerHTML = "Showing 16 out of " + this.count + " items";
    }

    nextPage(){
        if(this.beginRange + this.rangeSize <= this.count){
            this.beginRange += this.rangeSize;
            this.endRange += this.rangeSize;

            this.onLoadElements(null);
        }
    }

    prevPage(){
        if(this.beginRange - this.rangeSize >= 0){
            this.beginRange -= this.rangeSize;
            this.endRange -= this.rangeSize;

            this.onLoadElements(null);
        }
    }
}

var gallery = null;

document.addEventListener("DOMContentLoaded", function(){
    gallery = new Gallery();

    const query = new URLSearchParams(window.location.search);
    // var param = url.get("gallery-search");
    // var type = url.get("gallery-filter");
    gallery.onLoadElements(query);
});