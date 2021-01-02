import React from 'react';
import 'materialize-css'
import { Table} from 'react-materialize';
import CourseItem from '../CourseItem'
import './style.css'

export default function MostViewed (){
    //const courseItem = {title, category, lecturer}
    return(
        <div>
            <Table>
                <tbody>
                    <tr>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                    </tr>
                    <tr>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                        <td><CourseItem></CourseItem></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}