function toggleSection(sectionId) {
  const content = document.getElementById(sectionId + '-content');
  const btn = document.getElementById(sectionId + '-btn');
  // Check if the section you click is currently expanded 
  if (content.classList.contains('active')) {
    // if the section is active, this "if" will close the section
    content.classList.remove('active');
    btn.classList.remove('active');
    btn.textContent = '+';
  } else {
    // if the section is not active, this "else" will expand a section
    content.classList.add('active');
    btn.classList.add('active');
    btn.textContent = '+';
  }
}
