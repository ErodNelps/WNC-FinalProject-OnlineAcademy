import React from 'react';
import 'materialize-css'
import { Table} from 'react-materialize';
import CourseItem from '../CourseItem'
import './style.css'

export default function MostViewed (){
    return(
        <div>
            <Table>
                <tbody>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                        <CourseItem></CourseItem>
                </tbody>
            </Table>
        </div>
    )
}