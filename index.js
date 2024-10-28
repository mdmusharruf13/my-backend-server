const express = require('express');

const app = express();
const PORT = 1082;

app.get("/", async (req, res) => {
    try {
        const apiResponse = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3724&lng=78.4378&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
            headers: {
                // 'accept': '*/*',
                // 'accept-encoding': 'gzip, deflate, br, zstd',
                // 'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                // 'if-none-match': 'W/"1ed81-Vf2bwghT4vHDAVaaUtZ9cdJ5YhE"',
                // 'priority': 'u=1, i',
                // 'referer': 'https://www.swiggy.com/',
                // 'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"',
                // 'sec-fetch-dest': 'empty',
                // 'sec-fetch-mode': 'cors',
                // 'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`API responded with status ${apiResponse.status}`);
        }

        const responseData = await apiResponse.json();
        res.json(responseData); // Send the JSON response back to the client
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Error fetching data from the API" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
