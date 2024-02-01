import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MoodGraph = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Extract unique months and years from the data
  const uniqueMonths = [
    ...new Set(
      data.map((item) => {
        const date = new Date(item.entry_date);
        const monthName = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        return `${monthName} ${year}`;
      })
    ),
  ];

  uniqueMonths.sort();

  // Filter data based on selected month
  const filteredData = selectedMonth
    ? data.filter((item) => {
        const selectedMonthStart = selectedMonth.split(" ")[0];
        const itemMonth = new Date(item.entry_date).toLocaleString("default", {
          month: "long",
        });
        const itemMonthAbbrev = new Date(item.entry_date).toLocaleString(
          "default",
          {
            month: "short",
          }
        );

        return (
          itemMonth === selectedMonthStart ||
          itemMonthAbbrev === selectedMonthStart
        );
      })
    : data;

  const ticks = Array.from({ length: 11 }, (_, index) => index);

  return (
    <div>
      <label>Select Month: </label>
      <select onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">All Months</option>
        {uniqueMonths.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>

      <LineChart width={600} height={300} data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="entry_date"
          tickFormatter={(entry_date) => {
            const date = new Date(entry_date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis ticks={ticks} />
        <Tooltip
          formatter={(value, name, props) => {
            const date = new Date(props.payload.entry_date);
            const formattedDate = `${date.toLocaleString("default", {
              month: "long",
            })} ${date.getDate()}`;

            return [formattedDate, `Mood ${value}`];
          }}
        />

        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#c482ca" />
      </LineChart>
    </div>
  );
};

export default MoodGraph;
