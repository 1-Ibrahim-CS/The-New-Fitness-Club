$(document).ready(function() {
    const $contactForm = $('#contactForm');
    const $successMessage = $('#successMessage');
    
    // Form validation
    $contactForm.validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },
            subject: "required",
            message: "required"
        },
        messages: {
            name: "Please enter your name",
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            phone: "Please enter a valid phone number",
            subject: "Please select a subject",
            message: "Please enter your message"
        },
        submitHandler: function(form) {
            // Store data in localStorage
            storeFormData();
            
            // Show success message
            $successMessage.fadeIn().delay(5000).fadeOut();
            
            // Reset form
            $contactForm[0].reset();
            
            return false;
        }
    });
    
    // Function to store form data in localStorage
    function storeFormData() {
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
            timestamp: new Date().toISOString()
        };
        
        // Get existing submissions or initialize empty array
        let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        
        // Add new submission
        submissions.push(formData);
        
        // Save back to localStorage
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    }
});



$('#message').keyup(function() {
    const charCount = $(this).val().length;
    if (!$('#charCount').length) {
        $(this).after('<div id="charCount" class="char-count">Characters: ' + charCount + '</div>');
    } else {
        $('#charCount').text('Characters: ' + charCount);
    }
});

