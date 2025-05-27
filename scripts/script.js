var menuToggled = false;

// Loads page parts. Requires servers such as XAMPP in order to work.
async function loadPagePart(filepath, containerId){
    try{
        const response = await fetch(filepath);
        const html = await response.text();
        const element = document.getElementById(containerId);
        element.innerHTML = html;
        return true;
    }catch(error){
        console.log('Failed loading element:', error.message);
        return false;
    }
}

async function loadToolbar(currentPage){
    await loadPagePart('toolbar.html', 'toolbar');

    var listItem = document.getElementById(currentPage);
    if(listItem){
        // console.log(listItem);
        listItem.classList.add('selected');
        var navBar = document.getElementsByTagName('nav').item(0);
        if(navBar){
            navBar.style.borderBottom = "2px var(--fifth-color) solid";
        }
    }
    
    window.addEventListener("resize", () => {
        if(window.innerWidth > 1000){
            var toolbarItems = document.getElementsByClassName("nav-toggled");
            for(item of toolbarItems){
                item.style.top = 0;
                item.classList.remove("nav-toggled");
            }
        }
        
    });
}

// Obtains URL parameters. For example, www.url.com?query=Sample has query parameter with value "Sample".
function getUrlParam(url, parameter){
    const urlParams = new URLSearchParams(url);

    return urlParams.get(parameter);
}

// Toggle for mobile toolbar.
function onMenuToggle(menuItemId){
    var menuItem = Array.from(document.getElementsByClassName(menuItemId));

    var em = 3;
    if(!menuToggled){
        menuItem.forEach(items => {
            items.classList.add("nav-toggled");
            // items.style.display = 'block';
            items.style.width = '100%';
            items.style.top = em + "em";
            em += 3;
        });
        menuToggled = true;
    }else{
        menuItem.forEach(items => {
            items.classList.remove("nav-toggled");
            // items.style.display = 'none';
        });
        menuToggled = false;
    }
}

function nav(url){
    window.location.href = url;
}