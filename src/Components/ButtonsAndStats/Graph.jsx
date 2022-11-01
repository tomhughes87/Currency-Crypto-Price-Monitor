import React, { useEffect, useState }from "react";
import { ResponsiveLine } from "@nivo/line";
import { graphData } from "./graphData";
import './graph.css'

export default function Graph() {    

//////////////////////
//     let data     //
//////////////////////

// let data = [
//     {
//       id: "japan",
//       color: "hsl(135, 70%, 50%)",
//       data: [
//         {
//           x: "plane",
//           y: 58,
//         },
//         {
//           x: "helicopter",
//           y: 48,
//         },
//         {
//           x: "boat",
//           y: 268,
//         },
//         {
//           x: "train",
//           y: 142,
//         },
//         {
//           x: "subway",
//           y: 217,
//         },
//         {
//           x: "bus",
//           y: 61,
//         },
//         {
//           x: "car",
//           y: 247,
//         },
//         {
//           x: "moto",
//           y: 55,
//         },
//         {
//           x: "bicycle",
//           y: 90,
//         },
//         {
//           x: "horse",
//           y: 209,
//         },
//         {
//           x: "skateboard",
//           y: 29,
//         },
//         {
//           x: "others",
//           y: 294,
//         },
//       ],
//     }
//   ];
  
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

  // let data = dataUseState 
  // console.log("dataNormal:",{data})
  
  
  // console.log("dataUseState:",{dataUseState})
  
  // console.log(data[0].data)
// console.log({data})

// data[0].data.push({x: 'UFO', y: 87})
// {x: 'bus', y: 61}
// console.log(data[0].data)




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

// }, [data])


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

  //  setData(data[0].data.push({x: 'added hoverboard', y: 837}))  //push to useState - this doesnt work with usestate
  
  // await setData(newdata)  //push to useState - this STILL doesnt work ... scoop issue?

  return  setData(newdata)
  // return newdata



}
// console.log(data)




///////////////////////////
//    load if atp1      //
//////////////////////////
// function checkGraph({data}) {
//   if (data===false) {
//     return "loading..."
//   }
//   else{
//     MyResponsiveLine({data})
//   }
// }


// function NestedGraph({data}) {
//   // useEffect(() => {
//     return <div className="container-chart">{MyResponsiveLine({data})}</div>
//   // }, [])
  
// }

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



let newdata = data

  return (

    <>
  <div>Graph</div>
{/* <NestedGraph data={data}/> */}
  <div className="container-chart">{MyResponsiveLine({data})}</div>
  {/* <div className="container-chart">{GraphReadyChecker({data})}</div> */}
  
  
  {/* <GraphReadyChecker myData={{data}}/> */}
  {/* <p> Length of data array {data[0].data.length} ...should update after Add btn clicked </p> */}
  <button onClick={AddData}>add</button>
  {/* <button onClick={()=>setData({AddData})}>add</button> */}
  {/* <button onClick={()=>setData(function name(data) {
    console.log("running inner func")
     let newdata = data  
     newdata[0].data.push({x: 'added hoverboard', y: 837})
   
     console.log(" newdata pushed",newdata)
     console.log(" newdata[0] pushed",newdata[0])
     console.log(" newdata[0].data pushed",newdata[0].data)
     
    //  setData(newdata)  //push to useState - this STILL doesnt work ... scoop issue?
   
     // return
     return newdata
   
  })}>add</button> */}
  {/* <button onClick={()=>setData(data[0].data.push({x: 'added hoverboard', y: 837}))}>add</button> */}
  {/* <button onClick={()=>{setData((data)=>
    data[0].data.push({x: 'added hoverboard', y: 837})
    AddData()
    data
    newdata = data

    data => data[0].data.push({x: 'added hoverboard', y: 837})
    newdata[0].data.push({x: 'added hoverboard', y: 837})
    data
    console.log(data)
    console.log(newdata)
  return newdata
   newdata
    

   )}}>add</button>  */}

  {/* <button onClick={setcounter(()=>{ return counter+1})}>{counter}</button> */}
  
  {/* //working */}
  <button onClick={()=>{setcounter(counter +1)}}>{counter}</button> 
  </>
    )
}



/////////////////////////



///////////////////////////
//    load if atp2      //
//////////////////////////
// export function GraphReadyChecker(props) {
//   console.log('........................')
//   console.log(props)
// //   const MyResponsiveLine = ({ data /* see data tab */ }) => (
  

// //     <ResponsiveLine
// //         data={data}
// //         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
// //         xScale={{ type: 'point' }}
// //         yScale={{
// //             type: 'linear',
// //             min: 'auto',
// //             max: 'auto',
// //             stacked: true,
// //             reverse: false
// //         }}
// //         yFormat=" >-.2f"
// //         axisTop={null}
// //         axisRight={null}
// //         axisBottom={{
// //             orient: 'bottom',
// //             tickSize: 5,
// //             tickPadding: 5,
// //             tickRotation: 0,
// //             legend: 'transportation',
// //             legendOffset: 36,
// //             legendPosition: 'middle'
// //         }}
// //         axisLeft={{
// //             orient: 'left',
// //             tickSize: 5,
// //             tickPadding: 5,
// //             tickRotation: 0,
// //             legend: 'count',
// //             legendOffset: -40,
// //             legendPosition: 'middle'
// //         }}
// //         colors={{ scheme: 'purple_orange' }}
// //         pointSize={10}
// //         pointColor={{ theme: 'background' }}
// //         pointBorderWidth={2}
// //         pointBorderColor={{ from: 'serieColor' }}
// //         pointLabelYOffset={-12}
// //         useMesh={true}
// //         legends={[
// //             {
// //                 anchor: 'bottom-right',
// //                 direction: 'column',
// //                 justify: false,
// //                 translateX: 100,
// //                 translateY: 0,
// //                 itemsSpacing: 0,
// //                 itemDirection: 'left-to-right',
// //                 itemWidth: 80,
// //                 itemHeight: 20,
// //                 itemOpacity: 0.75,
// //                 symbolSize: 12,
// //                 symbolShape: 'circle',
// //                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
// //                 effects: [
// //                     {
// //                         on: 'hover',
// //                         style: {
// //                             itemBackground: 'rgba(0, 0, 0, .03)',
// //                             itemOpacity: 1
// //                         }
// //                     }
// //                 ]
// //             }
// //         ]}
// //     />
// // )
// return "hi" 
// }