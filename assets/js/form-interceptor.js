(function() {
    // Inject custom toast notifications styling for success feedback
    var style = document.createElement('style');
    style.innerHTML = `
        .ozotrips-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #ffffff;
            color: #1e293b;
            padding: 16px 24px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
            border-left: 5px solid #25d366;
            z-index: 9999999 !important;
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Rubik', sans-serif;
            font-size: 14.5px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ozotrips-toast.show {
            transform: translateY(0);
            opacity: 1;
        }
        .ozotrips-toast-icon {
            color: #25d366;
            font-size: 20px;
            font-weight: bold;
        }
        .ozotrips-toast-message {
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    // Create toast DOM
    var toast = document.createElement('div');
    toast.className = 'ozotrips-toast';
    toast.innerHTML = '<span class="ozotrips-toast-icon">✓</span><span class="ozotrips-toast-message" id="ozotripsToastMsg">Form submitted successfully!</span>';
    document.body.appendChild(toast);

    function showToast(message, isError) {
        var msgSpan = document.getElementById('ozotripsToastMsg');
        msgSpan.textContent = message;
        toast.style.borderLeftColor = isError ? '#ef4444' : '#25d366';
        toast.querySelector('.ozotrips-toast-icon').textContent = isError ? '✗' : '✓';
        toast.querySelector('.ozotrips-toast-icon').style.color = isError ? '#ef4444' : '#25d366';
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, 4000);
    }

    // Intercept form submissions
    document.addEventListener('submit', function(e) {
        var form = e.target;

        // Skip search or dynamic filters
        if (form.classList.contains('flight-search-form') || form.action.includes('search')) {
            return;
        }

        e.preventDefault();
        
        var formData = new FormData(form);
        var data = {};
        
        formData.forEach(function(value, key) {
            if (value instanceof File) {
                // Skip file inputs for standard JSON payload, or convert to metadata
                if (value.name) {
                    data[key] = "[File: " + value.name + " (" + value.size + " bytes)]";
                }
            } else {
                if (data[key]) {
                    if (!Array.isArray(data[key])) {
                        data[key] = [data[key]];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            }
        });

        // Add submission metadata
        data._formId = form.id || form.className || 'unnamed-form';
        data._pageTitle = document.title;
        data._pageUrl = window.location.pathname;
        data._submittedAt = new Date().toISOString();

        // Button feedback
        var submitBtn = form.querySelector('[type="submit"], button:not([type="button"])');
        var originalBtnText = '';
        if (submitBtn) {
            originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Inquiry... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        }

        // Call the unified OzoDB client helper
        if (window.OzoDB) {
            window.OzoDB.addSubmission(data)
                .then(function() {
                    showToast('Inquiry submitted! Our representative will contact you shortly.', false);
                    form.reset();
                })
                .catch(function() {
                    showToast('Submission error. Please try again.', true);
                })
                .finally(function() {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                });
        } else {
            // LocalStorage direct backup
            var submissions = JSON.parse(localStorage.getItem('ozotrips_submissions') || '[]');
            data.id = Date.now().toString();
            submissions.unshift(data);
            localStorage.setItem('ozotrips_submissions', JSON.stringify(submissions));
            
            showToast('Saved successfully! Our representative will contact you shortly.', false);
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    }, true);
})();
