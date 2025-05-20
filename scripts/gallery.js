class Gallery{
    constructor(){

    }

    async onLoadElements(){
        var response = await fetch('../data/information.json');
        var json = await response.json();

        const count = Object.keys(json.item).length;

        const table = document.getElementById('gallery-table');
        
        console.log("Count: " + count);

        var currentTr = null;
        // Fill the table from HTML with contents.
        for(let i = 0; i < count; i++){
            // If the current item is in the 0 or third 
            if((i % 3) == 0){
                currentTr = document.createElement("tr");
            }
            
            var currentTd = document.createElement("td");

            var currentDiv = document.createElement("div");
            currentDiv.setAttribute("class", "gallery-item");

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

            // If the current item is in the first third column, then append the row into the table.
            if((i % 3) == 0){
                table.appendChild(currentTr);
            }
        }
    }
}

var gallery = null;

document.addEventListener("DOMContentLoaded", function(){
    gallery = new Gallery();
    gallery.onLoadElements();
});