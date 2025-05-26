var menuToggled = false;

// Loads page parts. Requires servers such as XAMPP in order to work.
async function loadPagePart(filepath, containerId){
    var result = false;

    fetch(filepath)
        .then(response => response.text())
        .then(html => {
            const element = document.getElementById(containerId);
            element.innerHTML = html;
            result = true;
        })
        .catch(error => {
            console.log('Failed loading element:', error.message);

            result = false;
        });

    return result;
}

// Obtains URL parameters. For example, www.url.com?query=Sample has query parameter with value "Sample".
function getUrlParam(url, parameter){
    const urlParams = new URLSearchParams(url);

    return urlParams.get(parameter);
}

// Toggle for mobile toolbar.
function onMenuToggle(menuItemId, style){
    var menuItem = Array.from(document.getElementsByClassName(menuItemId));

    if(!menuToggled){
        menuItem.forEach(items => {
            items.style.display = style;
        });
        menuToggled = true;
    }else{
        menuItem.forEach(items => {
            items.style.display = 'none';
        });
        menuToggled = false;
    }
}

function nav(url){
    window.location.href = url;
}