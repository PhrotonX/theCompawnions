document.addEventListener("DOMContentLoaded", () => {
    // Add link tooltip for every anchor tag.
    var anchorTags = document.getElementsByTagName("a");

    for(let anchorTag of anchorTags){
        anchorTag.addEventListener("mouseenter", (event) => {
            var tooltip = document.createElement("dialog");
            tooltip.setAttribute("class", "tooltip");

            var title = document.createElement("p");
            var link = document.createElement("p");

            title.innerHTML = anchorTag.innerHTML;
            link.innerHTML = anchorTag.getAttribute("href");

            // const anchorRect = anchorTag.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            // console.log(window.innerWidth + "x" + window.innerHeight);

            var x = event.clientX - (window.innerWidth / 2);
            var y = event.clientY + 80;
            // console.log("new x: " + x / 2);
            // console.log("x: " + x + ", y: " + y);
            // console.log("window.innerWidth: " + window.innerWidth / 2 + ", window.innerHeight: " + window.innerHeight / 2);

            // Check if the tooltip clips to the left.
            if(x + tooltipRect.width < (x + tooltipRect.width / 2)){
                x = -(x + tooltipRect.width) / 2;
            }
            // Check if the tooltip clips to the right
            if(x + tooltipRect.width < (-x / 2)){
                x = (x + window.innerWidth);
            }

            // console.log("calculated x: " + x + ", y: " + y);
            
            tooltip.style.left = `calc(${x}px / 1.25)`;
            tooltip.style.top = `${y}px`;

            tooltip.appendChild(title);
            tooltip.appendChild(link);

            anchorTag.appendChild(tooltip);

            console.log(tooltip);


        });
        anchorTag.addEventListener("mouseleave", (event) => {
            anchorTag.removeChild(anchorTag.querySelector("dialog"));
        });
    }
});