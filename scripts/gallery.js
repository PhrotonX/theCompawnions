class Gallery extends ItemList{
    constructor(){
        super();
    }

    async onLoadElements(query){
        this.query = query;
        var response = await fetch('../data/information.json');
        var json = await response.json();

        this.count = Object.keys(json.item).length;

        var queryStr = query.get("gallery-search");
        var queryFilter = query.get("gallery-filter");

        const card = document.getElementById('gallery-table-card');

        let resultInfo = document.createElement("h2");
        resultInfo.innerHTML = "All images";

        console.log(resultInfo);
        if(queryStr != null || queryStr != "null" || queryStr != ""){
            resultInfo.innerHTML = "Results for '" + queryStr + "'";
        }

        const table = document.getElementById('gallery-table');

        table.innerHTML = "";

        table.appendChild(resultInfo);
        
        console.log("Count: " + this.count);

        var currentTr = null;
        var resultCtr = 0

        // Fill the table from HTML with contents.
        //for(let i = this.beginRange; i <= this.endRange; i++){
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

            // Filters the resulting JSON file based on query parameter.
            if(query != null){
                switch(queryFilter){
                    case "breed":
                        if(json.item[i].breed.match(new RegExp(queryStr, "i")) == null){
                            continue;
                        }
                        break;
                    case "gender":
                        console.log(json.item[i].gender + " and " + queryStr);
                        if(json.item[i].gender != queryStr){
                            continue;
                        }
                        break;
                    case "age":
                        if(json.item[i].age != queryStr){
                            continue;
                        }
                        break;
                }
            }

            
            // If the current item is in 0 or fifth index then make a new table row.
            if((resultCtr % 4) == 0){
                currentTr = document.createElement("tr");
            }
            
            var currentTd = document.createElement("td");

            let currentDiv = document.createElement("div");
            currentDiv.setAttribute("class", "secondary-card clickable image-dialog-opener");
            currentDiv.onclick = () => {
                imgDialog.openDialog(currentDiv);
            };

            let currentDivDescription = document.createElement("div");
            currentDivDescription.setAttribute("class", "item-description");


            // Set the image.
            var img = document.createElement("img");
            img.src = json.item[i].image.src;
            img.setAttribute("alt", json.item[i].image.alt);
            currentDiv.appendChild(img);

            // Set the properties.
            var breed = document.createElement("p");
            breed.innerHTML = "Breed: " + json.item[i].breed;
            currentDivDescription.appendChild(breed);

            var gender = document.createElement("p");
            gender.innerHTML = "Gender: " + json.item[i].gender;
            currentDivDescription.appendChild(gender);

            var age = document.createElement("p");
            age.innerHTML = "Age: " + json.item[i].age;
            currentDivDescription.appendChild(age);

            currentDiv.appendChild(currentDivDescription);

            currentTd.appendChild(currentDiv);
            // Append the items into the table row.
            currentTr.appendChild(currentTd);

            // If the current item is in the fifth column, then append the row into the table.
            if((resultCtr % 4) == 0){
                table.appendChild(currentTr);
            }

            resultCtr++;
        }

        //var countInfo = document.getElementById("gallery-page-info");
        //countInfo.innerHTML = "Showing 16 out of " + this.count + " items";


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