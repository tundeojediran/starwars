import React from 'react'
import { appHelpers } from '../../_helpers';

const Table = ({ data }) => {

    return (
        <div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Height (cm)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.height}</td>
                            </tr>
                        )
                    })}
                    <tr>
                                <td>{`Total of ${data.length} characters`}</td>
                                <td>{""}</td>
                                <td>{`Sum of Heights: ${appHelpers.calculateTotalHeight(data).sumHeights}cm(${appHelpers.calculateTotalHeight(data).sumHeightsInFeet})`}</td>
                            </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Table