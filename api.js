const db = require("mysql");

const connection = db.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "leetcode"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database!");
  }
});

module.exports = {
  getRank: function(leetcodeId) {
    // Make an API call to LeetCode to get the number of questions and contest rank for the specified user.
    // Return the data in a format that can be displayed on the website.

    // Store the LeetCode ID in the database.
    const query = `INSERT INTO leetcode_users (leetcode_id) VALUES (${leetcodeId})`;
    connection.query(query, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("LeetCode ID stored in database!");
      }
    });

    // Make an API call to LeetCode to get the number of questions and contest rank for the specified user.
    const url = `https://api.leetcode.com/v4/users/${leetcodeId}`;
    const headers = {
      "Authorization": `Bearer YOUR_LEETCHODE_API_KEY`
    };
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        // Return the data in a format that can be displayed on the website.
        return {
          name: data.name,
          rank: data.rank,
          leetcodeId: data.id
        };
      });
  }
};
