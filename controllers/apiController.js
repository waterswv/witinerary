

function index(req, res) {
  res.json({
    description: "This API provides data to Witinerary",
    gitHub: "https://github.com/waterswv/witinerary",
    endPoints: "Coming Soon"
  });
}

module.exports = {
  index: index
};
