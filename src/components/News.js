import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=8a6af591c3cd4a5fb45b471e6a52a774&page=1&pageSize=9`
    props.setProgress(20)

    setLoading(true)
    let data = await fetch(url)
    props.setProgress(40)
    let parseData = await data.json()
    props.setProgress(70)
    setArticles(parseData.articles)
    setPage(1)
    setTotalResults(parseData.totalResults)
    setLoading(false)

    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsHunt`
    updateNews();
    // eslint-disable-line
  }, [])


  const prevPage = async () => {
    try {

      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=8a6af591c3cd4a5fb45b471e6a52a774&${page - 1}&pageSize=9`
      setLoading(true)
      props.setProgress(20)
      let data = await fetch(url)
      props.setProgress(40)
      let parseData = await data.json()
      props.setProgress(70)
      setArticles(parseData.articles)
      setPage(page - 1)
      setTotalResults(parseData.totalResults)
      setLoading(false)
      props.setProgress(100)
    }
    catch (e) {
      console.log("error")
    }
  }
  const nextPage = async () => {



    try {

      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${page + 1}&pageSize=9`;
      setLoading(true)
      props.setProgress(20)
      let data = await fetch(url);
      props.setProgress(40)
      let parsedData = await data.json()
      props.setProgress(70)
      setArticles(parsedData.articles)
      setPage(page + 1)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100)
    }
    catch (e) {
      console.log('error')
    }




  }





  return (
    <div>
      <div className="container my-3">
        <h1 className='text-center' style={{ margin: '2rem',marginTop : '5rem' }}><b>NewsHunt - </b>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <div className="row">
          {!loading && articles && articles.map((element) => {

            return <div className="col-md-4" key={element.url}>

              <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage ? element.urlToImage : "https://im.indiatimes.in/content/2023/Apr/HQ_Larry_Lifestyle_GREEN_CMF_RGB_642f93cdcf736.jpg"} url={element.url} publishedAt={element.publishedAt} name={element.source.name} />
            </div>
          })}

        </div>

      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} onClick={prevPage} type="button" className="btn btn-dark my-3">&larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults / 9)} onClick={nextPage} type="button" className="btn btn-dark my-3">Next &rarr;</button>
      </div>

    </div>

  )

}

export default News
