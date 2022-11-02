import React, { useEffect, useState }from "react";
import { ResponsiveLine } from "@nivo/line";
import './graph.css'

export default function Graph({passedData}) {    

//////////////////////
//    Make Graph    //
//////////////////////

const MyResponsiveLine = ({ passedData }) => (
    <ResponsiveLine
        data={passedData}
        margin={{ top: 10, right: 10, bottom: 50, left: 10 }}
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
            tickRotation: -60,
            legend: 'Seconds',
            legendOffset: 46,
            legendPosition: 'middle'
        }}
        axisLeft={null}
        // axisLeft={{
        //     // orient: 'left',
        //     // tickSize: 5,
        //     // tickPadding: 15,
        //     // tickRotation: -40,
        //     // legend: 'count',
        //     // legendOffset: 80,
        //     // legendPosition: 'middle'
        // }}
        colors={{ scheme: 'purple_orange' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        // enablePointLabel={true}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 100,
        //         translateY: 0,
        //         itemsSpacing: 0,
        //         itemDirection: 'left-to-right',
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         // symbolShape: 'circle',
        //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemBackground: 'rgba(0, 0, 0, .03)',
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
)

  return (

    <>
  
  <div className="container-chart">{MyResponsiveLine({passedData})}</div>
  
  </>
    )
}

