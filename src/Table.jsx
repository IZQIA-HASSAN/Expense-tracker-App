import React from 'react'

const Table = () => {
    return (
        <div>
            <div className='border flex '>
                <table border="1">
                    <nav>
                        <input type="text" placeholder='Serach by name' />
                        <select name="" id="">
                            <option value="">All type</option>
                            <option value="">income</option>
                            <option value="">expense</option>
                        </select>
                        <button>Sort by</button>
                        <button>category</button>
                        <button>category</button>
                        <button>Date</button>
                        <button>Amount</button>
                    </nav>
                    <tr>
                        <th>Name</th>
                        <th>category</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>

                    <tr>
                        <td>Category</td>
                        <td>20</td>
                        <td>Lahore</td>
                    </tr>

                    <tr>
                        <td>Type</td>
                        <td>22</td>
                        <td>Karachi</td>
                    </tr>

                    <tr>
                        <td>Date</td>
                        <td>22</td>
                        <td>Karachi</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Table