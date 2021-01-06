import React, { useContext, useEffect, useState } from 'react'
import 'materialize-css'
import Axios from 'axios'
import {Tab, Tabs, Collection, CollectionItem} from 'react-materialize'
import userContext from '../App/context/userContext'

export default function StudentCourse(){
    const { userData } = useContext(userContext);
    const [wishList, setWishList] = useState([]);
    const [subList, setSubList] = useState([]);

    useEffect(() => {
        async function fetchSubs() {
            try {
                const res = await Axios.get("http://localhost:8080/watchlist");
                console.log(res.data);
                setWishList(res.data)
            } catch(err){
                throw new Error(`HTTP error! status: ` + err.message);
            }   
        }

        async function fetchWatchList() {
            try {
                const res = await Axios.get("http://localhost:8080/subcription");
                console.log(res.data);
                setWishList(res.data)
            } catch(err){
                throw new Error(`HTTP error! status: ` + err.message);
            }   
        }
        
        fetchWatchList();
        fetchSubs();
    },[]);

    return(
        <Tabs className="tabs z-depth-1">
            <>{userData.user ? (<><Tab active className="tab"
                options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
                }}
                title="Subcription">
                <Collection> 
                    {wishList.map(item => {
                        return (
                            <CollectionItem className="avatar">
                                <img
                                alt=""
                                className="circle"
                                src="https://materializecss.com/images/yuna.jpg"
                                />
                                <span className="title">
                                {item.title}
                                </span>
                                <p>
                                First Line 
                                <br />
                                Second Line
                                </p>
                                <a
                                className="secondary-content"
                                href="javascript:void(0)"
                                >
                                </a>
                            </CollectionItem>
                        )})}
                    </Collection>
            </Tab>
            <Tab className="tab"
                options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
                }}
                title="Watchlist">
                    <Collection> 
                    {wishList.map(item => {
                        return (
                            <CollectionItem className="avatar">
                                <img
                                alt=""
                                className="circle"
                                src="https://materializecss.com/images/yuna.jpg"
                                />
                                <span className="title">
                                {item.title}
                                </span>
                                <p>
                                First Line 
                                <br />
                                Second Line
                                </p>
                                <a
                                className="secondary-content"
                                href="javascript:void(0)"
                                >
                                </a>
                            </CollectionItem>
                        )})} 
                    </Collection>
                
            </Tab></>   ) : <></>} </>
            
        </Tabs>
    )    
}