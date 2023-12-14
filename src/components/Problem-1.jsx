import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Problem1 Component - Manages a task list with form submission and filtering options.
 */
const Problem1 = () => {
    // React Hook Form initialization
    const { register, handleSubmit, reset } = useForm();

    // State variables for tasks and filtering
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState('all');

    // Function to handle form submission
    const onSubmit = (data) => {
        setTasks([...tasks, data]);
        reset(); // Resets the form fields after submission
    };

    // Function to filter tasks based on their status
    const filteredTasks = () => {
        const lowerCaseShow = show.toLowerCase();

        return tasks.filter(task => {
            const lowerCaseStatus = task.status.toLowerCase()
            if (lowerCaseShow === 'active') {
                return lowerCaseStatus === 'active';
            } else if (lowerCaseShow === 'completed') {
                return lowerCaseStatus === 'completed';
            } else {
                return true;
            }
        }).sort((a, b) => {
            const statusA = a.status.toLowerCase();
            const statusB = b.status.toLowerCase();

            if (statusA < statusB) return -1;
            if (statusA > statusB) return 1;
            return 0;
        });
    };

    // Function to handle filter button clicks
    const handleClick = (val) => {
        setShow(val);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" {...register("name")} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" {...register("status")} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks().map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
