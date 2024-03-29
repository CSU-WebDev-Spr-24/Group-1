const axios = require("axios");

const search = async(req, res) => {
    const { searchQuery, category } = req.query;
    let url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${searchQuery}&language=en`;

    if (category) {
        url += `&category=${encodeURIComponent(category)}`;
    }

    try {
        const response = await axios.get(url);
        res.json(response.data); // send the data back to the client - the response from the TripAdvisor API
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.response });
    }

}

module.exports = {
    search,
}