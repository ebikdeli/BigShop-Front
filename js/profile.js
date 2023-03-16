// * Activate related profile content section for clicked icon
const iconList = document.querySelector('.profile-icons-list');

iconList.addEventListener('click', e => {
    e.preventDefault();
    const icons = document.querySelectorAll('.profile-icons-list > i');
    const profileContentSections = document.querySelectorAll('.profile-content > div');
    
    if(e.target.tagName == 'I' && !e.target.classList.contains('active')){
        // Disable display of current profile content section
        Array.from(icons).forEach(iconNode => {
            profileContentSections.forEach(profileContentNode => {
                profileContentNode.classList.remove('active');
                // Display related contents based on selected icon (Actually this is could be the last step but this way is more optimal)
                if(profileContentNode.getAttribute('data-icon-content') == e.target.getAttribute('data-icon-content')){
                    profileContentNode.classList.add('active');
                }
            })
            // Disable current selected icon from icon list
            iconNode.classList.remove('active');
        })
        // Enlarge clicked icon from icon list
        e.target.classList.add('active');
    }
})
