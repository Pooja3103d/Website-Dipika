document.addEventListener('DOMContentLoaded', (event) => {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackDisplay = document.getElementById('feedback-display');

    // Load feedback from local storage and display it
    const loadFeedback = () => {
        const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackDisplay.innerHTML = '<h2>Recent Feedback</h2>';
        feedbackList.forEach(feedback => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            feedbackItem.innerHTML = `
                <strong>${feedback.firstName} ${feedback.lastName}</strong>
                <p>${feedback.comment}</p>
            `;
            feedbackDisplay.appendChild(feedbackItem);
        });
    };

    // Save feedback to local storage
    const saveFeedback = (feedback) => {
        const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    };

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('name').value;
        const lastName = document.getElementById('lname').value;
        const comment = document.getElementById('comment').value;

        const feedback = { firstName, lastName, comment };

        saveFeedback(feedback);
        loadFeedback();

        feedbackForm.reset();
    });

    loadFeedback(); // Initial load of feedback from local storage
});
