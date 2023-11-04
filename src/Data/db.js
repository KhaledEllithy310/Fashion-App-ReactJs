const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Add a custom route for searching sizes
db._.mixin({
  searchSizes: function (sizes, size) {
    return sizes.filter((s) => s.toLowerCase().includes(size.toLowerCase()));
  },
});

module.exports = db;
