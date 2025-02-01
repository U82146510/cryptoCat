function updateLink() {
    const linkElement = document.getElementById('linkText');
    const currentUrl = window.location.href;

    // Update the link's href and text content
    linkElement.href = currentUrl;
    linkElement.textContent = currentUrl;
};
updateLink();

async function copy_the_link(){
    try {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        alert('Link copied to clipboard');
    } catch (error) {
        alert('Failed to copy the link. Please try again.');
    }
}