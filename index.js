const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 1082;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.get("/main", async (req, res) => {
    try {
        const apiResponse = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3724&lng=78.4378&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
            headers: {
                'content-type': 'application/json',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`API responded with status ${apiResponse.status}`);
        }

        const responseData = await apiResponse.json();
        res.json(responseData);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Error fetching data from the API" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
