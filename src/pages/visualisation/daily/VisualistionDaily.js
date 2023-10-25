import React, { useEffect, useState } from 'react';
import './Daily.css';
import './visualisationDaily.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import Depot1 from '../../../components/Depot/Depot1';

const VisualisationDaily = ({ setAuth }) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const [todayData, setTodayData] = useState([]);
    const [tomorrowData, setTomorrowData] = useState([]);
    const [month, setMonthValue] = useState(months[new Date().getMonth()]);
    const [year, setYearValue] = useState(new Date().getFullYear());
    const [selectValue, setSelectValue] = useState('Stock');
    const [sliderValue, setSliderValue] = useState(1);
    //STORING SCHEDULE PIPELINE JSONDATA
    const [dailySchedule_Pipeline, setdailySchedule_Pipeline] = useState([]);
    //MODIFYING/UPDATING THE RECEIVED DATA
    const [updatedData, setUpdatedData] = useState([]);
    //TRANSFORMING/MODIFYING THE RECEIVED DATA
    const [transformedData, setTransformedData] = useState([]);
    //TRANSFORMING/MODIFYING/FILTERING THE RECEIVED DATA
    const [newTransformedData, setNewTransformedData] = useState([]);
    //STORING THE TERMINAL VOLUME JSONDATA OF MAIN PIPELINE
    const [
        terminalVolumeSchedule_Pipeline,
        setTerminalVolumeSchedule_Pipeline,
    ] = useState([]);
    //STORING THE TERMINAL VOLUME JSONDATA OF DEPOT
    const [terminalVolume_Depot, setTerminalVolume_Depot] = useState([]);
    //STORING BRANCH PIPELINE DATA OF AWA-SAL
    const [branchPipelineData_Asal, setBranchPipelineData_Asal] = useState([]);
    //STORING THE BRANCH PIPELINE DATA OF PAL-VAD
    const [branchPipelineData_Palvad, setBranchPipelineData_Palvad] = useState(
        []
    );
    //DAY-WISE FILTERING AND MODIFYING DATA OF AWA-SAL/ASAL
    const [todayData_for_Asal_branch, setTodayData_for_Asal_branch] = useState(
        []
    );
    //DAY-WISE FILTERING AND MODIFYING DATA OF PAL-VAD/PALVAD
    const [todayData_for_Palvad_branch, setTodayDatabr3_for_Palvad_branch] = useState([]);

    useEffect(() => {
        fetchDailyDepotChart(selectValue); // FETCHING JSON DATA FOR DEPOT GRAPH BASED ON SELECT OPTION VALUE
    }, [sliderValue, selectValue]);

    useEffect(() => {
        fetchterminalVolume_Depot(); //FETCHING JSON DATA FOR TERMINAL VOLUME DEPOT PROCEDURE
        fetchterminalVolume_Schedule_Pipeline(); //FETCHING JSON DATA FOR TERMINAL VOLUME  PROCEDURE
    }, [sliderValue]);

    useEffect(() => {
        fetchDailySchedule_Pipeline(); //FETCHING SCHEDULE PIPELINE JSON DATA
        transform_Schedule_Pipeline_Data(); //TRANSFORMING/MODIFYING DATA OF SCHEDULE MAIN PIPELINE
    }, [sliderValue, dailySchedule_Pipeline]);

    useEffect(() => {
        fetchBranchPipelineData_Asal(); //FETCHING BRANCH PIPELINE ASAL JSONDATA
        transform_Branch_Data_ASAL(); //TRANSFORMING/MODIFYING THE DATA
    }, [sliderValue, branchPipelineData_Asal]);

    useEffect(() => {
        fetchBranchPipelineData_Palvad(); //FETCHING BRANCH PIPELINE PALVAD JSONDATA
        transform_Branch_Data_PALVAD(); //TRANSFORMING/MODIFYING THE DATA
    }, [sliderValue, branchPipelineData_Palvad]);

    useEffect(() => {
        transform_Depot_Data(); //TRANSFORMING DAILY DEPOT GRAPH TO DESIRED FORMAT
        filterDepotData(sliderValue); //FILTERING IT ACCORDING TO SCHEDULE_DAY AND SLIDERVALUE
    }, [sliderValue, transformedData]);

    //*********************FETCHING JSON DATA FOR TERMINAL VOLUME DEPOT PROCEDURE*********************
    const fetchterminalVolume_Depot = async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/terminal-volume-depot-procedure'
            );
            const data = await response.json();
            setTerminalVolume_Depot(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // *********************FETCHING JSON DATA FOR DEPOT GRAPH BASED ON SELECT OPTION VALUE*********************
    const fetchDailyDepotChart = async (selectValue) => {
        try {
            let endpoint = '';
            console.log('Fetching data for selectValue:', selectValue);
            switch (selectValue) {
                case 'Dropping':
                    endpoint = 'data-fetch?selectValue=Dropping';
                    break;
                case 'Stock':
                    endpoint = 'data-fetch?selectValue=Stock';
                    break;
                case 'Demand':
                    endpoint = 'data-fetch?selectValue=Demand';
                    break;
                default:
                    console.error('Invalid selection');
                    return;
            }
            const response = await fetch(`http://localhost:8000/${endpoint}`);
            const data = await response.json();

            const updatedData = data
                .map((item) => {
                    if (item.Product) {
                        const attributes = {};
                        item.Product.split(',').forEach((attribute) => {
                            const [key, value] = attribute.split(':');
                            attributes[key] = parseFloat(value);
                        });

                        // Extract the day of the month from Date_of_demand and assign it to Schedule_day
                        const dateOfDemand = new Date(item.Date_of_demand);
                        attributes.Schedule_day = dateOfDemand.getDate();

                        return {
                            ...attributes,
                            Terminal_code: item.Terminal_code,
                        };
                    } else {
                        return null; // Handle the case where Product is missing
                    }
                })
                .filter(Boolean); // Filter out null entries

            setUpdatedData(updatedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //****************TRANSFORMING DAILY DEPOT GRAPH TO DESIRED FORMAT*****************************
    const transform_Depot_Data = () => {
        // Set newTransformedData with the desired structure
        const transformedData = updatedData.map((item) => {
            const terminalInfo = terminalVolume_Depot.find(
                (terminal) => terminal.Terminal_code === item.Terminal_code
            );

            if (terminalInfo) {
                return {
                    name: terminalInfo.Terminal_name,
                    LAN: Math.floor(item.LAN) || 0,
                    M6: Math.floor(item.M6) || 0,
                    H6: Math.floor(item.H6) || 0,
                    K: Math.floor(item.K) || 0,
                    day: item.Schedule_day,
                };
            }
            return null;
        });

        setNewTransformedData(transformedData.filter(Boolean));
    };

    //********************FILTERING IT ACCORDING TO SCHEDULE_DAY AND SLIDERVALUE****************************
    const filterDepotData = (selectedDay) => {
        // Filter depot data based on the selected day
        const filteredDepotData = newTransformedData.filter(
            (item) => item.day === selectedDay
        );
        setTransformedData(filteredDepotData);
    };

    //*********************FETCHING JSON DATA FOR TERMINAL VOLUME  PROCEDURE************************
    const fetchterminalVolume_Schedule_Pipeline = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/terminal-volume-procedure'
            );
            const data = await response.json();
            setTerminalVolumeSchedule_Pipeline(data);
            console.log(data, 'data for terminal volume');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //***********************FETCHING SCHEDULE PIPELINE JSON DATA*************************
    const fetchDailySchedule_Pipeline = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/schedule-main-pipeline-procedure'
            );
            const data = await response.json();
            setdailySchedule_Pipeline(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //***********************TRANSFORMING/MODIFYING DATA OF SCHEDULE MAIN PIPELINE********************
    const transform_Schedule_Pipeline_Data = () => {
        // Your data transformation code goes here, similar to your previous code
        const updatedData = dailySchedule_Pipeline.map((item) => {
            let color;
            switch (item.product_code) {
                case 'H6':
                    color = '#6495ED';
                    break;
                case 'M6':
                    color = '#ffa216';
                    break;
                case 'K':
                    color = '#07DA0F';
                    break;
                case 'LAN':
                    color = '#d61b1b';
                    break;
                default:
                    color = '#474747';
            }

            return {
                value: Math.floor(item.quantity),
                name: item.product_code,
                day: item.Schedule_day + 1,
                product_code: item.product_code,
                batch_code: item.Batch_code,
                terminal_code: item.Terminal_code,
                color: color,
            };
        });

        setTodayData(updatedData.filter((item) => item.day === sliderValue));
        setTomorrowData(
            updatedData.filter((item) => item.day === sliderValue + 1)
        );
    };

    //********************FETCHING BRANCH PIPELINE ASAL JSONDATA*****************************
    const fetchBranchPipelineData_Asal = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/branch-daily-drop-awa-procedure'
            );
            const data = await response.json();
            setBranchPipelineData_Asal(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //********************FETCHING BRANCH PIPELINE ASAL JSONDATA*****************************
    const fetchBranchPipelineData_Palvad = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/branch-daily-drop-vad-procedure'
            );
            const data = await response.json();
            setBranchPipelineData_Palvad(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //********************TRANSFORMING/MODIFYING THE DATA OF ASAL BRANCH***********************
    const transform_Branch_Data_ASAL = () => {
        const branchData = branchPipelineData_Asal.map((item) => {
            let color;
            switch (item.PRODUCT_CODE) {
                case 'H6':
                    color = '#6495ED';
                    break;
                case 'M6':
                    color = '#ffa216';
                    break;
                case 'K':
                    color = '#07DA0F';
                    break;
                case 'LAN':
                    color = '#d61b1b';
                    break;
                default:
                    color = '#474747';
            }

            return {
                value: Math.floor(item.Quantity),
                name: item.PRODUCT_CODE,
                day: item.SCHEDULE_DAY + 1,
                color: color,
            };
        });
        setTodayData_for_Asal_branch(
            branchData.filter((item) => item.day === sliderValue)
        );
    };

    //********************TRANSFORMING/MODIFYING THE DATA OF PALVAD BRANCH*********************
    const transform_Branch_Data_PALVAD = () => {
        const branchData = branchPipelineData_Palvad.map((item) => {
            let color;
            switch (item.PRODUCT_CODE) {
                case 'H6':
                    color = '#6495ED';
                    break;
                case 'M6':
                    color = '#ffa216';
                    break;
                case 'K':
                    color = '#07DA0F';
                    break;
                case 'LAN':
                    color = '#d61b1b';
                    break;
                default:
                    color = '#474747';
            }

            return {
                value: Math.floor(item.Quantity),
                name: item.PRODUCT_CODE,
                day: item.SCHEDULE_DAY + 1,
                color: color,
            };
        });
        setTodayDatabr3_for_Palvad_branch(
            branchData.filter((item) => item.day === sliderValue)
        );
    };

    //**************************SLIDER FUNCTIONALITY **************************************

    const handleSelectChange = (event) => {
        const choice = event.target.value;
        setSelectValue(choice);
    };
    const handleSliderChange = (event) => {
        const parsedDay = parseInt(event.target.value);
        setSliderValue(parsedDay);
        // filterDepotData(parsedDay);
    };

    const handlePreviousButtonClick = () => {
        if (sliderValue > 1) {
            setSliderValue((prevValue) => prevValue - 1);
        }
    };

    const handleNextButtonClick = () => {
        if (sliderValue < 31) {
            setSliderValue((prevValue) => prevValue + 1);
        }
    };

    const calibrationChartTick = (range) => {
        const rowsTick = [];
        const tickgap = Math.floor(range / 50);

        for (var i = 0; i < range; i = i + tickgap) {
            rowsTick.push(
                <div
                    // style={{border:"solid black"}}
                    width={tickgap}
                >
                    {' '}
                    {''}
                </div>
            );
        }
        return (
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                {rowsTick}
            </div>
        );
    };
    const calibrationChartValues = (range) => {
        const rowsLabel = [];
        const tickgap = Math.floor(range / 50);
        var widths = 0;
        for (var i = 0; i < range; i = i + tickgap) {
            widths = tickgap;
            rowsLabel.push(
                <div className="dailycalibrationLabelStyle" width={widths}>
                    {' '}
                    {i}
                </div>
            );
        }
        return (
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                {rowsLabel}
            </div>
        );
    };

    const customBarChart = (chartData, pipeLength) => {
        const rows = [];
        var width = 0;
        var widthpercent = 0;
        var color = '#00000';
        var forecolor = '#00000';
        // const nzData = chartData.filter((item)=> item.value != 0 )
        // const rowquantity = nzData.map((item)=>{
        // return item.value
        // })
        // var min = Math.min.apply(null, rowquantity)
        // console.log("Minimum is " + min);
        // var minWidthPercent = (min / pipeLength ) * 100;
        // var adjustedWidthPercent = 2 - minWidthPercent;
        console.log('ChartData: ', chartData);
        chartData.forEach((item) => {
            // console.log(item)
            if (item.value > 0) {
                width = (item.value / pipeLength) * 100;
                width = Math.round(width * 100) / 100; // + adjustedWidthPercent;
                if (width < 2) {
                    width = 2; // + adjustedWidthPercent;
                }
                // console.log(width);

                widthpercent = width + '%';
                color = item.color;
                forecolor =
                    item.name === 'h6' || item.name === 'lan'
                        ? 'white'
                        : 'black';
                rows.push(
                    <div
                        style={{
                            backgroundColor: color,
                            width: widthpercent,
                            height: '40px',
                            borderLeft: '0.25px solid black',
                            borderTop: '0.25px solid black',
                            borderBottom: '0.25px solid black',

                            padding: '0px',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: forecolor,
                            fontSize: '13px',
                            verticalAlign: 'center',
                        }}
                    >
                        {width > 5 ? (
                            <div>
                                <span id="dailyspan1"> {item.value}</span>
                                <span id="dailyspan2">
                                    Batch: [{item.batch_code}]
                                </span>
                                {/* <span id="dailyspan3">Terminal: [{item.terminal_code}]</span> */}
                            </div>
                        ) : (
                            <div>
                                <span id="dailyspan1"> {item.value}</span>
                                <span id="dailyspan2">[{item.batch_code}]</span>
                                {/* <span id="dailyspan3">[{item.terminal_code}]</span> */}
                            </div>
                        )}
                        {/* {item.value} */}
                        {/* {item.value >= 2000 ? item.value : ""} */}
                    </div>
                );
            }
        });

        return <div className="dailycustomBarMainDiv">{rows}</div>;
    };

    const renderSwitchChoices = (selectValue) => {
        // eslint-disable-next-line default-case
        switch (selectValue) {
            // case "Dropping":
            //   return <Depot1 data={transformedData} />;
            case 'Dropping':
                // console.log("Stock");
                return <Depot1 data={transformedData} />;

            case 'Stock':
                // console.log("Stock");
                return <Depot1 data={transformedData} />;

            case 'Demand':
                return <Depot1 data={transformedData} />;

            //   case "Tankage":
            //     return <Depot1 data={allTankageData} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="visualisationDaily">
                <Sidebar setAuth={setAuth}/>
                <div className="visualisationDaily-container">
                    <Navbar />
                    <div className='graph'>
                        <div className="Daily">
                            <div className="dailygridContainer">
                                {/*Page Title Column 1 */}
                                <div className="dailygridItem1">
                                    <div className="dailytabularSection">
                                        Graph View
                                    </div>
                                </div>
                                {/*Page Title Column 2 */}
                                <div className="dailygridItem2"></div>
                                <div className="dailygridItemTitleFiller"></div>
                                {/* Depots Graph Row - Side Heading Section GRID Layout */}
                                <div className="dailygridItem3">
                                    {/* Depots Graph Side Heading */}
                                    <div className="dailygridItem3-1">
                                        <div className="dailysideHeadings">
                                            Depots
                                        </div>
                                    </div>
                                    {/* Depots Graph SubHeading */}
                                    <div className="dailygridItem3-2">
                                        <div className="dailysideSubHeadings">
                                            {selectValue}{' '}
                                        </div>
                                    </div>
                                    {/* Depots Graph associated Date/Time */}
                                    <div className="dailygridItem3-3">
                                        <div className="dailydateSubHeadings">
                                            {sliderValue} {month} {year}
                                        </div>
                                    </div>
                                </div>
                                {/* Depots Graph */}
                                <div className="dailygridItem4">
                                    <div className="dailydepotWiseChart">
                                        {renderSwitchChoices(selectValue)}
                                    </div>
                                </div>
                                {/* Drop Down Choice Row */}
                                <div className="dailygridItem5"></div>
                                {/* Drop Down Select */}
                                <div className="dailygridItem6">
                                    <select
                                        className="round"
                                        id="depotOptions"
                                        onChange={handleSelectChange}
                                        value={selectValue}
                                    >
                                        {/* <option value="Dropping">Dropping</option> */}
                                        <option value="Stock">Stock</option>
                                        <option value="Demand">Demand</option>
                                        <option value="Dropping">
                                            Dropping
                                        </option>
                                        {/* <option value="Tankage">Tankage</option>           */}
                                    </select>
                                </div>
                                {/* Filler Space 1 */}
                                <div className="dailyfiller1"></div>
                                <div className="dailygridItem7">
                                    <div className="dailygridItem7-1">
                                        <div className="dailysideHeadings">
                                            LineFill
                                        </div>
                                    </div>
                                    <div className="dailygridItem7-2">
                                        <div className="dailysideSubHeadings">
                                            Mundra - Bahadurgarh
                                        </div>
                                        {/* TO CREATE DATABASE TABLE CAPTURING START AND END OF PIPELINE */}
                                    </div>
                                    <div className="dailygridItem7-3">
                                        <div className="dailydateSubHeadings">
                                            {sliderValue} {month} {year}
                                        </div>
                                    </div>
                                </div>
                                {/* Scrolling Container - Displays TODAY'S LineFill */}
                                <div className="dailygridItem8" id="scrolldiv">
                                    {/* Calibration Row Tick */}
                                    <div className="dailyhsbarTopRowTick">
                                        {calibrationChartTick(1000)}
                                    </div>
                                    {/* Calibration Row Label */}
                                    <div className="dailyhsbarTopRowLabel">
                                        {calibrationChartValues(1000)}
                                    </div>
                                    {/* Distance wise Depots Label */}
                                    <div className="dailyhsbarMiddleRowLabel">
                                        {terminalVolumeSchedule_Pipeline.map(
                                            (terminal) => (
                                                <div
                                                    className={`daily${terminal.Terminal_name.toLowerCase()}L`}
                                                    key={terminal.Terminal_code}
                                                >
                                                    {terminal.Terminal_name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {/* Distance wise Depots Tick */}
                                    <div className="dailyhsbarMiddleRowTick">
                                        {terminalVolumeSchedule_Pipeline.map(
                                            (terminal) => (
                                                <div
                                                    className={`daily${terminal.Terminal_name.toLowerCase()}`}
                                                    key={terminal.Terminal_code}
                                                >
                                                    {terminal.Terminal_name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {/* BOTH DEPOT LABEL AND DEPOT TICK SHALL BE OBTAIN BY DATABASE */}

                                    {/* Custom Horizontal Scroll Bar - Displays TODAY'S Linefill */}
                                    <div className="dailyhsbar">
                                        {customBarChart(todayData, 161621)}
                                    </div>
                                    {/* LENGTH OF THE PIPLINE TO BE OBTAINED FROM DB (161621)*/}
                                </div>
                                {/* Tomorrow Line Fill  Side Heading */}
                                <div className="dailygridItem9">
                                    <div className="dailygridItem9-1">
                                        <div className="dailysideHeadings"></div>
                                    </div>
                                    <div className="dailygridItem9-2">
                                        <div className="dailysideSubHeadings"></div>
                                    </div>
                                    <div className="dailygridItem9-3">
                                        {sliderValue === 31 ? (
                                            <div className="dailydateSubHeadings">
                                                {' '}
                                                {sliderValue} {month} {year}{' '}
                                            </div>
                                        ) : (
                                            <div className="dailydateSubHeadings">
                                                {' '}
                                                {sliderValue + 1} {month} {year}{' '}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Scrolling Container - Displays TOMORROW'S LineFill */}
                                <div className="dailygridItem10">
                                    {/* Calibration Row Tick */}
                                    <div className="dailyhsbarTopRowTick">
                                        {calibrationChartTick(1000)}
                                    </div>
                                    {/* Calibration Row Label */}
                                    <div className="dailyhsbarTopRowLabel">
                                        {calibrationChartValues(1000)}
                                    </div>
                                    {/* Distance wise Depots Label */}
                                    <div className="dailyhsbarMiddleRowLabel">
                                        {terminalVolumeSchedule_Pipeline.map(
                                            (terminal) => (
                                                <div
                                                    className={`daily${terminal.Terminal_name.toLowerCase()}L`}
                                                    key={terminal.Terminal_code}
                                                >
                                                    {terminal.Terminal_name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {/* Distance wise Depots Tick */}
                                    <div className="dailyhsbarMiddleRowTick">
                                        {terminalVolumeSchedule_Pipeline.map(
                                            (terminal) => (
                                                <div
                                                    className={`daily${terminal.Terminal_name.toLowerCase()}`}
                                                    key={terminal.Terminal_code}
                                                >
                                                    {terminal.Terminal_name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {/* Custom Horizontal Scroll Bar - Displays TOMORROW'S Linefill */}
                                    <div className="dailyhsbar">
                                        {customBarChart(tomorrowData, 161621)}
                                    </div>
                                </div>
                                <div className="dailygridItem11"></div>
                                <div className="dailygridItem12"></div>
                                <div className="dailygridItem13"></div>
                                <div className="dailygridItem14">
                                    <div className="dailysliderLeftArrow">
                                        <button
                                            className="dailyslider-btn"
                                            onClick={handlePreviousButtonClick}
                                        >
                                            Prev
                                            {/* <ArrowLeftOutlined style={{ fontSize: "45px", color: "white" }} /> */}
                                        </button>
                                    </div>
                                    <div className="dailyslider">
                                        <input
                                            type="range"
                                            min="1"
                                            max="31"
                                            className="dailyslider"
                                            value={sliderValue}
                                            onChange={handleSliderChange}
                                        ></input>
                                    </div>
                                    <div className="dailysliderRightArrow">
                                        <button
                                            className="dailyslider-btn"
                                            onClick={handleNextButtonClick}
                                        >
                                            {/* <ArrowRightOutlined
                    style={{ fontSize: "45px", color: "white" }}
                  /> */}
                                            Next
                                        </button>
                                    </div>
                                </div>
                                {/* /* ============== BRANCH LINE FILL palanPUR vadADORA =================== */}

                                {/* Branch Line Fill  Side Heading */}
                                <div className="dailygridItem16">
                                    <div className="dailygridItem16-1">
                                        <div className="dailybranchsideHeadings">
                                            Branch LineFill
                                        </div>
                                    </div>
                                    <div className="dailygridItem16-2">
                                        <div className="dailybranchsideSubHeadings">
                                            palanpur - vadodara
                                        </div>
                                    </div>
                                    <div className="dailygridItem16-3">
                                        <div className="dailydateSubHeadings">
                                            {sliderValue} {month} {year}
                                        </div>
                                    </div>
                                </div>
                                <div className="dailygridItem17" id="scrolldiv">
                                    {/* Calibration Row Tick */}
                                    <div className="dailyhsbarTopRowTick">
                                        {calibrationChartTick(1000)}
                                    </div>
                                    {/* Calibration Row Label */}
                                    <div className="dailyhsbarTopRowLabel">
                                        {calibrationChartValues(1000)}
                                    </div>

                                    {/* Custom Horizontal Scroll Bar - Displays TODAY'S Linefill */}
                                    <div className="dailyhsbarpalvad">
                                        {customBarChart(
                                            todayData_for_Palvad_branch,
                                            36613
                                        )}
                                    </div>
                                </div>
                                <div className="dailygridItem18"></div>
                                {/* ============== BRANCH LINE FILL awa SALawaS =================== */}
                                {/* Branch Line Fill  Side Heading */}
                                <div className="dailygridItem19">
                                    <div className="dailygridItem19-1">
                                        <div className="dailybranchsideHeadings">
                                            Branch LineFill
                                        </div>
                                    </div>
                                    <div className="dailygridItem19-2">
                                        <div className="dailybranchsideSubHeadings">
                                            awa-Salawas
                                        </div>
                                    </div>
                                    <div className="dailygridItem19-3">
                                        <div className="dailydateSubHeadings">
                                            {sliderValue} {month} {year}
                                        </div>
                                    </div>
                                </div>
                                <div className="dailygridItem20">
                                    {/* Calibration Row Tick */}
                                    <div className="dailyhsbarTopRowTick">
                                        {calibrationChartTick(1000)}
                                    </div>
                                    {/* Calibration Row Label */}
                                    <div className="dailyhsbarTopRowLabel">
                                        {calibrationChartValues(1000)}
                                    </div>
                                    <div className="dailyhsbarASAL">
                                        {customBarChart(
                                            todayData_for_Asal_branch,
                                            5006
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisualisationDaily;
