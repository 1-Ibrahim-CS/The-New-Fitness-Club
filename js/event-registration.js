

document.addEventListener('DOMContentLoaded', function() {
    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // Add click event to each button
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the event title from the closest ancestor row
            const eventRow = this.closest('tr');
            const eventTitle = eventRow.querySelector('.event-title').textContent;
            const eventDate = eventRow.querySelector('.event-date').textContent;
            
            // Create and show modal
            showRegistrationModal(eventTitle, eventDate);
        });
    });

    // Function to create and display modal
    function showRegistrationModal(eventTitle, eventDate) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>Register for ${eventTitle}</h2>
            <p>Event Date: ${eventDate}</p>
            <form id="eventRegistrationForm">
                <div class="form-group">
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label>Membership Status:</label>
                    <label><input type="radio" name="membership" value="member" checked> Member</label>
                    <label><input type="radio" name="membership" value="nonmember"> Non-Member</label>
                </div>
                <button type="submit" class="submit-button">Complete Registration</button>
            </form>
        `;
        
        // Add modal to page
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Add close functionality
        const closeButton = modalContent.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
        
        // Close when clicking outside modal
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
        
        // Handle form submission
        const form = modalContent.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                eventTitle: eventTitle,
                eventDate: eventDate,
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                phone: form.querySelector('#phone').value,
                membership: form.querySelector('input[name="membership"]:checked').value
            };
            // Store in localStorage
            saveRegistration(formData)    
            // Show confirmation message
            modalContent.innerHTML = `
                <h2>Registration Complete!</h2>
                <p>Thank you for registering for ${eventTitle}.</p>
                <p>We've sent a confirmation email to ${formData.email}.</p>
                <p>See you on ${eventDate}!</p>
                <button class="submit-button close-confirmation">Close</button>
            `;
            
            // Add close button functionality
            modalContent.querySelector('.close-confirmation').addEventListener('click', function() {
                document.body.removeChild(modalOverlay);
            });
        });
    }
    
    // Function to save registration data
    function saveRegistration(data) {
        // Get existing registrations or initialize empty array
        let registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];
        
        // Add new registration with timestamp
        data.registeredAt = new Date().toISOString();
        registrations.push(data);
        
        // Save back to localStorage
        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    }
});





