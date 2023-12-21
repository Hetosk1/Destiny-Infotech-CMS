import React, { useState, useEffect } from 'react';
import tableDataComplex from "../default/variables/tableDataComplex.json";
import { BrowserRouter as Router, Route, Link, Redirect, useLocation } from 'react-router-dom';
import Widget from "components/widget/Widget";
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { MdAddChart, MdBarChart, MdDoNotDisturbOnTotalSilence, MdFullscreen, MdPerson } from 'react-icons/md';
// import { barChartDataDailyTraffic } from "variables/charts";
import { barChartOptionsDailyTraffic } from "variables/charts";
import { MdArrowDropUp } from "react-icons/md";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import { columnsDataCheck, columnsDataComplex } from "../default/variables/columnsData";
import { ip } from 'vars';
import ComplexTable from "views/admin/default/components/ComplexTable";
// const recentHours = [];



const Attendance = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); 
    const [id, setId] = useState(queryParams.get('emp_id'));
    const [name, setName] = useState({name: "lemaro"})
    const [presents, setPresents] = useState(0);
    const [absents, setAbsents] = useState(0);
    const [status, setStatus] = useState([]);
    const [hours, setHours] = useState({});
    const [recentHours, setRecentHours] = useState([]);

    const barChartDataDailyTraffic = [
        {
            name: "Daily Traffic",
            data: recentHours
        },
    ];

    const calculatePercentage = (value1, value2, total) => {
        console.log([value1, value2, total])
        const p1 = Math.floor(value1 * 100 / total);
        const p2 = 100 - p1;
        console.log([p1, p1]);
        return [p1, p2];
    }

    const data = {
        name: "Daily Traffic",
        data: [100, 30, 40, 20, 45],
    }
    
    useEffect(() => {
    // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                const response1 = await fetch(`http://${ip}:5000/employee/fetch/${id}`);
                const response2 = await fetch(`http://${ip}:5000/misc/countPresents/${id}`);
                const response3 = await fetch(`http://${ip}:5000/misc/countAbsents/${id}`);
                const response4 = await fetch(`http://${ip}:5000/misc/getStatus/${id}`); 
                const response5 = await fetch(`http://${ip}:5000/misc/getTotalHours/${id}`); 
                const response6 = await fetch(`http://${ip}:5000/misc/getRecentWorkDates/${id}`); 

                const responseData1 = await response1.json();
                const responseData2 = await response2.json();
                const responseData3 = await response3.json();
                const responseData4 = await response4.json();
                const responseData5 = await response5.json();
                const responseData6 = await response6.json();

                setName(responseData1);
                setPresents(responseData2);
                setAbsents(responseData3);
                setStatus(responseData4);
                setHours(responseData5);
                setRecentHours(responseData6)



                console.warn(responseData6.map(obj => obj.hours));
                console.log(name)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 100);

        return () => clearInterval(intervalId);
    }, []);


    



    return (
        <div className='mt-5 flex flex-col justify-between'>
            <div className='flex flex-row justify-between'>
                <div className='w-1/2  float-left'>
                    <div>
                    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
                        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                            <MdPerson/> 
                            </span>
                            </div>
                        </div>

                        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                            <p className="font-dm text-xl font-bold text-navy-600">{name.name}</p>
                        </div>
                    </Card> 
                    </div>
                    <div className='mt-4'>
                        <Card extra="!flex-row flex-grow items-center rounded-[20px]">
                            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                                <span className="flex items-center text-brand-500 dark:text-white">
                                <MdAddChart/> 
                                </span>
                                </div>
                            </div>

                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                <p className="font-dm text-xl font-bold text-navy-600">Total Days</p>
                                <p className="font-dm text-sm font-medium text-gray-600">{presents["COUNT(*)"] + absents["COUNT(*)"]}</p>
                            </div>
                        </Card> 
                    </div>
                    <div className='mt-4'>
                        <Card extra="!flex-row flex-grow items-center rounded-[20px]">
                            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                                <span className="flex items-center text-brand-500 dark:text-white">
                                <MdAddChart/> 
                                </span>
                                </div>
                            </div>

                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                <p className="font-dm text-xl font-bold text-navy-600">Total Presents</p>
                                <p className="font-dm text-sm font-medium text-gray-600">{presents["COUNT(*)"]}</p>
                            </div>
                        </Card> 
                    </div>
                    <div className='mt-4'>
                        <Card extra="!flex-row flex-grow items-center rounded-[20px]">
                            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                                <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                                <span className="flex items-center text-brand-500 dark:text-white">
                                <MdAddChart/> 
                                </span>
                                </div>
                            </div>

                            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                                <p className="font-dm text-xl font-bold text-navy-600">Total Absents</p>
                                <p className="font-dm text-sm font-medium text-gray-600">{absents["COUNT(*)"]}</p>
                            </div>
                        </Card> 
                    </div>
                </div>

                <div className='pl-5'>
                    <Card extra="p-7 p-[20px]">
                    <div className="flex flex-row justify-between">
                        <div className="ml-1 pt-2">
                        <p className="text-sm font-medium leading-4 text-gray-600">
                            Total Work Hours
                        </p>
                        <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                            {hours["SUM(hours)"]}{" "}
                            <span className="text-sm font-medium leading-6 text-gray-600">
                            hours 
                            </span>
                        </p>
                        </div>
                        <div className="mt-2 flex items-start">
                        <div className="flex items-center text-sm text-green-500">
                            {/* <MdArrowDropUp className="h-5 w-5" /> */}
                            {/* <p className="font-bold"> +2.45% </p> */}
                        </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full pt-10 pb-0">
                        { hours["SUM(hours)"] > 40  
                        ? 
                            <BarChart
                            chartData={barChartDataDailyTraffic}
                            chartOptions={barChartOptionsDailyTraffic}
                            />
                        : 
                            <div>
                                Analytics not started yet
                            </div>
                        }
                        
                    </div>
                    </Card>                
                </div>
            </div>
            <div className='flex flex-row justify-between mt-9'>
                <div className='w-1/2'>
                    <Card extra="rounded-[20px] p-3">
                        <div className="flex flex-row justify-between px-3 pt-2">
                            <div>
                            <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                                Attendance Statistics
                            </h4>
                            </div>

                            <div className="mb-6 flex items-center justify-center">
                            {/* <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                <option value="weekly">Weekly</option>
                            </select> */}
                            </div>
                        </div>

                        <div className="mb-auto flex h-[220px] w-full items-center justify-center">
                            <PieChart options={pieChartOptions} series={calculatePercentage(presents["COUNT(*)"], absents["COUNT(*)"], presents["COUNT(*)"] + absents["COUNT(*)"])} />
                        </div>
                        <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-[#86EFAC]" />
                                <p className="ml-1 text-sm font-normal text-gray-600">Present</p>
                            </div>
                            <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
                                {calculatePercentage(presents["COUNT(*)"], absents["COUNT(*)"], presents["COUNT(*)"] + absents["COUNT(*)"])[0]}%
                            </p>
                            </div>

                            <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

                            <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
                                <p className="ml-1 text-sm font-normal text-gray-600">Absent</p>
                            </div>
                            <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
                                {calculatePercentage(presents["COUNT(*)"], absents["COUNT(*)"], presents["COUNT(*)"] + absents["COUNT(*)"])[1]}%
                            </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='w-1/2'>
                    <div className=" pl-5 overflow-x-scroll xl:overflow-x-hidden">
                        {/* <ComplexTable
                            columnsData={columnsDataComplex}
                            tableData={status}
                        />  */}
                        <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
                            <div class="relative flex items-center justify-between pt-4 mt-0">
                                <div class="text-xl font-bold text-navy-700 dark:text-white">
                                Attendance List
                                </div>
                                {/* <CardMenu /> */}
                            </div>

                            <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
                                <table className="w-full">
                                <thead className="text-start">
                                    <tr>
                                        <th>
                                            <p className="text-xs tracking-wide text-gray-600">
                                            Date   
                                            </p>
                                        </th>
                                        <th>
                                            <p className="text-xs tracking-wide text-gray-600">
                                            Status   
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                        {status.map( data =>(
                                        <tr>
                                            <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">{data.date.slice(0, 10)}</p>
                                            </td>
                                            {data.status === "Present" 
                                            ?
                                            <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                                                <p className="text-sm font-bold text-green-300 dark:text-white">{data.status}</p>
                                            </td>
                                            :
                                            <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                                                <p className="text-sm font-bold text-red-500 dark:text-white">{data.status}</p>
                                            </td>}                 
                                        </tr>
                                        ))}
                                </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Attendance;