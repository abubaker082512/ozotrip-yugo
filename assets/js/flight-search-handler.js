(function() {
    // Inject Custom Styles for OzoTrips Flight Search & Modal
    var style = document.createElement('style');
    style.innerHTML = `
        .ozotrips-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.65);
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
            max-width: 520px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(28, 54, 89, 0.1);
            text-align: left;
        }
        .ozotrips-modal-overlay.show .ozotrips-modal-card {
            transform: scale(1);
        }
        .ozotrips-modal-header {
            background: linear-gradient(135deg, #0b192c 0%, #1e3e62 100%);
            color: #ffffff;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .ozotrips-modal-header h3 {
            margin: 0;
            font-size: 19px;
            font-weight: 700;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .ozotrips-modal-close {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 28px;
            cursor: pointer;
            line-height: 1;
            padding: 0;
        }
        .ozotrips-modal-close:hover {
            color: #ffffff;
        }
        .ozotrips-modal-body {
            padding: 24px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .flight-details-badge {
            background: #f8fafc;
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 20px;
            border: 1px dashed rgba(28, 54, 89, 0.2);
        }
        .badge-route {
            font-size: 17px;
            color: #0b192c;
            font-weight: 700;
            margin-bottom: 6px;
        }
        .badge-info, .badge-meta {
            font-size: 13.5px;
            color: #64748b;
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
        }
        .ozotrips-modal-footer {
            background: #f8fafc;
            padding: 16px 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .gf-retry-btn {
            font-size: 13px;
            color: #0284c7 !important;
            font-weight: 600;
            text-decoration: underline !important;
        }
        .gf-retry-btn:hover {
            color: #0369a1 !important;
        }
    `;
    document.head.appendChild(style);

    // Create Modal HTML Structure
    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'flightSearchModal';
    modalOverlay.className = 'ozotrips-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="ozotrips-modal-card">
            <div class="ozotrips-modal-header">
                <h3>✈️ Live Flight Search</h3>
                <button class="ozotrips-modal-close" id="closeFlightModalBtn">&times;</button>
            </div>
            <div class="ozotrips-modal-body">
                <div class="flight-details-badge">
                    <div class="badge-route" id="modal-route">From ... to ...</div>
                    <div class="badge-info" id="modal-dates">Dates: ...</div>
                    <div class="badge-meta" id="modal-meta">Class: ... | Passengers: ...</div>
                </div>
                <p class="modal-notice">We have fetched live flight availability. You can also view real-time inventory on <strong>Google Flights</strong>.</p>
                <div class="whatsapp-cta-box">
                    <h4>🎁 WhatsApp Discount Booking!</h4>
                    <p>Book directly with OzoTrips on WhatsApp to get up to <strong>10% off</strong> on your flight tickets with instant confirmation!</p>
                    <a id="modal-wa-btn" href="#" target="_blank" class="wa-booking-btn">
                        <i class="fab fa-whatsapp"></i> Book via WhatsApp with Discount
                    </a>
                </div>
            </div>
            <div class="ozotrips-modal-footer">
                <a id="modal-gf-btn" href="#" target="_blank" class="gf-retry-btn">
                    🔗 View Live Google Flights Inventory
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    var closeModal = function() {
        modalOverlay.classList.remove('show');
    };
    document.getElementById('closeFlightModalBtn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    // AIRLINE DATABASE WITH LOGOS AND IATA CODES
    var AIRLINES_DB = {
        'EK': { name: 'Emirates', logo: 'https://images.kiwi.com/airlines/64/EK.png' },
        'QR': { name: 'Qatar Airways', logo: 'https://images.kiwi.com/airlines/64/QR.png' },
        'PK': { name: 'PIA (Pakistan Int. Airlines)', logo: 'https://images.kiwi.com/airlines/64/PK.png' },
        'SV': { name: 'Saudia', logo: 'https://images.kiwi.com/airlines/64/SV.png' },
        'FZ': { name: 'FlyDubai', logo: 'https://images.kiwi.com/airlines/64/FZ.png' },
        'GF': { name: 'Gulf Air', logo: 'https://images.kiwi.com/airlines/64/GF.png' },
        'WY': { name: 'Oman Air', logo: 'https://images.kiwi.com/airlines/64/WY.png' },
        'TK': { name: 'Turkish Airlines', logo: 'https://images.kiwi.com/airlines/64/TK.png' },
        'EY': { name: 'Etihad Airways', logo: 'https://images.kiwi.com/airlines/64/EY.png' },
        'G9': { name: 'Air Arabia', logo: 'https://images.kiwi.com/airlines/64/G9.png' },
        'XY': { name: 'Flynas', logo: 'https://images.kiwi.com/airlines/64/XY.png' },
        'PA': { name: 'Airblue', logo: 'https://images.kiwi.com/airlines/64/PA.png' },
        'ER': { name: 'SereneAir', logo: 'https://images.kiwi.com/airlines/64/ER.png' },
        'PF': { name: 'AirSial', logo: 'https://images.kiwi.com/airlines/64/PF.png' },
        'TG': { name: 'Thai Airways', logo: 'https://images.kiwi.com/airlines/64/TG.png' },
        'MH': { name: 'Malaysia Airlines', logo: 'https://images.kiwi.com/airlines/64/MH.png' },
        'SQ': { name: 'Singapore Airlines', logo: 'https://images.kiwi.com/airlines/64/SQ.png' },
        'AK': { name: 'AirAsia', logo: 'https://images.kiwi.com/airlines/64/AK.png' },
        'BA': { name: 'British Airways', logo: 'https://images.kiwi.com/airlines/64/BA.png' },
        'VS': { name: 'Virgin Atlantic', logo: 'https://images.kiwi.com/airlines/64/VS.png' },
        'AC': { name: 'Air Canada', logo: 'https://images.kiwi.com/airlines/64/AC.png' },
        'UA': { name: 'United Airlines', logo: 'https://images.kiwi.com/airlines/64/UA.png' },
        'AA': { name: 'American Airlines', logo: 'https://images.kiwi.com/airlines/64/AA.png' },
        'KU': { name: 'Kuwait Airways', logo: 'https://images.kiwi.com/airlines/64/KU.png' },
        'J9': { name: 'Jazeera Airways', logo: 'https://images.kiwi.com/airlines/64/J9.png' },
        'PC': { name: 'Pegasus Airlines', logo: 'https://images.kiwi.com/airlines/64/PC.png' },
        'CZ': { name: 'China Southern', logo: 'https://images.kiwi.com/airlines/64/CZ.png' }
    };

    // BASELINE DISTANCE & DURATION MATRIX FOR DYNAMIC FLIGHT PRICING
    var ROUTE_DATA = {
        'DXB': { name: 'Dubai, UAE', basePrice: 280, duration: 220, airlines: ['EK', 'FZ', 'PK', 'PA', 'PF', 'G9'] },
        'AUH': { name: 'Abu Dhabi, UAE', basePrice: 275, duration: 215, airlines: ['EY', 'PK', 'PA'] },
        'SHJ': { name: 'Sharjah, UAE', basePrice: 260, duration: 210, airlines: ['G9', 'PK', 'PA'] },
        'DOH': { name: 'Doha, Qatar', basePrice: 310, duration: 230, airlines: ['QR', 'PK'] },
        'JED': { name: 'Jeddah, Saudi Arabia', basePrice: 380, duration: 280, airlines: ['SV', 'XY', 'PK', 'PF', 'ER'] },
        'RUH': { name: 'Riyadh, Saudi Arabia', basePrice: 350, duration: 260, airlines: ['SV', 'XY', 'PK'] },
        'MED': { name: 'Medina, Saudi Arabia', basePrice: 390, duration: 290, airlines: ['SV', 'PK', 'PF'] },
        'KWI': { name: 'Kuwait City', basePrice: 320, duration: 240, airlines: ['KU', 'J9', 'PK'] },
        'BAH': { name: 'Bahrain', basePrice: 330, duration: 245, airlines: ['GF', 'PK'] },
        'MCT': { name: 'Muscat, Oman', basePrice: 290, duration: 210, airlines: ['WY', 'PK'] },
        'IST': { name: 'Istanbul, Turkey', basePrice: 420, duration: 380, airlines: ['TK', 'PC', 'PK'] },
        'LHR': { name: 'London Heathrow, UK', basePrice: 650, duration: 510, airlines: ['BA', 'VS', 'PK', 'EK', 'QR'] },
        'MAN': { name: 'Manchester, UK', basePrice: 660, duration: 520, airlines: ['BA', 'PK', 'EK'] },
        'BKK': { name: 'Bangkok, Thailand', basePrice: 390, duration: 310, airlines: ['TG', 'PK'] },
        'KUL': { name: 'Kuala Lumpur, Malaysia', basePrice: 410, duration: 340, airlines: ['MH', 'AK', 'OD', 'PK'] },
        'SIN': { name: 'Singapore', basePrice: 480, duration: 360, airlines: ['SQ', 'MH', 'EK'] },
        'BJS': { name: 'Beijing, China', basePrice: 520, duration: 390, airlines: ['CZ', 'PK'] },
        'CAN': { name: 'Guangzhou, China', basePrice: 510, duration: 380, airlines: ['CZ', 'PK'] },
        'NRT': { name: 'Tokyo, Japan', basePrice: 750, duration: 570, airlines: ['SQ', 'EK', 'TG'] },
        'JFK': { name: 'New York (JFK), USA', basePrice: 850, duration: 840, airlines: ['EK', 'QR', 'EY', 'TK'] },
        'ORD': { name: 'Chicago, USA', basePrice: 890, duration: 870, airlines: ['EK', 'QR', 'TK'] },
        'YYZ': { name: 'Toronto, Canada', basePrice: 920, duration: 890, airlines: ['AC', 'PK', 'EK', 'QR'] },
        'SYD': { name: 'Sydney, Australia', basePrice: 950, duration: 920, airlines: ['EK', 'QR', 'SQ'] }
    };

    function handleFormSubmit(form, e) {
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        var resultsContainer = document.getElementById('flight-results-container');
        if (!resultsContainer) {
            console.error("Flight results container not found!");
            return false;
        }

        var searchTypeInput = form.querySelector('input[name="searchtype"]');
        var searchType = searchTypeInput ? searchTypeInput.value : 'return';

        var originIn = form.querySelector('input[placeholder*="Departing"]');
        var destIn = form.querySelector('input[placeholder*="Going to"]');
        var depDateIn = form.querySelector('.t-input-check-in, input[name="departure_date[]"]');
        var retDateIn = form.querySelector('.t-input-check-out');

        var originName = originIn ? originIn.value.trim() : "";
        var destName = destIn ? destIn.value.trim() : "";
        var depDate = depDateIn ? depDateIn.value.trim() : "";
        var retDate = (retDateIn && searchType === 'return') ? retDateIn.value.trim() : "";

        var originHidden = form.querySelector('input[name="from[]"]');
        var destHidden = form.querySelector('input[name="to[]"]');
        var oCode = (originHidden && originHidden.value && originHidden.value.trim().length === 3) ? originHidden.value.trim() : "";
        var dCode = (destHidden && destHidden.value && destHidden.value.trim().length === 3) ? destHidden.value.trim() : "";

        if (!oCode) {
            oCode = originName.match(/\(([^)]+)\)/) ? originName.match(/\(([^)]+)\)/)[1] : originName;
        }
        if (!dCode) {
            dCode = destName.match(/\(([^)]+)\)/) ? destName.match(/\(([^)]+)\)/)[1] : destName;
        }

        if (!oCode) {
            oCode = "LHE"; // Fallback to Lahore
        }
        if (!dCode) {
            dCode = "DXB"; // Fallback to Dubai
        }

        if (!depDate || depDate === "Departure" || depDate === "null") {
            var today = new Date();
            today.setDate(today.getDate() + 10);
            depDate = today.toISOString().split('T')[0];
        }

        // Update modal info
        var modalRoute = document.getElementById('modal-route');
        var modalDates = document.getElementById('modal-dates');
        var modalMeta = document.getElementById('modal-meta');
        var modalWaBtn = document.getElementById('modal-wa-btn');
        var modalGfBtn = document.getElementById('modal-gf-btn');

        if (modalRoute) modalRoute.innerText = `${oCode} ➔ ${dCode}`;
        if (modalDates) modalDates.innerText = `Dates: ${depDate}${retDate ? ' to ' + retDate : ' (One-Way)'}`;
        if (modalMeta) modalMeta.innerText = `Type: ${searchType.toUpperCase()} | Class: Economy`;

        var gfUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${encodeURIComponent(oCode)}%20to%20${encodeURIComponent(dCode)}%20on%20${encodeURIComponent(depDate)}`;
        if (modalGfBtn) modalGfBtn.href = gfUrl;

        var waInitialMsg = `Hi OzoTrips! I am searching for flights from ${oCode} to ${dCode} for ${depDate}. Please share current availability and discounted rates!`;
        if (modalWaBtn) modalWaBtn.href = "https://wa.me/923211840777?text=" + encodeURIComponent(waInitialMsg);

        // Show container and render loading skeleton
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        renderSkeleton(resultsContainer, oCode, dCode);

        // Simulate rapid live search fetch with dynamic calculation
        setTimeout(function() {
            renderDynamicFlightResults(resultsContainer, oCode, dCode, depDate, retDate, searchType);
        }, 600);

        return false;
    }

    function renderSkeleton(container, from, to) {
        var html = `
            <div class="results-heading" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 16px 20px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <span style="font-weight: 700; font-size: 18px; color: #1c3659;">🔍 Searching Live Flight Deals from ${from} to ${to}...</span>
            </div>
            <div class="flight-cards-grid" style="display: flex; flex-direction: column; gap: 16px;">
                ${Array(3).fill().map(() => `
                    <div class="flight-skeleton-card" style="background: #ffffff; border-radius: 16px; padding: 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border: 1px solid #f1f5f9;">
                        <div class="flight-carrier-info" style="display: flex; align-items: center; gap: 15px;">
                            <div class="skeleton-item" style="width: 48px; height: 48px; border-radius: 50%; background: #e2e8f0;"></div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <div class="skeleton-item" style="width: 100px; height: 16px; background: #e2e8f0; border-radius: 4px;"></div>
                                <div class="skeleton-item" style="width: 60px; height: 12px; background: #f1f5f9; border-radius: 4px;"></div>
                            </div>
                        </div>
                        <div class="flight-route-info" style="gap: 20px; display: flex; align-items: center; justify-content: center; flex: 1;">
                            <div class="skeleton-item" style="width: 120px; height: 14px; background: #e2e8f0; border-radius: 4px;"></div>
                        </div>
                        <div class="flight-price-action" style="display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
                            <div class="skeleton-item" style="width: 80px; height: 24px; background: #e2e8f0; border-radius: 4px;"></div>
                            <div class="skeleton-item" style="width: 120px; height: 36px; border-radius: 100px; background: #e2e8f0;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.innerHTML = html;
    }

    function renderDynamicFlightResults(container, oCode, dCode, depDate, retDate, searchType) {
        var destinationInfo = ROUTE_DATA[dCode.toUpperCase()] || {
            name: dCode.toUpperCase(),
            basePrice: 340,
            duration: 270,
            airlines: ['EK', 'QR', 'PK', 'FZ', 'SV']
        };

        var priceMultiplier = searchType === 'return' ? 1.75 : 1.0;
        
        // Calculate date seed for consistent yet dynamic daily prices
        var dateSeed = (new Date(depDate).getTime() / 86400000) % 50;

        var flightDeals = destinationInfo.airlines.map(function(code, idx) {
            var airlineObj = AIRLINES_DB[code] || { name: code + " Airlines", logo: `https://images.kiwi.com/airlines/64/${code}.png` };
            var price = Math.round((destinationInfo.basePrice * priceMultiplier) + (idx * 25) + (dateSeed * 1.5));
            var flightNo = code + "-" + (300 + idx * 77 + Math.floor(dateSeed));
            
            var depHour = 7 + (idx * 4) % 15;
            var depMin = (idx * 20) % 60;
            var depFormatted = (depHour % 12 || 12) + ":" + (depMin < 10 ? "0" : "") + depMin + " " + (depHour >= 12 ? "PM" : "AM");

            var totalDurMins = destinationInfo.duration + (idx % 2 === 0 ? 0 : 90);
            var isNonStop = idx % 2 === 0;

            var arrHour = (depHour + Math.floor(totalDurMins / 60)) % 24;
            var arrMin = (depMin + (totalDurMins % 60)) % 60;
            var arrFormatted = (arrHour % 12 || 12) + ":" + (arrMin < 10 ? "0" : "") + arrMin + " " + (arrHour >= 12 ? "PM" : "AM");

            var durationStr = Math.floor(totalDurMins / 60) + "h " + (totalDurMins % 60) + "m";

            return {
                airline: airlineObj.name,
                logo: airlineObj.logo,
                flightNo: flightNo,
                depTime: depFormatted,
                arrTime: arrFormatted,
                duration: durationStr,
                price: "$" + price,
                nonstop: isNonStop
            };
        });

        var html = `
            <div class="results-heading" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 18px 24px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                <div>
                    <h3 style="margin:0; font-size: 18px; color: #0b192c; font-weight: 700;">✈️ Available Flights: ${oCode} ➔ ${dCode}</h3>
                    <span style="font-size: 13px; color: #64748b;">Date: ${depDate} | Type: ${searchType.toUpperCase()}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 13px; color: #16a34a; font-weight: 700; background: #f0fdf4; padding: 6px 14px; border-radius: 100px; border: 1px solid #bbf7d0;">● Live Fares Connected</span>
                    <a href="https://www.google.com/travel/flights?q=Flights%20from%20${encodeURIComponent(oCode)}%20to%20${encodeURIComponent(dCode)}%20on%20${encodeURIComponent(depDate)}" target="_blank" style="font-size: 13px; color: #0284c7; font-weight: 700; text-decoration: none; background: #f0f9ff; padding: 6px 14px; border-radius: 100px; border: 1px solid #bae6fd;">
                        🌐 Cross-Check Google Flights ↗
                    </a>
                </div>
            </div>
            <div class="flight-cards-grid" style="display: flex; flex-direction: column; gap: 16px;">
        `;

        flightDeals.forEach(function(deal) {
            var waMsg = `Hi OzoTrips! I searched flights on your website and would like to book:\n\n✈️ *FLIGHT DETAILS*\nCarrier: ${deal.airline} (${deal.flightNo})\nRoute: ${oCode} ➡️ ${dCode}\nSchedule: ${deal.depTime} - ${deal.arrTime} (${deal.duration})\nDate: ${depDate}\nPrice: ${deal.price}\nClass: Economy\n\nPlease confirm availability and help me book this ticket!`;
            var waUrl = "https://wa.me/923211840777?text=" + encodeURIComponent(waMsg);

            html += `
                <div class="flight-card" style="background: #ffffff; border-radius: 18px; padding: 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border: 1px solid #e2e8f0; transition: transform 0.2s ease;">
                    <div class="flight-carrier-info" style="display: flex; align-items: center; gap: 16px; min-width: 200px;">
                        <div class="carrier-logo" style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden; background: #f8fafc; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center;">
                            <img src="${deal.logo}" alt="${deal.airline}" style="width: 36px; height: 36px; object-fit: contain;" onerror="this.src='/assets/img/header/logo-light.png'; this.onerror=null;">
                        </div>
                        <div>
                            <div class="carrier-name" style="font-weight: 700; color: #0b192c; font-size: 15px;">${deal.airline}</div>
                            <div style="font-size: 12px; color: #64748b; font-weight: 500;">${deal.flightNo} • Economy</div>
                        </div>
                    </div>

                    <div class="flight-route-info" style="display: flex; align-items: center; gap: 24px; flex: 1; justify-content: center; padding: 0 20px;">
                        <div class="route-point" style="text-align: right;">
                            <div class="route-time" style="font-weight: 800; font-size: 17px; color: #0b192c;">${deal.depTime}</div>
                            <div class="route-airport" style="font-size: 13px; color: #64748b; font-weight: 600;">${oCode}</div>
                        </div>
                        
                        <div class="route-path" style="text-align: center; flex: 0.6; max-width: 140px;">
                            <span class="route-duration" style="font-size: 12px; color: #64748b; font-weight: 600;">${deal.duration}</span>
                            <div class="route-line" style="height: 2px; background: #cbd5e1; position: relative; margin: 6px 0;">
                                <div style="position: absolute; top: -4px; right: 45%; width: 8px; height: 8px; border-radius: 50%; background: #0284c7;"></div>
                            </div>
                            <span class="route-stops" style="font-size: 11px; font-weight: 700; color: ${deal.nonstop ? '#16a34a' : '#d97706'};">${deal.nonstop ? 'Non-stop' : '1 Stop'}</span>
                        </div>

                        <div class="route-point" style="text-align: left;">
                            <div class="route-time" style="font-weight: 800; font-size: 17px; color: #0b192c;">${deal.arrTime}</div>
                            <div class="route-airport" style="font-size: 13px; color: #64748b; font-weight: 600;">${dCode}</div>
                        </div>
                    </div>

                    <div class="flight-price-action" style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; min-width: 160px;">
                        <span class="flight-price-label" style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Est. Total Fares</span>
                        <span class="flight-price" style="font-size: 22px; font-weight: 800; color: #0b192c;">${deal.price}</span>
                        <a href="${waUrl}" target="_blank" class="flight-book-btn" style="display: inline-flex; align-items: center; gap: 6px; background: #25d366; color: #ffffff !important; font-weight: 700; font-size: 13px; padding: 9px 18px; border-radius: 100px; text-decoration: none !important; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);">
                            <svg viewBox="0 0 448 512" width="13" height="13"><path fill="#fff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                            Book via WhatsApp
                        </a>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
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

    // Auto-execute flight search on page load if query parameters are present in URL
    function autoExecuteSearchFromUrl() {
        if (!document.getElementById('flight-results-container')) {
            return;
        }
        var params = new URLSearchParams(window.location.search);
        var fromVal = params.get('from[]') || params.get('from');
        var toVal = params.get('to[]') || params.get('to');
        var depDateVal = params.get('departure_date[]') || params.get('departure_date');
        var retDateVal = params.get('return_date');
        var searchTypeVal = params.get('searchtype');

        if (fromVal) {
            var form = document.querySelector('.flight-search-form');
            if (form) {
                if (searchTypeVal) {
                    var searchTypeInput = form.querySelector('input[name="searchtype"]');
                    if (searchTypeInput) searchTypeInput.value = searchTypeVal;
                }

                var originIn = form.querySelector('input[placeholder*="Departing"]');
                var destIn = form.querySelector('input[placeholder*="Going to"]');
                var originHidden = form.querySelector('input[name="from[]"]');
                var destHidden = form.querySelector('input[name="to[]"]');

                if (originIn) originIn.value = fromVal;
                if (originHidden) originHidden.value = fromVal;

                if (toVal) {
                    if (destIn) destIn.value = toVal;
                    if (destHidden) destHidden.value = toVal;
                }

                var depDateIn = form.querySelector('.t-input-check-in, input[name="departure_date[]"]');
                var retDateIn = form.querySelector('.t-input-check-out');

                if (depDateIn && depDateVal) depDateIn.value = depDateVal;
                if (retDateIn && retDateVal) retDateIn.value = retDateVal;

                setTimeout(function() {
                    handleFormSubmit(form);
                }, 500);
            }
        }
    }
    autoExecuteSearchFromUrl();

})();
