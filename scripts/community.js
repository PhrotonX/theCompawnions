let currentLink = '';

// Function to open the expanded view with given content
function openExpanded(name, description, imageSrc, link) {
    document.getElementById('expandedName').textContent = name;
    document.getElementById('expandedDescription').textContent = description;
    document.getElementById('expandedImage').src = imageSrc;
    currentLink = link;
    const linkButton = document.querySelector('.link-button');
    linkButton.href = link;
    document.querySelector('.expanded-view').classList.add('active');
    document.querySelector('.overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close the expanded view and restore normal state
function closeExpanded() {

    document.querySelector('.expanded-view').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeExpanded();
    }
});
