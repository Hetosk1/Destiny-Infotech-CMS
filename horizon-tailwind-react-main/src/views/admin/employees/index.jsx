import { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from "react-icons/md";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import userEvent from "@testing-library/user-event";
import { IoMdTrash } from 'react-icons/io';
import { Link, Navigate, Route, Router } from 'react-router-dom';
import Attendance from '../attendance';
import Swal from 'sweetalert2';
import { ip } from 'vars';
import { swap } from 'formik';


const Employee = ()  => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try{
                const response = await fetch(`http://${ip}:5000/employee/fetch`);
                const data = await response.json();
                setRecords(data);
                console.log("Records : ");
                console.log(records)
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

    const addEmployee = () => {
        const nameForm = document.querySelector('#name');
        const designationForm = document.querySelector('#designation');
        const dateForm = document.querySelector('#date')
 

        const newEmployee = {
            name: nameForm.value,
            designation: designationForm.value,
            join_date: dateForm.value
        }

        console.log(newEmployee.join_date);

        fetch(`http://${ip}:5000/employee/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
        .then(response => response.json())
        .then(date => {
            console.log('POST request successfull');
        })
        .catch(err => {
            console.log('loda laiga : ');
            console.log(err);
        })

        nameForm.value = '';
        designationForm.value = '';
        dateForm.value = null;
        
        Swal.fire({
            title: 'Employee Added Successfully!',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 2 seconds
            showConfirmButton: true,
        });
    }

    const removeEmployee = async (index) => {
        
        const deleteFinally = async () => {
            const response = await fetch(`http://${ip}:5000/employee/remove/${index}`, {
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
                'Your file has been deleted.',
                'success'
                )
            }
        })

    }

    const truncateData = () => {
        const deleteFinally = async () => {
            const response = await fetch(`http://${ip}:5000/employee/truncate`);
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

    return (
        <div className="mt-5">
            <div>
                <button onClick={toggleIcon} className="openIcon mt-2  rounded-xl bg-brand-500 p-5 font-large text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"><MdAdd className="openIcon"/></button>
                <button onClick={toggleIcon} className="closeIcon hidden  mt-2  rounded-xl bg-brand-500 p-5 font-large text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"><MdClose /></button>
                <button onClick={truncateData} className="truncIcon ml-2 mt-2  rounded-xl bg-red-500 p-5 font-large text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"><IoMdTrash className="openIcon"/></button>
            </div>

            
                <div className="hidden form mb-6 mb-9 width-3/4 p-5 border-[3px] border-brand-300 mt-4 rounded rounded-md ">
                


                <input
                className="mb-3"
                label="Name*"
                placeholder="Employee Name"
                id="name"
                type="text"
                required
                />

                <input
                className="mb-3"
                label="Designation"
                placeholder="Employee Designation"
                id="designation"
                type="text"
                required
                />

                <input
                className="mb-3"
                label="Joining Date"
                id="date"
                type="date"
                required
                />


                {/* Checkbox */}

                <button onClick={addEmployee} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Add
                </button></div>

                <table className="w-full" cellPadding={10} >
                <thead className="text-start border-b border-gray-200">
                    <tr>
                        <th className="text-lg tracking-wide text-gray-600">Id</th>
                        <th className="text-lg tracking-wide text-gray-600">Name</th>
                        <th className="text-lg tracking-wide text-gray-600">Designation</th>
                        <th className="text-lg tracking-wide text-gray-600">hire_date</th>
                        <th className="text-lg tracking-wide text-gray-600">Edit</th>
                        <th className="text-lg tracking-wide text-gray-600">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.id}</td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white"><Link to={`/admin/attandace?emp_id=${record.id}`}>{record.name}</Link></td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.designation}</td>
                            <td className="text-sm font-bold text-navy-700 dark:text-white">{record.join_date}</td>
                            <td className="text-md font-bold text-navy-700 dark:text-white"><Link to='/admin/employee/update'><button onClick={() => editEmployee(record.id, record.name, record.designation, record.join_date)} className="bg-green-300 p-2 rouded rounded-full"><MdEdit/></button></Link></td>
                            <td className="text-md font-bold text-navy-700 dark:text-white"><button onClick={() => removeEmployee(record.id)} className="bg-red-400 p-2 rouded rounded-full"><MdDelete/></button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    );
};



export default Employee;