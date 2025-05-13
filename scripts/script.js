var menuToggled = false;

// Loads page parts. Requires servers such as XAMPP in order to work.
function loadPagePart(filepath, containerId){
    fetch(filepath)
        .then(response => response.text())
        .then(html => {
            const element = document.getElementById(containerId);
            element.innerHTML = html;
        })
        .catch(error => {
            console.log('Failed loading element:', error.message);
        });
}

// Obtains URL parameters. FOr example, www.url.com?query=Sample has query parameter with value "Sample".
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