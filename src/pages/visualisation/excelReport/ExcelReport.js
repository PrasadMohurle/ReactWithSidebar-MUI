import React, { useState, useEffect, useCallback } from 'react';
import './excelReport.scss';
import ExcelJS from 'exceljs';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';

const ExcelReport = ({ setAuth }) => {
    const [pumpingData, setPumpingData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [droppingData, setDroppingData] = useState([]);
    const [demandData, setDemandData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [tankageData, setTankageData] = useState([]);
    const [totalPumpQuantities, setTotalPumpQuantities] = useState([]);
    const [totalDropQuantities, setTotalDropQuantities] = useState([]);
    const [totalDifferenceQuantities, setTotalDifferenceQuantities] = useState(
        []
    );
    const [error, setError] = useState(null);

    const fetchPumpingData = useCallback(async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/procedure/mdplPumping',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            setPumpingData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    }, []);

    const fetchScheduleData = useCallback(async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/procedure/mdplSchedule',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            setScheduleData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    }, []);

    const fetchDroppingData = useCallback(async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/procedure/dropping'
            );
            const data = await response.json();
            setDroppingData(data);
        } catch (error) {
            console.error('Error fetching dropping data:', error);
            setError('Error fetching dropping data. Please try again later.');
        }
    }, []);

    const fetchDemandData = useCallback(async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/procedure/demand',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            // console.log(data);
            setDemandData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    }, []);

    const fetchStockData = useCallback(async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/procedure/stock',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            // console.log(data);
            setStockData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    }, []);

    const fetchTankageData = useCallback(async () => {
        try {
            const response = await fetch(
                'http://localhost:5005/procedure/tankage',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const data = await response.json();
            // console.log(data);
            setTankageData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    }, []);

    useEffect(() => {
        fetchPumpingData();
        fetchScheduleData();
        fetchDroppingData();
        fetchDemandData();
        fetchStockData();
        fetchTankageData();
        // eslint-disable-next-line
    }, []);

    function ExcelDownlaod() {
        const workbook = new ExcelJS.Workbook();

        let currentColumn = 2;
        let currentRow = 2;

        //  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   CODE FOR SCHEDULE SHEET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        const ScheduleWorksheet = workbook.addWorksheet('Schedule');

        const excludedKeys = [
            'Schedule_header_id',
            'Schedule_date',
            'Batch_code',
            'Terminal_id',
        ];

        const headers = Array.from(
            new Set(
                scheduleData
                    .filter((header) => Object.keys(header))
                    .flatMap((header) => Object.keys(header))
            )
        )
            .filter((key) => !excludedKeys.includes(key))
            .flatMap((key) => {
                let headerItems = [];
                if (key === 'Terminal_code') {
                    headerItems.push({ headVal: 'TOP', key: key });
                } else if (key === 'product_code') {
                    headerItems.push({ headVal: 'PRD', key: key });
                } else if (key === 'quantity') {
                    headerItems.push({ headVal: 'VOL (in KL)', key: key });
                    headerItems.push({ headVal: '', key: '' }); // Add empty column
                } else {
                    headerItems.push({ headVal: key, key: key });
                }
                return headerItems;
            });

        //  ****************************** PUMPING TABLE ******************************
        // FETCHING UNIQUE PRODUCTS FROM PUMPING DATA AND STORING IT IN uniquePumpingProducts
        let uniquePumpingProducts = Array.from(
            new Set(pumpingData.map((row) => row.product_code))
        );
        // FETCHING UNIQUE DATE FROM PUMPING DATA AND STORING IT IN uniquePumpingDates
        const uniquePumpingDates = Array.from(
            new Set(pumpingData.map((row) => row.Schedule_date))
        );

        // ADDING UNIQUE DATE TO THE SHEET
        uniquePumpingDates.forEach((date, pumpingDateIndex) => {
            // Print the date at the top of each table
            const dateCell = ScheduleWorksheet.getCell(
                currentRow,
                currentColumn
            );
            dateCell.value = date;
            dateCell.font = { bold: true, italic: true };
            dateCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF53' },
            };

            if (pumpingDateIndex !== uniquePumpingDates.length - 1) {
                currentColumn += headers.length + 2; //ADDING COLUMN SPACING AFTER EACH TABLE , USING THE HEADERS VARIABLE LENGTH
            }
        });

        currentColumn = 2;
        currentRow = 4;
        // FILTERING THE DATA AND STORING IT IN singleDatePumpingData VARIABLE IF row.Schedule_day IS EQUAL TO EACH date IN dates
        uniquePumpingDates.forEach((date, pumpingDateIndex) => {
            const singleDatePumpingData = pumpingData.filter(
                (row) => row.Schedule_date === date
            );
            if (singleDatePumpingData.length > 0) {
                // ADDING HEADERS TO THE PUMPING TABLE
                singleDatePumpingData.forEach((row, index) => {
                    const cell = ScheduleWorksheet.getCell(
                        currentRow,
                        currentColumn + index
                    );
                    cell.value = row.product_code;
                    cell.font = { bold: true };
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'ff8052' },
                    };
                });

                currentRow++;

                // ADDING ROWS IN THE PUMPING TABLE
                singleDatePumpingData.forEach((row, index) => {
                    const cell = ScheduleWorksheet.getCell(
                        currentRow,
                        currentColumn + index
                    );
                    cell.value = row.quantity;
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'ffcdbb' },
                    };
                });

                // Calculate the sum of 'pump quantity'
                const totalPumpQuantity = singleDatePumpingData.reduce(
                    (sum, row) => sum + row.quantity,
                    0
                );
                setTotalPumpQuantities((prevTotalPumpQuantities) => [
                    ...prevTotalPumpQuantities,
                    totalPumpQuantity,
                ]);
                // console.log('totalPumpQuantities:', totalPumpQuantities);

                if (pumpingDateIndex !== uniquePumpingDates.length - 1) {
                    currentColumn += headers.length + 2; //ADDING COLUMN SPACING AFTER EACH TABLE , USING THE HEADERS VARIABLE LENGTH
                    currentRow = 4; // RESETTING THE ROWS VARIABLE TO START A NEW TABLE
                }
            }
        });

        //  ****************************** SCHEDULE TABLE ******************************
        currentRow = 4; //UPDATING CURRENT ROW VALUE
        currentColumn = 2; //UPDATING CURRENT COLUMN VALUE

        // FETCHING UNIQUE DATE FROM SCHEDULE DATA AND STORING IT IN ScheduleDays
        const uniqueScheduleDates = Array.from(
            new Set(scheduleData.map((row) => row.Schedule_date))
        );

        const scheduleHeaderColors = {
            TOP: { argb: 'adff2f' },
            PRD: { argb: 'adff2f' },
            'VOL (in KL)': { argb: 'adff2f' },
            '': { argb: '' },
        };

        uniqueScheduleDates.forEach((date, ScheduleDateIndex) => {
            const singleDateScheduleData = scheduleData.filter(
                (row) => row.Schedule_date === date
            );
            if (singleDateScheduleData.length > 0) {
                // ADDING HEADERS FOR THIS SCHEDULE TABLE
                currentRow += 3;
                headers.forEach((header, index) => {
                    const cell = ScheduleWorksheet.getCell(
                        currentRow,
                        currentColumn + index
                    );
                    cell.value = header.headVal;
                    cell.font = { bold: true };
                    if (scheduleHeaderColors.hasOwnProperty(header.headVal)) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: scheduleHeaderColors[header.headVal],
                        };
                    } else {
                        // Default fill color if no matching header value is found
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'dfdfe2' }, // Default color (white) - change it as needed
                        };
                    }
                });
                currentRow++;

                // ADDING ROWS IN THE SCHEDULE TABLE
                singleDateScheduleData.forEach((row) => {
                    headers.forEach((header, index) => {
                        const key = header.key;
                        const cell = ScheduleWorksheet.getCell(
                            currentRow,
                            currentColumn + index
                        );
                        cell.value = row[key];
                    });
                    currentRow++;
                });

                // Initialize totalDropQuantity
                let totalDropQuantity = 0;

                singleDateScheduleData.forEach((row) => {
                    // Sum the values for VAD, PAL, AWA, AJM, JAI, REV, and BAH for each row
                    // THIS PART IS HARDCODED AND IT IS NOT DYNAMIC
                    totalDropQuantity +=
                        (row.VAD || 0) +
                        (row.PAL || 0) +
                        (row.AWA || 0) +
                        (row.AJM || 0) +
                        (row.JAI || 0) +
                        (row.REV || 0) +
                        (row.BAH || 0);
                });

                // Store the totalDropQuantity value
                setTotalDropQuantities((prevTotalDropQuantities) => [
                    ...prevTotalDropQuantities,
                    totalDropQuantity,
                ]);

                if (ScheduleDateIndex !== uniquePumpingDates.length - 1) {
                    currentColumn += headers.length + 2; //ADDING COLUMN SPACING AFTER EACH TABLE , USING THE HEADERS VARIABLE LENGTH
                    currentRow = 4; // RESETTING THE ROWS VARIABLE TO START A NEW TABLE
                }
            }
        });

        //  ****************************** DROPPING & PUMPING DIFFERENCE TABLE ******************************
        let totalPumpIndex = 0;
        let totalDropIndex = 0;
        let currentRowDifference = 4;
        currentColumn = parseInt(uniquePumpingProducts.length + 5);

        // Assuming totalPumpQuantities and totalDropQuantities have the same length
        const differences = totalPumpQuantities.map(
            (pumpQuantity, index) => pumpQuantity - totalDropQuantities[index]
        );

        // Set the differences in the totalDifferenceQuantities array
        setTotalDifferenceQuantities(differences);

        const differenceHeaders = [
            { headVal: 'Pump', key: 'Pump' },
            { headVal: 'Drop', key: 'Drop' },
            { headVal: 'Difference', key: 'Difference' },
        ];

        uniquePumpingDates.forEach((date, pumpingDateIndex) => {
            const filteredData = pumpingData.filter(
                (row) => row.Schedule_date === date
            );
            if (filteredData.length > 0) {
                // ADDING HEADERS FOR THIS TABLE
                currentRowDifference = 4;
                differenceHeaders.forEach((header, index) => {
                    const cell = ScheduleWorksheet.getCell(
                        currentRowDifference,
                        currentColumn + index
                    );
                    cell.value = header.headVal;
                    cell.font = { bold: true };
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'AE78D6' },
                    };
                });

                currentRowDifference++;

                // ADDING ROWS IN THE TABLE
                differenceHeaders.forEach((header, index) => {
                    const cell = ScheduleWorksheet.getCell(
                        currentRowDifference,
                        currentColumn + index
                    );
                    if (header.headVal === 'Pump') {
                        if (totalPumpIndex < totalPumpQuantities.length) {
                            const value = totalPumpQuantities[totalPumpIndex]; // Get the next value
                            totalPumpIndex++; // Increment the index for the next date
                            const valueCell = ScheduleWorksheet.getCell(
                                currentRowDifference,
                                currentColumn + index
                            );
                            valueCell.value = value; // Set the 'Pump' value using totalPumpQuantities
                        }
                    } else if (header.headVal === 'Drop') {
                        if (totalDropIndex < totalDropQuantities.length) {
                            const value = totalDropQuantities[totalDropIndex]; // Get the next value
                            totalDropIndex++; // Increment the index for the next date
                            const valueCell = ScheduleWorksheet.getCell(
                                currentRowDifference,
                                currentColumn + index
                            );
                            valueCell.value = value; // Set the 'Drop' value using totalDropQuantities
                        }
                    } else if (header.headVal === 'Difference') {
                        if (totalDropIndex < totalDifferenceQuantities.length) {
                            const value =
                                totalDifferenceQuantities[totalDropIndex]; // Get the next value from totalDifferenceQuantities
                            totalDropIndex++; // Increment the index for the next date
                            console.log(value);
                            const valueCell = ScheduleWorksheet.getCell(
                                currentRowDifference,
                                currentColumn + index
                            );
                            valueCell.value = value; // Set the 'Difference' value using totalDifferenceQuantities
                        }
                    }
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'DEC8EE' },
                    };
                });
            }

            if (pumpingDateIndex !== uniquePumpingDates.length - 1) {
                currentColumn += headers.length + 2; //ADDING COLUM SPACING AFTER EACH TABLE , USING THE HEADERS VARIABLE LENGTH
                currentRow = 4; // RESETTING THE ROWS VARIABLE TO START A NEW TABLE
            }
        });

        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   CODE FOR DROPPING_PIPELINE SHEET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        const DroppingWorksheet = workbook.addWorksheet('Dropping');

        // FETCHING UNIQUE TERMINAL CODE (location) FROM dropping Data AND STORING IT IN uniqueDrroppingTerminalCodes
        const uniqueDrroppingTerminalCodes = [
            ...new Set(droppingData.map((entry) => entry.Terminal_code)),
        ];
        // FETCHING UNIQUE Products FROM dropping Data AND STORING IT IN uniqueDroppingProducts
        const uniqueDroppingProducts = [
            ...new Set(
                droppingData
                    .filter((entry) => entry.Product !== null)
                    .flatMap((entry) =>
                        entry.Product.split(',').map(
                            (item) => item.split(':')[0]
                        )
                    )
            ),
        ];
        // FETCHING UNIQUE Dates FROM dropping Data AND STORING IT IN DroppingDates
        const DroppingDates = Array.from(
            new Set(droppingData.map((row) => row.Date_of_demand))
        );
        currentRow = 3; //UPDATING CURRENT ROW VALUE
        currentColumn = 2; //UPDATING CURRENT COLUMN VALUE

        let cell = DroppingWorksheet.getCell(currentRow, currentColumn);
        cell.value = 'Date';
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF53' },
        };
        DroppingDates.forEach((date) => {
            const singleDroppingDateData = droppingData.filter(
                (row) => row.Date_of_demand === date
            );
            if (singleDroppingDateData.length > 0) {
                currentRow++;
                singleDroppingDateData.forEach((row, index) => {
                    const cell = DroppingWorksheet.getCell(
                        currentRow,
                        currentColumn
                    );
                    cell.value = row.Date_of_demand;
                });
            }
        });

        currentRow = 2; //UPDATING CURRENT ROW VALUE
        currentColumn = 4; //UPDATING CURRENT COLUMN VALUE

        // Populating uniqueTerminalCodesArray values in Excel and incrementing currentColumn by 6
        uniqueDrroppingTerminalCodes.forEach((terminalCode) => {
            const terminalCodeCell = DroppingWorksheet.getCell(
                currentRow,
                currentColumn
            );
            terminalCodeCell.value = terminalCode;
            terminalCodeCell.font = { bold: true };
            terminalCodeCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF8193' },
            };
            // Fill the next 5 columns adjacent to terminalCodeCell with the same color
            for (let i = 1; i <= uniqueDroppingProducts.length - 1; i++) {
                const adjacentCell = DroppingWorksheet.getCell(
                    currentRow,
                    currentColumn + i
                );
                adjacentCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF8193' },
                };
            }
            currentColumn += uniqueDroppingProducts.length + 1; // Incrementing currentColumn by 6 to print the next location data
        });

        currentRow = 3; //UPDATING CURRENT ROW VALUE
        currentColumn = 4; //UPDATING CURRENT COLUMN VALUE
        const updateCell = (currentRow, currentColumn, productCode) => {
            const terminalProductCell = DroppingWorksheet.getCell(
                currentRow,
                currentColumn
            );
            terminalProductCell.value = productCode;
            terminalProductCell.font = { bold: true };
            terminalProductCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '89cff0' },
            };
            return currentColumn + 1;
        };

        for (
            let index = 0;
            index < uniqueDrroppingTerminalCodes.length;
            index++
        ) {
            currentColumn = uniqueDroppingProducts.reduce(
                (col, productCode) => updateCell(currentRow, col, productCode),
                currentColumn
            );

            currentColumn += 1; // Incrementing currentColumn by 6
        }

        currentRow = 4; //UPDATING CURRENT ROW VALUE
        currentColumn = 4; //UPDATING CURRENT COLUMN VALUE

        DroppingDates.forEach((date) => {
            // Filter droppingData for the current date value
            const filteredData = droppingData.filter(
                (entry) => entry.Date_of_demand === date
            );

            filteredData.forEach((entry) => {
                if (entry.Product !== null) {
                    const { Terminal_code, Product } = entry;
                    const terminalCodeIndex =
                        uniqueDrroppingTerminalCodes.indexOf(Terminal_code);
                    const productKeyValues = Product.split(',').map((item) =>
                        item.split(':')
                    );

                    productKeyValues.forEach(
                        ([productCode, productValue], index) => {
                            const productIndex =
                                uniqueDroppingProducts.indexOf(productCode);

                            if (productIndex !== -1) {
                                // Calculate the correct column index based on terminal code and product code
                                const columnIndex =
                                    terminalCodeIndex *
                                        (uniqueDroppingProducts.length + 1) +
                                    productIndex +
                                    uniqueDroppingProducts.length -
                                    1 +
                                    Math.floor(
                                        index / uniqueDroppingProducts.length
                                    ); // Add an empty column after every terminal code is completed (h6,m6,h4,lan,k,etc) values

                                const terminalProductCell =
                                    DroppingWorksheet.getCell(
                                        currentRow,
                                        columnIndex
                                    );
                                terminalProductCell.value = Math.ceil(
                                    parseFloat(productValue)
                                );
                            }
                        }
                    );
                }
            });
            // Move to the next row for the next entry
            currentRow++;
        });

        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   CODE FOR DEPOT SHEET  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        currentRow = 2; //UPDATING CURRENT ROW VALUE
        currentColumn = 2; //UPDATING CURRENT COLUMN VALUE
        const DepotsWorksheet = workbook.addWorksheet('Depots');

        // FETCHING UNIQUE Dates FROM stock Data AND STORING IT IN uniqueDates
        const uniqueDates = [
            ...new Set(stockData.map((item) => item.Date_of_demand)),
        ];
        // FETCHING UNIQUE Stock Terminal Code (location) FROM stock Data AND STORING IT IN uniqueStockTerminalCode
        const uniqueStockTerminalCode = [
            ...new Set(stockData.map((item) => item.Terminal_code)),
        ];
        // FETCHING UNIQUE Stock Products FROM stock Data AND STORING IT IN uniqueStockProducts
        const uniqueStockProducts = [
            ...new Set(
                stockData.flatMap((item) =>
                    item.Product.split(',').flatMap(
                        (product) => product.split(':')[0]
                    )
                )
            ),
        ];
        // FETCHING UNIQUE Demand Terminal Code (location) FROM Demand Data AND STORING IT IN uniqueDemandTerminalCode
        const uniqueDemandTerminalCode = [
            ...new Set(demandData.map((item) => item.Terminal_code)),
        ];
        // FETCHING UNIQUE Demand Products FROM Demand Data AND STORING IT IN uniqueDemandProducts
        const uniqueDemandProducts = [
            ...new Set(
                demandData.flatMap((item) =>
                    item.Product.split(',').flatMap(
                        (product) => product.split(':')[0]
                    )
                )
            ),
        ];
        // FETCHING UNIQUE Tankage Terminal Code (location) FROM Tankage Data AND STORING IT IN uniqueTankageTerminalCode
        const uniqueTankageTerminalCode = [
            ...new Set(tankageData.map((item) => item.Terminal_code)),
        ];
        // FETCHING UNIQUE Tankage Products FROM Tankage Data AND STORING IT IN uniqueTankageProducts
        const uniqueTankageProducts = [
            ...new Set(
                tankageData.flatMap((item) =>
                    item.Product.split(',').flatMap(
                        (product) => product.split(':')[0]
                    )
                )
            ),
        ];

        currentRow = 3;
        currentColumn = 2;

        cell = DepotsWorksheet.getCell(currentRow, currentColumn);
        cell.value = 'Date';
        cell.font = { bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF53' },
        };

        uniqueDates.forEach((date) => {
            const singleData = stockData.filter(
                (row) => row.Date_of_demand === date
            );
            if (singleData.length > 0) {
                currentRow++;
                singleData.forEach((row, index) => {
                    const cell = DepotsWorksheet.getCell(
                        currentRow,
                        currentColumn
                    );
                    cell.value = row.Date_of_demand;
                });
            }
        });
        currentRow = 2; //UPDATING CURRENT ROW VALUE
        currentColumn = 4; //UPDATING CURRENT COLUMN VALUE

        // DEPOT STOCK DATA
        // Populating uniqueStockTerminalCode values in Excel
        uniqueStockTerminalCode.forEach((terminalCode) => {
            const stockTerminalCodeCell = DepotsWorksheet.getCell(
                currentRow,
                currentColumn
            );
            stockTerminalCodeCell.value = terminalCode + '  STOCKS';
            stockTerminalCodeCell.font = { bold: true };
            stockTerminalCodeCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '03FCCA' },
            };
            // Fill the next 5 columns adjacent to stockTerminalCodeCell with the same color
            for (let i = 1; i <= uniqueStockProducts.length - 1; i++) {
                const adjacentCell = DepotsWorksheet.getCell(
                    currentRow,
                    currentColumn + i
                );
                adjacentCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '03FCCA' },
                };
            }

            currentColumn += uniqueStockProducts.length + 1; // Incrementing currentColumn by 6
        });

        // DEPOT DEMAND DATA
        // Populating uniqueDemandTerminalCode values in Excel
        uniqueDemandTerminalCode.forEach((terminalCode) => {
            const demandTerminalCodeCell = DepotsWorksheet.getCell(
                currentRow,
                currentColumn
            );
            demandTerminalCodeCell.value = terminalCode + '  DEMAND';
            demandTerminalCodeCell.font = { bold: true };
            demandTerminalCodeCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'A9D08E' },
            };
            // Fill the next 5 columns adjacent to demandTerminalCodeCell with the same color
            for (let i = 1; i <= uniqueDemandProducts.length - 1; i++) {
                const adjacentCell = DepotsWorksheet.getCell(
                    currentRow,
                    currentColumn + i
                );
                adjacentCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'A9D08E' },
                };
            }

            currentColumn += uniqueDemandProducts.length + 1; // Incrementing currentColumn by 6
        });

        // DEPOT TANKAGE DATA
        // Populating uniqueTankageTerminalCode values in Excel
        uniqueTankageTerminalCode.forEach((terminalCode) => {
            const tankageTerminalCodeCell = DepotsWorksheet.getCell(
                currentRow,
                currentColumn
            );
            tankageTerminalCodeCell.value = terminalCode + '  TANKAGE';
            tankageTerminalCodeCell.font = { bold: true };
            tankageTerminalCodeCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FDAD55' },
            };
            // Fill the next 5 columns adjacent to tankageTerminalCodeCell with the same color
            for (let i = 1; i <= uniqueTankageProducts.length - 1; i++) {
                const adjacentCell = DepotsWorksheet.getCell(
                    currentRow,
                    currentColumn + i
                );
                adjacentCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FDAD55' },
                };
            }

            currentColumn += uniqueTankageProducts.length + 1; // Incrementing currentColumn by 6
        });

        // printing all the products for STOCK DEMAND & TANKAGE
        currentRow = 3; // UPDATING CURRENT ROW VALUE
        currentColumn = 4; // UPDATING CURRENT COLUMN VALUE

        const updateCells = (currentRow, currentColumn, productCode) => {
            const terminalProductCell = DepotsWorksheet.getCell(
                currentRow,
                currentColumn
            );
            terminalProductCell.value = productCode;
            terminalProductCell.font = { bold: true };
            terminalProductCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F2F2F2' },
            };
            return currentColumn + 1;
        };

        function processTerminalProducts(terminalCodes, products) {
            for (let index = 0; index < terminalCodes.length; index++) {
                currentColumn = products.reduce(
                    (col, productCode) =>
                        updateCells(currentRow, col, productCode),
                    currentColumn
                );
                currentColumn += 1; // Incrementing currentColumn
            }
        }

        processTerminalProducts(uniqueStockTerminalCode, uniqueStockProducts);
        processTerminalProducts(uniqueDemandTerminalCode, uniqueDemandProducts);
        processTerminalProducts(uniqueTankageTerminalCode, uniqueTankageProducts);

        // putting the respective data for STOCK DEMAND & TANKAGE
        currentRow = 4; //UPDATING CURRENT ROW VALUE
        currentColumn = 4; //UPDATING CURRENT COLUMN VALUE
        var currentDemandColumn = 0;
        var currentTankageColumn = 0;
        uniqueDates.forEach((date) => {
            // Filter stockData for the current date value
            const filteredData = stockData.filter(
                (entry) => entry.Date_of_demand === date
            );

            filteredData.forEach((entry) => {
                // console.log(entry);
                if (entry.Product !== null) {
                    const { Terminal_code, Product } = entry;
                    const terminalCodeIndex =
                        uniqueStockTerminalCode.indexOf(Terminal_code);
                    const productKeyValues = Product.split(',').map((item) =>
                        item.split(':')
                    );
                    // console.log(productKeyValues);

                    productKeyValues.forEach(
                        ([productCode, productValue, flag], index) => {
                            const productIndex =
                                uniqueStockProducts.indexOf(productCode);

                            if (productIndex !== -1) {
                                // Calculate the correct column index based on terminal code and product code
                                // console.log(index);
                                const columnIndex =
                                    currentColumn +
                                    terminalCodeIndex *
                                        (uniqueStockProducts.length + 1) +
                                    productIndex +
                                    Math.floor(
                                        index / uniqueStockProducts.length
                                    );
                                const terminalProductCell =
                                    DepotsWorksheet.getCell(
                                        currentRow,
                                        columnIndex
                                    );
                                terminalProductCell.value = Math.ceil(
                                    parseFloat(productValue)
                                );
                                // console.log(columnIndex);
                                currentDemandColumn = columnIndex;

                                // Check the flag and set cell color accordingly
                                if (flag === 'N') {
                                    terminalProductCell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'D8BFD8' }, // Purple color for 'N'
                                    };
                                } else if (flag === 'Y') {
                                    terminalProductCell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'E72929' }, // Red color for 'Y'
                                    };
                                }
                            }
                        }
                    );
                }
            });
            // Move to the next row for the next entry
            currentRow++;
        });

        currentRow = 4;
        currentDemandColumn += 2;
        uniqueDates.forEach((date) => {
            // Filter stockData for the current date value
            const filteredData = demandData.filter(
                (entry) => entry.Date_of_demand === date
            );

            filteredData.forEach((entry) => {
                // console.log(entry);
                if (entry.Product !== null) {
                    const { Terminal_code, Product } = entry;
                    const terminalCodeIndex =
                        uniqueDemandTerminalCode.indexOf(Terminal_code);
                    const productKeyValues = Product.split(',').map((item) =>
                        item.split(':')
                    );
                    // console.log(productKeyValues);

                    productKeyValues.forEach(
                        ([productCode, productValue], index) => {
                            const productIndex =
                                uniqueDemandProducts.indexOf(productCode);

                            if (productIndex !== -1) {
                                // Calculate the correct column index based on terminal code and product code
                                // console.log(index);
                                const columnIndex =
                                    currentDemandColumn +
                                    terminalCodeIndex *
                                        (uniqueDemandProducts.length + 1) +
                                    productIndex +
                                    Math.floor(
                                        index / uniqueDemandProducts.length
                                    );
                                const terminalProductCell =
                                    DepotsWorksheet.getCell(
                                        currentRow,
                                        columnIndex
                                    );
                                terminalProductCell.value = Math.ceil(
                                    parseFloat(productValue)
                                );
                                // console.log(columnIndex);
                                currentTankageColumn = columnIndex;
                            }
                        }
                    );
                }
            });
            // Move to the next row for the next entry
            currentRow++;
        });

        // console.log('currentDemandColumn :', currentDemandColumn);

        currentRow = 4;
        currentTankageColumn += 3;
        uniqueDates.forEach((date) => {
            // Filter stockData for the current date value
            // console.log(date);
            const filteredData = tankageData.filter(
                (entry) => entry.Schedule_day === date
            );

            filteredData.forEach((entry) => {
                if (entry.Product !== null) {
                    const { Terminal_code, Product } = entry;
                    const terminalCodeIndex =
                        uniqueTankageTerminalCode.indexOf(Terminal_code);
                    const productKeyValues = Product.split(',').map((item) =>
                        item.split(':')
                    );
                    // console.log(productKeyValues);

                    productKeyValues.forEach(
                        ([productCode, productValue], index) => {
                            const productIndex =
                                uniqueTankageProducts.indexOf(productCode);

                            if (productIndex !== -1) {
                                // Calculate the correct column index based on terminal code and product code
                                // console.log(index);
                                const columnIndex =
                                    currentTankageColumn +
                                    terminalCodeIndex *
                                        (uniqueTankageProducts.length + 1) +
                                    productIndex +
                                    Math.floor(
                                        index / uniqueTankageProducts.length
                                    );
                                const terminalProductCell =
                                    DepotsWorksheet.getCell(
                                        currentRow,
                                        columnIndex
                                    );
                                terminalProductCell.value = Math.ceil(
                                    parseFloat(productValue)
                                );
                            }
                        }
                    );
                }
            });
            // Move to the next row for the next entry
            currentRow++;
        });

        // GENERATING THE EXCEL FILE
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'MDPL_Schedule_Excel.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <>
            <div className="excel-report">
                <Sidebar setAuth={setAuth} />
                <div className="excel-report-container">
                    <Navbar />
                    <div className="title">
                        <h1>Excel Report</h1>
                        <button
                            className="excel-download"
                            onClick={ExcelDownlaod}
                        >
                            Download Excel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExcelReport;
