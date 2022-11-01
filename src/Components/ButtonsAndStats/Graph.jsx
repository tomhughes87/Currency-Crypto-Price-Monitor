import React, { useEffect, useState }from "react";
import { ResponsiveLine } from "@nivo/line";
// import { graphData } from "./graphData";
import './graph.css'

export default function Graph() {    

  console.log("")
//////////////////////
//  useState data  //
//////////////////////
const [data,setData] = useState( [
    {
      id: "China",
      color: "hsl(135, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 58,
        },
        {
          x: "helicopter",
          y: 48,
        },
        {
          x: "boat",
          y: 268,
        },
        {
          x: "train",
          y: 142,
        },
        {
          x: "subway",
          y: 217,
        },
        {
          x: "bus",
          y: 61,
        },
        {
          x: "car",
          y: 247,
        },
        {
          x: "moto",
          y: 55,
        },
        {
          x: "bicycle",
          y: 90,
        },
        {
          x: "horse",
          y: 209,
        },
        {
          x: "skateboard",
          y: 29,
        },
        {
          x: "others",
          y: 294,
        },
      ],
    }
  ])


//////////////////////
//    Make Graph    //
//////////////////////


// useEffect(() => {
  
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  

    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'purple_orange' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)



////////////////////////
//   handle btn click //
//   ( Add to Graph)  //
////////////////////////
async function  AddData(e) {
  console.log('add clicked')
 
  console.log(" data",data)
  console.log(" data[0]",data[0])
  console.log(" data[0].data",data[0].data)
  

  let newdata = data
  

  console.log(" newdata",newdata)
  console.log(" newdata[0]",newdata[0])
  console.log(" newdata[0].data",newdata[0].data)


  newdata[0].data.push({x: `added hoverboard${counter}`, y: 837-counter})

  console.log(" newdata pushed",newdata)
  console.log(" newdata[0] pushed",newdata[0])
  console.log(" newdata[0].data pushed",newdata[0].data)


  return  setData(newdata)



}
const [counter,setcounter]=useState(0)


useEffect(() => {
  console.log('updating')
  if (counter>=2) {
    AddData()
  }
  console.log('updated')
  // setcounter(counter+1)
  return
}, [counter])

  return (

    <>
  <div>Graph</div>
  <div className="container-chart">{MyResponsiveLine({data})}</div>
  <button onClick={AddData}>add</button>
  <button onClick={()=>{setcounter(counter +1)}}>{counter}</button> 
  </>
    )
}

