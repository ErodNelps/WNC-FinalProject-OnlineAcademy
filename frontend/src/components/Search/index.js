import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { Pagination, Preloader, Icon } from 'react-materialize';
import CourseItem from '../CourseItem';
import './style.css';
import Axios from 'axios'
import { useHistory } from 'react-router-dom';

export default function Search () {
    const [searchResult, setResult] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageNo, setCurrentPageNo] = useState(0);
    const [refinements, setRefinements] =useState([])
    const urlParams = new URLSearchParams(window.location.search);
    const history =useHistory()
    
    const getPageCount = (total, denom) => {
        const divisible = 0 === total %denom;
        const valueTobeAdded = divisible ? 0 : 1;
        return Math.floor(total/denom) + valueTobeAdded;
    };
    const handlePageClick = (event, type) => {
        event.preventDefault();
        const updatePageNo = 'prev' === type
			? setCurrentPageNo(currentPageNo - 1)
			: setCurrentPageNo(currentPageNo + 1);

		if(!loading) {
            setLoading(true);
            fetchSearchResult(updatePageNo, query);
		}
    };

    const fetchSearchResult = (updatedPageNo = '',query) => {
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        const searchUrl = `http://localhost:8080/courses/search?q=${query}${pageNumber}`
        let results = []
        if(query === ''){
            alert ("Please enter search terms!")
            return
        }
        Axios.get(searchUrl).then(res => {
            if(res.data.length == 0){
                setMessage("No search results found for " + query)
                setResult([])
                return
            }
            for(var i in res.data){
                var data = res.data[i];
                results.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                    rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                    bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
            };
            const total = results.length;
            const totalPagesCount = getPageCount(total, 5);
            
            setResult(results);
            setTotalResults(total);
            setTotalPages(totalPagesCount);
            setCurrentPageNo(updatedPageNo);
            setLoading(false);
            setMessage('');
        }).catch(err => {
            setLoading(false);
            if(err) { alert(err) }
        })     
    }

    const keypress = (e) =>{
        if(e.charCode === 13){
            history.push({
                pathname: '/search',
                search: '?q=' + query
              })
            fetchSearchResult(1, query)          
        }
    }

    useEffect(() => {
        setQuery(urlParams.get('q'));
        fetchSearchResult(1, query)
    },[]);

    // useEffect(() => {
    //     fetchSearchResult(1, query)
    // }, [urlParams.get('q')]);

    return(
        <div className="container">
			{/*	Heading*/}
			<h2 className="heading">Search results</h2>
			{/* Search Input*/}
			<label className="search-label" htmlFor={"search-input"}>
				<input
					type="text"
					name="query"
					value={ query }
					id="search-input"
					placeholder="Search..." onChange={(e) => setQuery(e.target.value)} onKeyPress={keypress}
				/>
				<i className="fa fa-search search-icon" aria-hidden="true"/>
			</label>

			{/*	Error Message*/}
				{message? <p className="message">{ message }</p>:<></>}
			{/*Navigation*/}
			{/* <PageNavigation
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => handlePageClick('prev')}
				handleNextClick={ () => handlePageClick('next')}
			/> */}
            {loading ? <Preloader /> : 
                (<>
                    <div className="results-container">
                        {searchResult.map((course) => (
                            <CourseItem key={course._id} course={course}></CourseItem>
                            ))}
                    </div></>)}
			{/*Navigation*/}
			<Pagination
            activePage={currentPageNo}
            items={totalPages}
            leftBtn={<Icon>chevron_left</Icon>}
            rightBtn={<Icon>chevron_right</Icon>}/>
        </div>
    )
}