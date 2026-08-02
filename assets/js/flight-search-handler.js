(function() {
    // Inject Custom Styles for OzoTrips Flight Modal
    var style = document.createElement('style');
    style.innerHTML = `
        .ozotrips-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(8px);
            z-index: 999999 !important;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .ozotrips-modal-overlay.show {
            opacity: 1;
            pointer-events: auto;
        }
        .ozotrips-modal-card {
            background: #ffffff;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(28, 54, 89, 0.08);
            text-align: left;
        }
        .ozotrips-modal-overlay.show .ozotrips-modal-card {
            transform: scale(1);
        }
        .ozotrips-modal-header {
            background: #1c3659;
            color: #ffffff;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }
        .ozotrips-modal-header h3 {
            margin: 0;
            font-size: 19px;
            font-weight: 700;
            color: #ffffff;
            font-family: 'Outfit', sans-serif;
        }
        .ozotrips-modal-close {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 28px;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            transition: color 0.2s ease;
        }
        .ozotrips-modal-close:hover {
            color: #ffffff;
        }
        .ozotrips-modal-body {
            padding: 24px;
            font-family: 'Rubik', sans-serif;
        }
        .flight-details-badge {
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 20px;
            border: 1px dashed rgba(28, 54, 89, 0.15);
        }
        .badge-route {
            font-size: 16px;
            color: #1c3659;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .badge-info, .badge-meta {
            font-size: 13.5px;
            color: #64748b;
        }
        .badge-meta {
            margin-top: 4px;
        }
        .modal-notice {
            font-size: 14px;
            line-height: 1.5;
            color: #475569;
            margin-bottom: 20px;
        }
        .whatsapp-cta-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 16px;
            padding: 20px;
            border: 1px solid #bbf7d0;
            text-align: center;
        }
        .whatsapp-cta-box h4 {
            margin: 0 0 8px;
            color: #166534;
            font-size: 16px;
            font-weight: 700;
        }
        .whatsapp-cta-box p {
            font-size: 13px;
            line-height: 1.5;
            color: #1e3a1e;
            margin-bottom: 16px;
        }
        .wa-booking-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #25d366;
            color: #ffffff !important;
            text-decoration: none !important;
            font-weight: 700;
            font-size: 15px;
            padding: 12px 24px;
            border-radius: 100px;
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.25);
            transition: all 0.3s ease;
            width: 100%;
            box-sizing: border-box;
        }
        .wa-booking-btn:hover {
            background: #20ba56;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
        }
        .ozotrips-modal-footer {
            background: #f8fafc;
            padding: 16px 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .gf-retry-btn {
            font-size: 12px;
            color: #64748b !important;
            text-decoration: underline !important;
            transition: color 0.2s ease;
        }
        .gf-retry-btn:hover {
            color: #1c3659 !important;
        }
    `;
    document.head.appendChild(style);

    // Create Modal HTML Structure and append to body
    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'flightSearchModal';
    modalOverlay.className = 'ozotrips-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="ozotrips-modal-card">
            <div class="ozotrips-modal-header">
                <h3>✈️ Search Initiated</h3>
                <button class="ozotrips-modal-close" id="closeFlightModalBtn">&times;</button>
            </div>
            <div class="ozotrips-modal-body">
                <div class="flight-details-badge">
                    <div class="badge-route" id="modal-route">From ... to ...</div>
                    <div class="badge-info" id="modal-dates">Dates: ...</div>
                    <div class="badge-meta" id="modal-meta">Class: ... | Passengers: ...</div>
                </div>
                <p class="modal-notice">We have opened live flight options on <strong>Google Flights</strong> in a new tab for you to browse real-time schedules and prices.</p>
                <div class="whatsapp-cta-box">
                    <h4>🎁 WhatsApp Booking Offer!</h4>
                    <p>Found a flight you like? Book directly with OzoTrips on WhatsApp to get up to <strong>10% off</strong> on your ticket, 24/7 booking support, and easy refunds/changes!</p>
                    <a id="modal-wa-btn" href="#" target="_blank" class="wa-booking-btn">
                        <i class="fab fa-whatsapp"></i> Click to Book via WhatsApp
                    </a>
                </div>
            </div>
            <div class="ozotrips-modal-footer">
                <a id="modal-gf-btn" href="#" target="_blank" class="gf-retry-btn">
                    Google Flights didn't open? Click here to view live schedules
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // Close Modal Event Listeners
    var closeModal = function() {
        modalOverlay.classList.remove('show');
    };
    document.getElementById('closeFlightModalBtn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    // Form Submission Interceptor Logic
    function handleFormSubmit(form, e) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        // 1. Determine Trip Type
        var searchTypeInput = form.querySelector('input[name="searchtype"]');
        var searchType = searchTypeInput ? searchTypeInput.value : 'return'; // return, oneway, multicity

        var waMessage = "Hi OzoTrips, I would like to book a flight with the following details:\n\n";
        var gfQuery = "";
        var routeText = "";
        var datesText = "";

        if (searchType === 'multicity') {
            // MULTI CITY SEARCH
            var segments = [];
            var segmentDivs = form.querySelectorAll('.multi-city-segment');
            
            segmentDivs.forEach(function(seg) {
                if (seg.classList.contains('d-none') || seg.style.display === 'none') return;
                
                var originIn = seg.querySelector('input[placeholder*="Departing"]');
                var destIn = seg.querySelector('input[placeholder*="Going to"]');
                var dateIn = seg.querySelector('.t-input-check-in, input[name="departure_date[]"]');
                
                if (originIn && destIn) {
                    segments.push({
                        origin: originIn.value.trim(),
                        dest: destIn.value.trim(),
                        date: (dateIn ? dateIn.value : "").trim()
                    });
                }
            });

            if (segments.length === 0) return;

            // WhatsApp Multi-City Message
            waMessage += "✈️ TRIP TYPE: MULTI-CITY\n\n";
            segments.forEach(function(seg, idx) {
                waMessage += "Flight " + (idx + 1) + ":\n" +
                             "🛫 From: " + seg.origin + "\n" +
                             "🛬 To: " + seg.dest + "\n" +
                             "📅 Date: " + seg.date + "\n\n";
            });

            // Google Flights query
            var originCodes = [];
            var destCodes = [];
            var dates = [];
            segments.forEach(function(seg) {
                var oCode = seg.origin.match(/\(([^)]+)\)/) ? seg.origin.match(/\(([^)]+)\)/)[1] : seg.origin;
                var dCode = seg.dest.match(/\(([^)]+)\)/) ? seg.dest.match(/\(([^)]+)\)/)[1] : seg.dest;
                originCodes.push(oCode);
                destCodes.push(dCode);
                dates.push(seg.date);
            });

            gfQuery = "flights from " + originCodes[0] + " to " + destCodes[0] + " on " + dates[0];
            routeText = "Multi-City Route (" + segments.length + " Flights)";
            datesText = "Multi-date Schedule";

        } else {
            // ROUND TRIP or ONE WAY
            var originIn = form.querySelector('input[placeholder*="Departing"]');
            var destIn = form.querySelector('input[placeholder*="Going to"]');
            var depDateIn = form.querySelector('.t-input-check-in, input[name="departure_date[]"]');
            var retDateIn = form.querySelector('.t-input-check-out');

            var origin = originIn ? originIn.value.trim() : "";
            var dest = destIn ? destIn.value.trim() : "";
            var depDate = depDateIn ? depDateIn.value.trim() : "";
            var retDate = (retDateIn && searchType === 'return') ? retDateIn.value.trim() : "";

            if (!origin || !dest) return;

            var oCode = origin.match(/\(([^)]+)\)/) ? origin.match(/\(([^)]+)\)/)[1] : origin;
            var dCode = dest.match(/\(([^)]+)\)/) ? dest.match(/\(([^)]+)\)/)[1] : dest;

            waMessage += "✈️ TRIP TYPE: " + (searchType === 'return' ? "ROUND TRIP" : "ONE WAY") + "\n\n" +
                         "🛫 From: " + origin + "\n" +
                         "🛬 To: " + dest + "\n" +
                         "📅 Departure: " + depDate + "\n";
            
            gfQuery = "flights from " + oCode + " to " + dCode;
            if (depDate && depDate !== "Departure" && depDate !== "null") {
                gfQuery += " on " + depDate;
            }

            routeText = oCode + " ➡️ " + dCode;
            datesText = "Dep: " + depDate;

            if (searchType === 'return' && retDate && retDate !== "Return" && retDate !== "null" && retDate !== "") {
                waMessage += "📅 Return: " + retDate + "\n";
                gfQuery += " return " + retDate;
                datesText += " | Ret: " + retDate;
            }
            waMessage += "\n";
        }

        // Cabin Class
        var cabinClassInput = form.querySelector('#cabinclass, input[name="cabinclass"]');
        var cabinClass = cabinClassInput ? cabinClassInput.value : "economy";
        waMessage += "💺 Class: " + cabinClass.toUpperCase() + "\n";
        gfQuery += " " + cabinClass;

        // Passengers
        var adultsInput = form.querySelector('#adult, input[name="adult"]');
        var childrenInput = form.querySelector('#child, input[name="children"]');
        var infantsInput = form.querySelector('#infant, input[name="infant"]');

        var adults = adultsInput ? parseInt(adultsInput.value) || 1 : 1;
        var children = childrenInput ? parseInt(childrenInput.value) || 0 : 0;
        var infants = infantsInput ? parseInt(infantsInput.value) || 0 : 0;
        var totalPassengers = adults + children + infants;

        waMessage += "👥 Passengers: " + totalPassengers + " (" + adults + " Adult" + (adults > 1 ? "s" : "") + 
                     (children > 0 ? ", " + children + " Child" + (children > 1 ? "ren" : "") : "") + 
                     (infants > 0 ? ", " + infants + " Infant" + (infants > 1 ? "s" : "") : "") + ")\n\n" +
                     "Please share the best flight deals and live schedules!";

        // Save Flight Search Submission to database
        var flightSubmission = {
            trip_type: searchType.toUpperCase(),
            cabin_class: cabinClass,
            passengers: totalPassengers + " (" + adults + " Adults, " + children + " Children, " + infants + " Infants)",
            origin: origin || "Multi-City Route",
            destination: dest || "Multi-City Route",
            departure_date: depDate || "See segments",
            return_date: retDate || "N/A",
            _formId: "FLIGHT SEARCH FORM",
            _pageTitle: document.title,
            _pageUrl: window.location.pathname,
            _submittedAt: new Date().toISOString()
        };

        if (searchType === 'multicity' && typeof segments !== 'undefined') {
            segments.forEach(function(s, i) {
                flightSubmission["segment_" + (i + 1)] = s.origin + " -> " + s.dest + " on " + s.date;
            });
        }

        if (window.OzoDB) {
            window.OzoDB.addSubmission(flightSubmission);
        } else {
            var submissions = JSON.parse(localStorage.getItem('ozotrips_submissions') || '[]');
            flightSubmission.id = Date.now().toString();
            submissions.unshift(flightSubmission);
            localStorage.setItem('ozotrips_submissions', JSON.stringify(submissions));
        }

        // Build URLs
        var googleFlightsUrl = "https://www.google.com/travel/flights?q=" + encodeURIComponent(gfQuery);
        var whatsappUrl = "https://wa.me/923211840777?text=" + encodeURIComponent(waMessage);

        // Update Modal elements
        document.getElementById('modal-route').textContent = routeText;
        document.getElementById('modal-dates').textContent = datesText;
        document.getElementById('modal-meta').textContent = "Class: " + cabinClass.toUpperCase() + " | Passengers: " + totalPassengers;
        document.getElementById('modal-wa-btn').href = whatsappUrl;
        document.getElementById('modal-gf-btn').href = googleFlightsUrl;

        // Open Google Flights in new tab (allowed under user action context)
        window.open(googleFlightsUrl, '_blank');

        // Show our WhatsApp booking card Modal
        modalOverlay.classList.add('show');
        return false;
    }

    // Direct submit listener binding (Vanilla)
    document.addEventListener('submit', function(e) {
        var form = e.target.closest('.flight-search-form');
        if (form) {
            handleFormSubmit(form, e);
        }
    }, true); // useCapture to intercept early

    // jQuery direct binding fallback
    function bindJQuerySubmit() {
        if (window.jQuery) {
            jQuery(document).ready(function($) {
                $('.flight-search-form').off('submit.ozotrips').on('submit.ozotrips', function(e) {
                    handleFormSubmit(this, e);
                    return false;
                });
            });
        } else {
            setTimeout(bindJQuerySubmit, 50);
        }
    }
    bindJQuerySubmit();
})();
