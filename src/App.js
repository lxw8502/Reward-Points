import "./styles.css";
import { useState, useEffect } from "react";
let data = [
  { amount: 102, date: "2021-04-10" },
  { amount: 155, date: "2021-04-15" },
  { amount: 45, date: "2021-04-22" },
  { amount: 56, date: "2021-04-29" },
  { amount: 79, date: "2021-05-08" },
  { amount: 76, date: "2021-05-11" },
  { amount: 153, date: "2021-05-18" },
  { amount: 85, date: "2021-05-26" },
  { amount: 43, date: "2021-05-27" },
  { amount: 90, date: "2021-06-06" },
  { amount: 106, date: "2021-06-10" },
  { amount: 55, date: "2021-06-16" }
];

export default function App() {
  const [record, setRecord] = useState(data);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [points, setPoints] = useState([]);
  useEffect(() => {
    let eachTransPoints = record.map((item) => {
      let point = 0,
        amount = item.amount;
      if (amount > 100) {
        point = (amount - 100) * 2 + 50;
      } else if (amount > 50) {
        point = amount - 50;
      } else {
        point = 0;
      }
      return { ...item, point };
    });

    let m = new Map();
    let total = 0;
    eachTransPoints.forEach((item) => {
      let month = item.date.substring(0, 7);
      total += item.point;
      if (m.has(month)) m.set(month, m.get(month) + item.point);
      else m.set(month, item.point);
    });
    m.set("Total", total);
    setPoints([...m]);
  }, [record]);

  const handleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    if (id === "date") {
      setDate(value);
    } else {
      setAmount(value);
    }
  };
  const handleClick = () => {
    setRecord([...record, { amount, date }]);
  };

  return (
    <div className="App">
      <label for="date">Date: </label>
      <input
        type="date"
        id="date"
        onChange={handleChange}
        placeholder="2021-06-06"
      />
      <label for="amount">Amount: </label>
      <input type="number" id="amount" onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
      <table>
        <tr>
          <th>Date</th>
          <th> Amount</th>
        </tr>
        {record.map((item) => {
          return (
            <tr>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          );
        })}
      </table>
      <table>
        <tr>
          <th>Month</th>
          <th>Points</th>
        </tr>
        {points.map((item) => {
          return (
            <tr>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
