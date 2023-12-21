import { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from "react-icons/md";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import userEvent from "@testing-library/user-event";
import { IoMdTrash } from 'react-icons/io';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ip } from 'vars';

const Payroll = ()  => {
    const [records, setRecords] = useState([]);
    const [names, setNames] = useState([]);

    function separateNumberAndName(inputString) {
        let number = "";
        let name = "";
        
        for (let char of inputString) {
            if (!isNaN(char)) {
                number += char;
            } else {
                name += char;
            }
        }
        
        return [number, name];
    }


    useEffect(() => {
        const fetchRecords = async () => {
            try{
                const response = await fetch(`http://${ip}:5000/leave/fetch`);
                const data = await response.json();
                setRecords(data);
                console.log("letoja : *");
                console.log(data);

                const response2 = await fetch(`http://${ip}:5000/employee/fetch`, {method: "GET"});
                const data2 = await response2.json();
                setNames(data2);


                console.log("Records : ");
                console.log(data2)
            } catch(err){
                console.log('error fetching records');

            }
        };
        fetchRecords();
        const interval = setInterval(fetchRecords, 100);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const toggleIcon = () => {
        const open = document.querySelector('.openIcon');
        const close = document.querySelector('.closeIcon');
        const form = document.querySelector('.form');

        open.classList.toggle('hidden');
        close.classList.toggle('hidden');
        form.classList.toggle('hidden');
    }

    const addLeaves = () => {
        const emp_id = document.querySelector('#emp-id');
        const start_date = document.querySelector("#start_date");
        const end_date = document.querySelector("#end_date");
 

        const newLeaves = {
            employee_id: separateNumberAndName(emp_id.value)[0],
            employee_name: separateNumberAndName(emp_id.value)[1],
            start_date: start_date.value,
            end_date: end_date.value, 
        };

        console.log('leto ja add Kairu');
        console.log(newLeaves);
        // console.log(start_date, end_date);

        fetch(`http://${ip}:5000/leave/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLeaves)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.warn('POST request successfull');
        })
        .catch(err => {
            console.log('loda laiga : ');
            console.log(err);
        })

        emp_id.value = null;
        start_date.value = null;
        end_date.value = null
        
        Swal.fire({
            title: 'Leave Mentioned Successfully!',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 2 seconds
            showConfirmButton: true,
        });

    }

    const removeLeaves = async (index) => {

        const deleteFinally = async () => {
            const response = await fetch(`http://${ip}:5000/leave/remove/${index}`, {
                method: "DELETE"
            });
        }


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFinally();
                Swal.fire(
                'Deleted!',
                'Leave has been cancelled',
                'success'
                )
            }
        })

    }

    const truncateData = () => {
        const deleteFinally = async () => {
            const response = await fetch(`http://${ip}:5000/leave/truncate`);
        }


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFinally();
                Swal.fire(
                'Deleted!',
                'All the employees have been removed.',
                'success'
                )
            }
        })
    }

    const editEmployee = (id, name, designation, join_date) => {
        console.log('hey');
        <Navigate to="/admin/employee/update" />
    }

    const getEmpName = (id) => {
        console.log('Founded index' + id);
        const name = names.find(name => name.id === id);
        console.log(name);
        return name;
    }

    return (
        <div className="mt-5">
            <div>
                <button onClick={toggleIcon} className="openIcon mt-2  rounded-xl bg-brand-500 p-5 font-large text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"><MdAdd className="openIcon"/></button>
                <button onClick={toggleIcon} className="closeIcon hidden  mt-2  rounded-xl bg-brand-500 p-5 font-large text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"><MdClose /></button>
                <button onClick={truncateData} className="truncIcon ml-2 mt-2  rounded-xl bg-red-500 p-5 font-large text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"><IoMdTrash className="openIcon"/></button>
            </div>
            {/* Sign in section */}
            
                <div className="hidden form mb-6 mb-9 width-3/4 p-5 border-[3px] border-brand-300 mt-4 rounded rounded-md ">
                

                <select id='emp-id' className='mb-3 ml-1 rounded rounded-lg outline-white w-full p-3 '>
                   {names.map(record => (
                    <option value={record.id+record.name}>{record.name} - {record.id}</option>
                    ))} 
                </select>

                {/* Email */}
                <InputField
                variant="auth"
                extra="mb-3"
                label="start date"
                placeholder="Employee Salary"
                id="start_date"
                type="date"
                />

                <InputField
                variant="auth"
                extra="mb-3"
                label="End date"
                placeholder="Employee Salary"
                id="end_date"
                type="date"
                />




                {/* Checkbox */}

                <button onClick={addLeaves} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Add Payroll
                </button></div>

                <table className="w-full" cellPadding={10} >
                <thead className="text-start border-b border-gray-200">
                    <tr>
                        <th className="text-lg tracking-wide text-gray-600">Leave id</th>
                        <th className="text-lg tracking-wide text-gray-600">Emp_id</th>
                        <th className="text-lg tracking-wide text-gray-600">Employee Name</th>
                        <th className="text-lg tracking-wide text-gray-600">Start Date</th>
                        <th className="text-lg tracking-wide text-gray-600">End Date</th>
                        <th className="text-lg tracking-wide text-gray-600">Edit</th>
                        <th className="text-lg tracking-wide text-gray-600">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.leave_id}</td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.employee_id}</td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.employee_name}</td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.start_date}</td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.end_date}</td>
                            <td className="text-md font-bold text-navy-700 dark:text-white"><Link to='/admin/employee/update'><button onClick={() => editEmployee(record.id, record.name, record.designation, record.join_date)} className="bg-green-300 p-2 rouded rounded-full"><MdEdit/></button></Link></td>
                            <td className="text-md font-bold text-navy-700 dark:text-white"><button onClick={() => removeLeaves(record.leave_id)} className="bg-red-400 p-2 rouded rounded-full"><MdDelete/></button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
                

        </div>
    );
};



export default Payroll;