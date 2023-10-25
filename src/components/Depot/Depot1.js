import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Depot.css";


const BarWithBorder = (borderHeight, borderColor) => {
  return (props) => {
    const { fill, x, y, width, height, value } = props;
    if (props.value == 0) {
      return null;
    } else {
      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="none"
            fill={fill}
          />
          <rect
            x={x}
            y={y}
            width={width}
            height={borderHeight}
            stroke="none"
            fill={borderColor}
            />
        </g>
      );
    }
  };
};


const renderCustomizedLabel = (fill) => {
  return (props) => {
    const { x, y, width, value } = props;


    // console.log(props)
    if (props.value == 0) {
      return null;
    } else {
      return (
        <g style={{ fontSize: "12px" }}>
          {/* <rect width={width} height={30} x={x} y={y-30}  fill="#fff" /> */}
          {/* <rect width={width} height={30} x={x} y={y-30}  /> */}
          <text
            x={x + width / 2}
            y={y - 12}
            fill={fill}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {value > 0 ? value : value}
          </text>
        </g>
      );
    }
  };
};


export default function Depot1({ data }) {
  // console.log("Inside Depot1");
  // console.log(data);
  return (
    <div className="depot">
        {/* <span className="depotTitle">Vadodara</span> */}


      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={200}
          height={200}
          data={data}
          barSize={20}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            style={{ fontSize: "0.9rem", fill: "darkgray" }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="LAN" fill="#d61b1b" shape={BarWithBorder(1, "#5A5A5A")}>
            <LabelList
              dataKey="LAN"
              content={renderCustomizedLabel("#25383C")}
            />
          </Bar>
          <Bar dataKey="M6" fill="#ffa216" shape={BarWithBorder(1, "#5A5A5A")}>
            <LabelList
              dataKey="M6"
              content={renderCustomizedLabel("#25383C")}
            />
          </Bar>
          {/* <Bar dataKey="H4" fill="#50C878" shape={BarWithBorder(1, "#5A5A5A")}>
          <LabelList dataKey="H4" content={renderCustomizedLabel('#007B8B')} />    
        </Bar>    */}
          <Bar dataKey="H6" fill="#6495ED" shape={BarWithBorder(1, "#5A5A5A")}>
            <LabelList
              dataKey="H6"
              content={renderCustomizedLabel("#25383C")}
            />
          </Bar>
          <Bar dataKey="K" fill="#07DA0F" shape={BarWithBorder(1, "#5A5A5A")}>
            <LabelList dataKey="K" content={renderCustomizedLabel("#25383C")} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>


      {/* <span className="depotName">Vadodara</span> */}
    </div>
  );
}
