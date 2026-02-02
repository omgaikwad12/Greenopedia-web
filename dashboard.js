// Function to update dashboard values manually
function updateDashboard(plants, tasks, identified) {
    document.getElementById('total-plants').innerText = plants;
    document.getElementById('care-tasks').innerText = tasks;
    document.getElementById('identified-count').innerText = identified;
}

// Example usage: Update these values based on user data
updateDashboard(3, 3, 2);

// Handle Edit Profile click
document.querySelector('.btn-outline').addEventListener('click', () => {
    alert('Redirecting to Profile Settings...');
});