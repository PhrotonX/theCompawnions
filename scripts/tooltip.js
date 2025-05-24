document.addEventListener("DOMContentLoaded", () => {
    // Add link tooltip for every anchor tag.
    var anchorTags = document.getElementsByTagName("a");

    for(let anchorTag of anchorTags){
        let timeout = null;
        anchorTag.addEventListener("mouseenter", (event) => {
            timeout = setTimeout(() => {
                var tooltip = document.createElement("dialog");
                tooltip.setAttribute("class", "tooltip");

                var title = document.createElement("p");
                var link = document.createElement("p");

                title.innerHTML = anchorTag.innerHTML;
                link.innerHTML = anchorTag.getAttribute("href");

                tooltip.appendChild(title);
                tooltip.appendChild(link);

                anchorTag.appendChild(tooltip);

                // const anchorRect = anchorTag.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();

                // Get the mouse position and offsets.
                var yOffset = 80;

                var x = event.clientX - (window.innerWidth / 2); // Decrease the clientX to get the mouse position more approximate.
                var y = event.clientY + yOffset; // Offset by 80 to see the element being hovered.

                var calculatedHeightQuotient = window.innerHeight / (y + tooltipRect.height);
                var calculatedHeight = window.innerHeight / calculatedHeightQuotient;
                var calculatedHeightToSubtract = calculatedHeight - window.innerHeight;
                var offlimitsY = (calculatedHeightToSubtract - window.innerHeight) * -1;

                // Logs for the first half. x < 0
                // console.log("-(x / 4): " + -(x / 4));
                // console.log("x: " + x);
                // console.log("x + -tooltipRect.width: " + (x + -(tooltipRect.width / 4)));
                // console.log("-window.innerWidth / 2: " + -window.innerWidth / 2);
                // console.log("window.innerWidth / 8: " + window.innerWidth / 6);

                // Logs for the second half. x > 0
                // console.log("(x / 4): " + (x / 4));
                // console.log("x: " + x);
                // console.log("x + tooltipRect.width: " + (x + -(tooltipRect.width / 4)));
                // console.log("window.innerWidth / 2: " + window.innerWidth / 2);
                // console.log("-window.innerWidth / 8: " + -window.innerWidth / 6);

                // Logs for the second half. y > 0
                // console.log("(y / 4): " + (y / 4));
                // console.log("y: " + y);
                // console.log("y + tooltipRect.height: " + (y + (tooltipRect.height / 4)));
                // console.log("window.innerHeight: " + window.innerHeight);
                // console.log("calculatedHeightToSubtract: " + calculatedHeightToSubtract);
                // console.log("offLimitsY: " + offlimitsY);

                // Check if the tooltip clips to the left in the first half of screen.
                if(x < 0){
                    if(x + -tooltipRect.width < -window.innerWidth / 2){
                        x = -(window.innerWidth / 2) + (window.innerWidth / 6);
                    }
                }else if(x > 0){
                    //Check if the tooltip clips to the right in the second half of screen.
                    if(x + tooltipRect.width > window.innerWidth / 2){
                        x = (window.innerWidth / 2) - (window.innerWidth / 6);
                    }
                }

                //Check if the tooltip clips to the bottom.
                if(y > offlimitsY){
                    console.log(y - (yOffset * 2));
                    y = y - (yOffset * 2);
                }
                
                // Set the calculated positions.
                tooltip.style.left = `calc(${x}px / 1.25)`; // Set additional offset to avoid pushing the tooltip away from the center.
                tooltip.style.top = `${y}px`;

                // console.log(tooltip);
            }, 500);
        });
        anchorTag.addEventListener("mouseleave", (event) => {
            clearTimeout(timeout);

            const dialog = anchorTag.querySelector("dialog");
            if(dialog != null){
                anchorTag.removeChild(dialog);
            }
            
        });
    }
});