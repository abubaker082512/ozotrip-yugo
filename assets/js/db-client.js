(function(window) {
    // Shared Client DB helper that falls back to LocalStorage if Express API is offline or unreachable
    var dbClient = {
        // Submissions
        getSubmissions: function() {
            return fetch('/api/submissions')
                .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
                .catch(function() {
                    return JSON.parse(localStorage.getItem('ozotrips_submissions') || '[]');
                });
        },
        addSubmission: function(data) {
            return fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
            .catch(function() {
                var submissions = JSON.parse(localStorage.getItem('ozotrips_submissions') || '[]');
                data.id = Date.now().toString();
                data._submittedAt = new Date().toISOString();
                submissions.unshift(data);
                localStorage.setItem('ozotrips_submissions', JSON.stringify(submissions));
                return data;
            });
        },
        deleteSubmission: function(id) {
            return fetch('/api/submissions/' + id, { method: 'DELETE' })
                .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
                .catch(function() {
                    var submissions = JSON.parse(localStorage.getItem('ozotrips_submissions') || '[]');
                    submissions = submissions.filter(function(s) { return s.id !== id; });
                    localStorage.setItem('ozotrips_submissions', JSON.stringify(submissions));
                    return { success: true };
                });
        },

        // Popups
        getPopup: function() {
            return fetch('/api/popups')
                .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
                .catch(function() {
                    var defaultPopup = {
                        enabled: false,
                        type: 'text',
                        title: 'Welcome to OzoTrips!',
                        content: 'Check out our latest Umrah and tour promotions!',
                        ctaText: 'View Offers',
                        ctaLink: '/offers.html',
                        imageUrl: '',
                        imageLink: '',
                        delay: 2
                    };
                    return JSON.parse(localStorage.getItem('ozotrips_popups') || JSON.stringify(defaultPopup));
                });
        },
        savePopup: function(data) {
            return fetch('/api/popups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
            .catch(function() {
                localStorage.setItem('ozotrips_popups', JSON.stringify(data));
                return data;
            });
        },

        // Blogs
        getBlogs: function() {
            return fetch('/api/blogs')
                .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
                .catch(function() {
                    var defaultBlogs = [
                        {
                            id: '1',
                            title: 'Ultimate Guide to Schengen Visa from Pakistan',
                            slug: 'schengen-visa-guide-pakistan',
                            category: 'Visa',
                            author: 'Visa Expert',
                            publishedDate: '2026-08-01',
                            summary: 'Everything you need to know about preparing your files, scheduling appointments, and passing the interview for a Schengen visa.',
                            content: '<h3>Schengen Visa Requirements</h3><p>Applying for a Schengen visa from Pakistan requires meticulous planning. You must prepare bank statements, a cover letter, a flight reservation, and hotel bookings.</p><h4>Key Tips</h4><ul><li>Ensure your bank statement has sufficient balance and is signed/stamped.</li><li>Maintain a clear travel itinerary.</li></ul>',
                            imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
                        }
                    ];
                    var local = localStorage.getItem('ozotrips_blogs');
                    if (!local) {
                        localStorage.setItem('ozotrips_blogs', JSON.stringify(defaultBlogs));
                        return defaultBlogs;
                    }
                    return JSON.parse(local);
                });
        },
        addBlog: function(data) {
            return fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
            .catch(function() {
                var blogs = JSON.parse(localStorage.getItem('ozotrips_blogs') || '[]');
                data.id = Date.now().toString();
                if (!data.slug) {
                    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                }
                blogs.unshift(data);
                localStorage.setItem('ozotrips_blogs', JSON.stringify(blogs));
                return data;
            });
        },
        updateBlog: function(id, data) {
            return fetch('/api/blogs/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
            .catch(function() {
                var blogs = JSON.parse(localStorage.getItem('ozotrips_blogs') || '[]');
                var index = blogs.findIndex(function(b) { return b.id === id; });
                if (index !== -1) {
                    blogs[index] = Object.assign({}, blogs[index], data);
                    localStorage.setItem('ozotrips_blogs', JSON.stringify(blogs));
                    return blogs[index];
                }
                throw new Error('Blog not found');
            });
        },
        deleteBlog: function(id) {
            return fetch('/api/blogs/' + id, { method: 'DELETE' })
                .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
                .catch(function() {
                    var blogs = JSON.parse(localStorage.getItem('ozotrips_blogs') || '[]');
                    blogs = blogs.filter(function(b) { return b.id !== id; });
                    localStorage.setItem('ozotrips_blogs', JSON.stringify(blogs));
                    return { success: true };
                });
        },

        // Image upload helper
        uploadImage: function(file) {
            var formData = new FormData();
            formData.append('image', file);
            return fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            .then(function(r) {
                if (!r.ok) throw new Error('Upload failed');
                return r.json();
            });
        }
    };

    window.OzoDB = dbClient;
})(window);
