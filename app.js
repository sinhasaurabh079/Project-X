import React, { useState } from "react";
import ReactDOM from "react-dom";
import api from "./api";

const App = () => {
  const [leetcodeId, setLeetcodeId] = useState("");
  const [rankList, setRankList] = useState([]);

  const handleSubmit = () => {
    api.getRank(leetcodeId).then(data => {
      setRankList(data);
    });
  };

  return (
    <div>
      <input
        type="text"
        id="leetcode-id"
        placeholder="Enter your LeetCode ID"
        value={leetcodeId}
        onChange={e => setLeetcodeId(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <ul id="rank-list">
        {rankList.map((rank, index) => (
          <li key={index}>
            {rank.name} - {rank.rank}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
