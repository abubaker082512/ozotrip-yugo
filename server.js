import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Ensure dynamic folders exist
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const DB_PATH = path.join(__dirname, 'db.json');

// Initialize database
function loadDb() {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            submissions: [],
            popups: {
                enabled: false,
                type: 'text',
                title: 'Welcome to OzoTrips!',
                content: 'Check out our latest Umrah and tour promotions!',
                ctaText: 'View Offers',
                ctaLink: '/offers.html',
                imageUrl: '',
                imageLink: '',
                delay: 2
            },
            blogs: [
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
            ]
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
        return initialData;
    }
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading db.json", e);
        return { submissions: [], popups: {}, blogs: [] };
    }
}

function saveDb(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Multer Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// API: File Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// API: Submissions
app.get('/api/submissions', (req, res) => {
    const db = loadDb();
    res.json(db.submissions || []);
});

app.post('/api/submissions', (req, res) => {
    const db = loadDb();
    const submission = req.body;
    submission.id = Date.now().toString();
    if (!submission._submittedAt) {
        submission._submittedAt = new Date().toISOString();
    }
    db.submissions.unshift(submission);
    saveDb(db);
    res.status(201).json(submission);
});

app.delete('/api/submissions/:id', (req, res) => {
    const db = loadDb();
    const { id } = req.params;
    db.submissions = db.submissions.filter(sub => sub.id !== id);
    saveDb(db);
    res.json({ success: true });
});

// API: Popups
app.get('/api/popups', (req, res) => {
    const db = loadDb();
    res.json(db.popups || {});
});

app.post('/api/popups', (req, res) => {
    const db = loadDb();
    db.popups = req.body;
    saveDb(db);
    res.json(db.popups);
});

// API: Blogs
app.get('/api/blogs', (req, res) => {
    const db = loadDb();
    res.json(db.blogs || []);
});

app.post('/api/blogs', (req, res) => {
    const db = loadDb();
    const blog = req.body;
    blog.id = Date.now().toString();
    if (!blog.slug) {
        blog.slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    db.blogs.unshift(blog);
    saveDb(db);
    res.status(201).json(blog);
});

app.put('/api/blogs/:id', (req, res) => {
    const db = loadDb();
    const { id } = req.params;
    const updatedBlog = req.body;
    const index = db.blogs.findIndex(b => b.id === id);
    if (index !== -1) {
        db.blogs[index] = { ...db.blogs[index], ...updatedBlog };
        saveDb(db);
        res.json(db.blogs[index]);
    } else {
        res.status(404).json({ error: 'Blog not found' });
    }
});

app.delete('/api/blogs/:id', (req, res) => {
    const db = loadDb();
    const { id } = req.params;
    db.blogs = db.blogs.filter(b => b.id !== id);
    saveDb(db);
    res.json({ success: true });
});

// Serve uploads folder in development if needed (Vite serves it from public normally)
app.use('/uploads', express.static(UPLOADS_DIR));

app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
});
