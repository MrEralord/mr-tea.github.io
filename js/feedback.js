(() => {

    // =========================================================
    // GOOGLE APPS SCRIPT WEB APP URL
    // =========================================================

    const FEEDBACK_ENDPOINT =
        'https://script.google.com/macros/s/AKfycbwV4naxd6fgVCiykasWNwDL7yOiSHN4qzt23sQIDnAEP196EDb2lfEbl3y7qVZ1jPjL/exec'

    // =========================================================
    // ELEMENTS
    // =========================================================

    const form = document.getElementById('feedback-form');

    if (!form) return;

    const extra = document.getElementById('feedback-extra');
    const submitButton = document.getElementById('feedback-submit');
    const status = document.getElementById('feedback-status');

    const ratingInputs =
        form.querySelectorAll('input[name="rating"]');


    // =========================================================
    // SHOW DETAILS AFTER RATING
    // =========================================================

    ratingInputs.forEach(input => {

        input.addEventListener('change', () => {

            extra.hidden = false;

            status.textContent = '';
            status.className = 'feedback-status';

        });

    });


    // =========================================================
    // SUBMIT
    // =========================================================

    form.addEventListener('submit', async (event) => {

        event.preventDefault();


        if (!form.reportValidity()) {
            return;
        }


        if (
            !FEEDBACK_ENDPOINT ||
            FEEDBACK_ENDPOINT.includes(
                'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
            )
        ) {

            status.textContent =
                'Feedback endpoint has not been configured yet.';

            status.className =
                'feedback-status error';

            return;
        }


        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

        status.textContent = '';
        status.className = 'feedback-status';


        // =======================================================
        // PREPARE DATA
        // =======================================================

        const formData = new FormData(form);

        formData.set(
            'page_url',
            window.location.href.split('#')[0]
        );

        formData.set(
            'page_title',
            document.title
        );

        formData.set(
            'language',
            document.documentElement.lang ||
            navigator.language ||
            ''
        );

        formData.set(
            'referrer',
            document.referrer || ''
        );


        // Convert FormData to URL encoded POST data.
        // This works well with Google Apps Script doPost(e).
        const payload = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            payload.append(key, value);
        }


        // =======================================================
        // SEND
        // =======================================================

        try {

            await fetch(
                FEEDBACK_ENDPOINT,
                {
                    method: 'POST',
                    mode: 'no-cors',
                    body: payload
                }
            );


            // Google Apps Script returns an opaque response because
            // the request is cross-origin. If fetch completes,
            // we show the confirmation to the visitor.

            status.innerHTML =
                '<i class="fas fa-check-circle"></i> Thanks! Feedback sent.';

            status.className =
                'feedback-status success';


            form.reset();

            extra.hidden = true;


        } catch (error) {

            console.error(
                'Feedback submission error:',
                error
            );

            status.innerHTML =
                '<i class="fas fa-circle-exclamation"></i> ' +
                'Could not send feedback. Please try again.';

            status.className =
                'feedback-status error';

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fas fa-paper-plane"></i> Send feedback';

        }

    });

})();