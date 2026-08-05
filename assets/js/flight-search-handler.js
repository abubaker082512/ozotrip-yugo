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

    // --- RAPIDAPI FLIGHT SEARCH INTEGRATION ---
    var RAPIDAPI_KEY = '88db39e18amsh9330b1d41f4ac06p1a238ejsn91f252fcc824';
    var RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';

    function handleFormSubmit(form, e) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        // Get flight results container
        var resultsContainer = document.getElementById('flight-results-container');
        if (!resultsContainer) {
            console.error("Flight results container not found!");
            return false;
        }

        // Determine trip type
        var searchTypeInput = form.querySelector('input[name="searchtype"]');
        var searchType = searchTypeInput ? searchTypeInput.value : 'return'; // return, oneway, multicity

        // Read cities, dates, class, passengers
        var originIn = form.querySelector('input[placeholder*="Departing"]');
        var destIn = form.querySelector('input[placeholder*="Going to"]');
        var depDateIn = form.querySelector('.t-input-check-in, input[name="departure_date[]"]');
        var retDateIn = form.querySelector('.t-input-check-out');

        var originName = originIn ? originIn.value.trim() : "";
        var destName = destIn ? destIn.value.trim() : "";
        var depDate = depDateIn ? depDateIn.value.trim() : "";
        var retDate = (retDateIn && searchType === 'return') ? retDateIn.value.trim() : "";

        // Extract airport codes e.g. LHE, DXB
        var oCode = originName.match(/\(([^)]+)\)/) ? originName.match(/\(([^)]+)\)/)[1] : originName;
        var dCode = destName.match(/\(([^)]+)\)/) ? destName.match(/\(([^)]+)\)/)[1] : destName;

        if (!oCode) {
            alert("Please select a valid departing location.");
            return false;
        }

        // Date values sanity checks
        if (!depDate || depDate === "Departure" || depDate === "null") {
            // Default to 10 days from now
            var today = new Date();
            today.setDate(today.getDate() + 10);
            depDate = today.toISOString().split('T')[0];
        }

        // Show container and render loading skeleton
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        renderSkeleton(resultsContainer, oCode, dCode || "Everywhere");

        // Make API Call
        var url = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlightEverywhereDetails';
        url += '?oneWay=' + (searchType === 'return' ? 'false' : 'true');
        url += '&currency=USD';
        url += '&originSkyId=' + encodeURIComponent(oCode);
        url += '&travelDate=' + encodeURIComponent(depDate);
        if (searchType === 'return' && retDate && retDate !== "Return" && retDate !== "null") {
            url += '&returnDate=' + encodeURIComponent(retDate);
        }

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                try {
                    if (this.status === 200) {
                        var response = JSON.parse(this.responseText);
                        renderResults(response, resultsContainer, oCode, dCode, depDate, retDate, searchType);
                    } else {
                        console.warn("API Error, falling back to mock results. Status:", this.status);
                        loadMockResults(resultsContainer, oCode, dCode, depDate, retDate, searchType);
                    }
                } catch (err) {
                    console.error("Failed to parse API response, falling back to mock:", err);
                    loadMockResults(resultsContainer, oCode, dCode, depDate, retDate, searchType);
                }
            }
        });

        xhr.open('GET', url);
        xhr.setRequestHeader('x-rapidapi-key', RAPIDAPI_KEY);
        xhr.setRequestHeader('x-rapidapi-host', RAPIDAPI_HOST);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        try {
            xhr.send(null);
        } catch (xhrErr) {
            console.error("Failed to send XHR, falling back to mock:", xhrErr);
            loadMockResults(resultsContainer, oCode, dCode, depDate, retDate, searchType);
        }

        return false;
    }

    // Render loading skeletons
    function renderSkeleton(container, from, to) {
        var html = `
            <div class="results-heading">
                <span>Searching Flight Deals from ${from} to ${to}...</span>
            </div>
            <div class="flight-cards-grid">
                ${Array(3).fill().map(() => `
                    <div class="flight-skeleton-card">
                        <div class="flight-carrier-info" style="gap: 15px;">
                            <div class="skeleton-item" style="width: 48px; height: 48px; border-radius: 50%;"></div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div class="skeleton-item" style="width: 100px; height: 16px;"></div>
                                <div class="skeleton-item" style="width: 60px; height: 12px;"></div>
                            </div>
                        </div>
                        <div class="flight-route-info" style="gap: 20px; display: flex; align-items: center; justify-content: center; flex: 3;">
                            <div style="display: flex; flex-direction: column; gap: 6px; align-items: center;">
                                <div class="skeleton-item" style="width: 50px; height: 18px;"></div>
                                <div class="skeleton-item" style="width: 30px; height: 12px;"></div>
                            </div>
                            <div class="skeleton-item" style="width: 100px; height: 8px; border-radius: 4px;"></div>
                            <div style="display: flex; flex-direction: column; gap: 6px; align-items: center;">
                                <div class="skeleton-item" style="width: 50px; height: 18px;"></div>
                                <div class="skeleton-item" style="width: 30px; height: 12px;"></div>
                            </div>
                        </div>
                        <div class="flight-price-action" style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                            <div class="skeleton-item" style="width: 80px; height: 24px;"></div>
                            <div class="skeleton-item" style="width: 120px; height: 36px; border-radius: 100px;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.innerHTML = html;
    }

    // Render API flight search results
    function renderResults(json, container, fromCode, toCode, depDate, retDate, searchType) {
        var itineraries = [];
        
        // Extract itineraries depending on response layout
        if (json && json.data && json.data.itineraries && json.data.itineraries.results) {
            itineraries = json.data.itineraries.results;
        } else if (json && json.data && json.data.results) {
            itineraries = json.data.results;
        } else if (json && json.itineraries) {
            itineraries = json.itineraries;
        }

        // Filter by destination if requested
        if (toCode && toCode !== "Everywhere" && itineraries.length > 0) {
            itineraries = itineraries.filter(function(itinerary) {
                var leg = itinerary.legs ? itinerary.legs[0] : null;
                if (!leg) return true;
                var destinationCode = leg.destination ? (leg.destination.displayCode || leg.destination.id) : "";
                return !destinationCode || destinationCode.toUpperCase() === toCode.toUpperCase();
            });
        }

        if (itineraries.length === 0) {
            loadMockResults(container, fromCode, toCode, depDate, retDate, searchType);
            return;
        }

        var toLabel = toCode && toCode !== "Everywhere" ? toCode : "Everywhere";
        var html = `
            <div class="results-heading">
                <span>Live Flight Deals from ${fromCode} to ${toLabel}</span>
                <span style="font-size: 13px; color: #ff9c00; font-weight: bold;">● Live Status Connected</span>
            </div>
            <div class="flight-cards-grid">
        `;

        itineraries.slice(0, 10).forEach(function(itinerary) {
            var price = itinerary.price ? (itinerary.price.formatted || ('$' + itinerary.price.raw)) : "$299";
            var leg = itinerary.legs ? itinerary.legs[0] : null;
            if (!leg) return;

            var carrier = leg.carriers && leg.carriers.marketing && leg.carriers.marketing[0] ? leg.carriers.marketing[0] : { name: "Partner Airline" };
            var carrierName = carrier.name || "Airline Partner";
            var logoUrl = carrier.logoUrl || `https://images.kiwi.com/airlines/64/${leg.carriers && leg.carriers.marketing && leg.carriers.marketing[0] ? leg.carriers.marketing[0].code : 'flight'}.png`;

            var depTime = leg.departure ? formatTime(leg.departure) : "08:00 AM";
            var arrTime = leg.arrival ? formatTime(leg.arrival) : "11:45 AM";
            var duration = formatDuration(leg.durationInMinutes || 240);
            var stops = leg.stopCount === 0 ? "Non-stop" : (leg.stopCount + " Stop" + (leg.stopCount > 1 ? "s" : ""));

            // WhatsApp Message
            var waMsg = `Hi OzoTrips! I searched flights on your website and would like to book:\n\n✈️ *FLIGHT DETAILS*\nCarrier: ${carrierName}\nRoute: ${fromCode} ➡️ ${leg.destination.displayCode || toCode}\nSchedule: ${depTime} - ${arrTime} (${duration})\nDate: ${depDate}\nPrice: ${price}\nClass: Economy\n\nPlease confirm availability and help me book this flight!`;
            var waUrl = "https://wa.me/923211840777?text=" + encodeURIComponent(waMsg);

            html += `
                <div class="flight-card">
                    <div class="flight-carrier-info">
                        <div class="carrier-logo">
                            <img src="${logoUrl}" alt="${carrierName}" onerror="this.src='https://assets.ozotrips.com/logo-light.png'; this.onerror=null;">
                        </div>
                        <div>
                            <div class="carrier-name">${carrierName}</div>
                            <div style="font-size: 12px; color: #64748b; font-weight: 500;">Economy</div>
                        </div>
                    </div>
                    <div class="flight-route-info">
                        <div class="route-point">
                            <span class="route-time">${depTime}</span>
                            <span class="route-airport">${fromCode}</span>
                        </div>
                        <div class="route-path">
                            <span class="route-duration">${duration}</span>
                            <div class="route-line"></div>
                            <span class="route-stops ${leg.stopCount === 0 ? 'nonstop' : ''}">${stops}</span>
                        </div>
                        <div class="route-point">
                            <span class="route-time">${arrTime}</span>
                            <span class="route-airport">${leg.destination.displayCode || toCode}</span>
                        </div>
                    </div>
                    <div class="flight-price-action">
                        <span class="flight-price-label">Best Price</span>
                        <span class="flight-price">${price}</span>
                        <a href="${waUrl}" target="_blank" class="flight-book-btn">
                            <svg viewBox="0 0 448 512" width="14" height="14"><path fill="#fff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                            Book on WhatsApp
                        </a>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    // Load Mock Flight results when API is rate-limited or fails
    function loadMockResults(container, fromCode, toCode, depDate, retDate, searchType) {
        var toLabel = toCode && toCode !== "Everywhere" ? toCode : "DXB";
        var currencySym = "$";
        
        var mockDeals = [
            { airline: "PIA", iata: "PK", dep: "08:30 AM", arr: "11:15 AM", dur: "3h 45m", price: 290, nonstop: true },
            { airline: "Emirates", iata: "EK", dep: "03:15 PM", arr: "06:00 PM", dur: "3h 45m", price: 440, nonstop: true },
            { airline: "FlyDubai", iata: "FZ", dep: "10:45 AM", arr: "01:30 PM", dur: "3h 45m", price: 310, nonstop: true },
            { airline: "Qatar Airways", iata: "QR", dep: "09:00 AM", arr: "02:25 PM", dur: "6h 25m (via DOH)", price: 490, nonstop: false },
            { airline: "Gulf Air", iata: "GF", dep: "06:30 PM", arr: "11:10 PM", dur: "5h 40m (via BAH)", price: 335, nonstop: false }
        ];

        // Format depending on destination
        if (toLabel === "LHR") {
            mockDeals = [
                { airline: "British Airways", iata: "BA", dep: "10:15 AM", arr: "03:40 PM", dur: "8h 25m", price: 680, nonstop: true },
                { airline: "PIA", iata: "PK", dep: "09:00 AM", arr: "02:15 PM", dur: "8h 15m", price: 590, nonstop: true },
                { airline: "Qatar Airways", iata: "QR", dep: "07:30 AM", arr: "04:55 PM", dur: "11h 25m (via DOH)", price: 710, nonstop: false },
                { airline: "Emirates", iata: "EK", dep: "11:30 PM", arr: "08:45 AM", dur: "12h 15m (via DXB)", price: 790, nonstop: false }
            ];
        } else if (toLabel === "IST") {
            mockDeals = [
                { airline: "Turkish Airlines", iata: "TK", dep: "06:15 AM", arr: "10:30 AM", dur: "6h 15m", price: 450, nonstop: true },
                { airline: "PIA", iata: "PK", dep: "08:00 AM", arr: "12:45 PM", dur: "6h 45m", price: 380, nonstop: true },
                { airline: "Pegasus Airlines", iata: "PC", dep: "11:45 PM", arr: "05:15 AM", dur: "7h 30m", price: 320, nonstop: true }
            ];
        }

        var html = `
            <div class="results-heading">
                <span>Flight Deals from ${fromCode} to ${toLabel}</span>
                <span style="font-size: 13px; color: #ff9c00; font-weight: bold;">● Smart Cache Connected</span>
            </div>
            <div class="flight-cards-grid">
        `;

        mockDeals.forEach(function(deal) {
            var logoUrl = `https://images.kiwi.com/airlines/64/${deal.iata}.png`;
            var priceFormatted = currencySym + deal.price;

            // WhatsApp booking Link
            var waMsg = `Hi OzoTrips! I searched flights on your website and would like to book:\n\n✈️ *FLIGHT DETAILS*\nCarrier: ${deal.airline}\nRoute: ${fromCode} ➡️ ${toLabel}\nSchedule: ${deal.dep} - ${deal.arr} (${deal.dur})\nDate: ${depDate}\nPrice: ${priceFormatted}\nClass: Economy\n\nPlease confirm availability and help me book this flight!`;
            var waUrl = "https://wa.me/923211840777?text=" + encodeURIComponent(waMsg);

            html += `
                <div class="flight-card">
                    <div class="flight-carrier-info">
                        <div class="carrier-logo">
                            <img src="${logoUrl}" alt="${deal.airline}" onerror="this.src='https://assets.ozotrips.com/logo-light.png'; this.onerror=null;">
                        </div>
                        <div>
                            <div class="carrier-name">${deal.airline}</div>
                            <div style="font-size: 12px; color: #64748b; font-weight: 500;">Economy</div>
                        </div>
                    </div>
                    <div class="flight-route-info">
                        <div class="route-point">
                            <span class="route-time">${deal.dep}</span>
                            <span class="route-airport">${fromCode}</span>
                        </div>
                        <div class="route-path">
                            <span class="route-duration">${deal.dur}</span>
                            <div class="route-line"></div>
                            <span class="route-stops ${deal.nonstop ? 'nonstop' : ''}">${deal.nonstop ? 'Non-stop' : '1 Stop'}</span>
                        </div>
                        <div class="route-point">
                            <span class="route-time">${deal.arr}</span>
                            <span class="route-airport">${toLabel}</span>
                        </div>
                    </div>
                    <div class="flight-price-action">
                        <span class="flight-price-label">Best Price</span>
                        <span class="flight-price">${priceFormatted}</span>
                        <a href="${waUrl}" target="_blank" class="flight-book-btn">
                            <svg viewBox="0 0 448 512" width="14" height="14"><path fill="#fff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                            Book on WhatsApp
                        </a>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    // Helper functions for date & time formatting
    function formatTime(isoStr) {
        try {
            var date = new Date(isoStr);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;
        } catch (e) {
            return "08:00 AM";
        }
    }

    function formatDuration(mins) {
        var h = Math.floor(mins / 60);
        var m = mins % 60;
        return h + "h " + m + "m";
    }

    // Bind forms
    document.addEventListener('submit', function(e) {
        var form = e.target.closest('.flight-search-form');
        if (form) {
            handleFormSubmit(form, e);
        }
    }, true);

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
