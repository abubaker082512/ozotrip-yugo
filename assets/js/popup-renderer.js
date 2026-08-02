(function() {
    // Check if we are on the homepage
    var isHomepage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    if (!isHomepage) return;

    // Inject Popup Styles
    var style = document.createElement('style');
    style.innerHTML = `
        .ozotrips-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(8px);
            z-index: 99999999 !important;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .ozotrips-popup-overlay.show {
            opacity: 1;
            pointer-events: auto;
        }
        .ozotrips-popup-card {
            background: #ffffff;
            border-radius: 24px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            border: 1px solid rgba(28, 54, 89, 0.1);
        }
        .ozotrips-popup-overlay.show .ozotrips-popup-card {
            transform: scale(1) translateY(0);
        }
        .ozotrips-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(15, 23, 42, 0.08);
            border: none;
            color: #1e293b;
            font-size: 20px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            transition: all 0.2s ease;
            z-index: 10;
        }
        .ozotrips-popup-close:hover {
            background: rgba(15, 23, 42, 0.15);
            transform: scale(1.05);
        }
        .ozotrips-popup-image-content img {
            width: 100%;
            height: auto;
            display: block;
            max-height: 450px;
            object-fit: cover;
            cursor: pointer;
        }
        .ozotrips-popup-text-content {
            padding: 40px 32px 32px;
            text-align: center;
            font-family: 'Rubik', sans-serif;
        }
        .ozotrips-popup-text-content h3 {
            margin: 0 0 16px;
            color: #1c3659;
            font-size: 24px;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
        }
        .ozotrips-popup-text-content p {
            font-size: 15px;
            color: #475569;
            line-height: 1.6;
            margin: 0 0 28px;
        }
        .ozotrips-popup-cta {
            display: inline-block;
            background: #1c3659;
            color: #ffffff !important;
            font-weight: 600;
            font-size: 15px;
            padding: 12px 32px;
            border-radius: 100px;
            text-decoration: none !important;
            box-shadow: 0 10px 20px rgba(28, 54, 89, 0.2);
            transition: all 0.3s ease;
        }
        .ozotrips-popup-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(28, 54, 89, 0.3);
            background: #152945;
        }
    `;
    document.head.appendChild(style);

    // Render Popup Trigger function
    function initPopup(popup) {
        if (!popup || !popup.enabled) return;

        // Skip if already dismissed in this session
        if (sessionStorage.getItem('ozotrips_popup_dismissed') === 'true') return;

        var overlay = document.createElement('div');
        overlay.className = 'ozotrips-popup-overlay';
        
        var card = document.createElement('div');
        card.className = 'ozotrips-popup-card';
        
        var closeBtn = document.createElement('button');
        closeBtn.className = 'ozotrips-popup-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = function() {
            overlay.classList.remove('show');
            sessionStorage.setItem('ozotrips_popup_dismissed', 'true');
            setTimeout(function() { overlay.remove(); }, 400);
        };
        card.appendChild(closeBtn);

        if (popup.type === 'image') {
            var imgBox = document.createElement('div');
            imgBox.className = 'ozotrips-popup-image-content';
            
            var img = document.createElement('img');
            img.src = popup.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
            img.alt = 'Promotional Offer';
            
            if (popup.imageLink) {
                img.onclick = function() {
                    window.location.href = popup.imageLink;
                };
            }
            imgBox.appendChild(img);
            card.appendChild(imgBox);
        } else {
            // Text Popup
            var textBox = document.createElement('div');
            textBox.className = 'ozotrips-popup-text-content';
            
            var title = document.createElement('h3');
            title.textContent = popup.title || 'Special Announcement!';
            
            var body = document.createElement('p');
            body.textContent = popup.content || 'Get exclusive travel deals today.';
            
            textBox.appendChild(title);
            textBox.appendChild(body);

            if (popup.ctaText && popup.ctaLink) {
                var cta = document.createElement('a');
                cta.className = 'ozotrips-popup-cta';
                cta.href = popup.ctaLink;
                cta.textContent = popup.ctaText;
                textBox.appendChild(cta);
            }
            card.appendChild(textBox);
        }

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Display after configured delay (seconds converted to ms)
        var delayMs = (popup.delay || 2) * 1000;
        setTimeout(function() {
            overlay.classList.add('show');
        }, delayMs);
    }

    // Load from DB helper
    if (window.OzoDB) {
        window.OzoDB.getPopup().then(initPopup);
    } else {
        // Fallback
        setTimeout(function() {
            var local = localStorage.getItem('ozotrips_popups');
            if (local) {
                initPopup(JSON.parse(local));
            }
        }, 500);
    }
})();
