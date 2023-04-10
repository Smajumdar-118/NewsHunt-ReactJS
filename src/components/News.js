import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'


export class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles : [],
      page : 1,
      loading : false
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHunt`
  } 
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  async componentDidMount(){
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8a6af591c3cd4a5fb45b471e6a52a774&page=1&pageSize=9`
      this.props.setProgress(20)
      this.setState({loading : true})
      let data = await fetch(url)
      this.props.setProgress(40)
      let parseData = await data.json()
      this.props.setProgress(70)
      this.setState ({
        articles : parseData.articles,
        page : 1,
        totalResults : parseData.totalResults,
        loading : false
      })
      this.props.setProgress(100)
    }
    catch(e){
      console.log("Error")
    }
  }

  prevPage = async() =>{
    try{
      
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8a6af591c3cd4a5fb45b471e6a52a774&${this.state.page-1}&pageSize=9`
      this.setState({loading : true})
      this.props.setProgress(20)
        let data = await fetch(url)
        this.props.setProgress(40)
        let parseData = await data.json()
        this.props.setProgress(70)
        this.setState ({
          page : this.state.page -1,
          articles : parseData.articles,
          loading : false
        })
        this.props.setProgress(100)
    }
    catch(e){
      console.log("error")
    }
  }
  nextPage = async() =>{
    
    

      try{
  
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page + 1}&pageSize=9`;
        this.setState({loading : true})
        this.props.setProgress(20)
          let data = await fetch(url);
          this.props.setProgress(40)
          let parsedData = await data.json()
          this.props.setProgress(70)
          this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles,
              loading : false
          })
          this.props.setProgress(100)
      }
      catch(e){
        console.log('error')
      }
   

    
  
  }

  


  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className='text-center' style={{margin : '2rem'}}><b>NewsHunt - </b>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{

           return <div className="col-md-4" key={element.url}>

                 <NewsItem title = {element.title} description = {element.description} urlToImage= {element.urlToImage?element.urlToImage : "https://im.indiatimes.in/content/2023/Apr/HQ_Larry_Lifestyle_GREEN_CMF_RGB_642f93cdcf736.jpg"} url= {element.url} publishedAt={element.publishedAt} name={element.source.name}/>        
            </div>
        })}
            
        </div>   
                    
        </div> 
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} onClick={this.prevPage} type="button" className="btn btn-dark my-3">&larr; Previous</button>
        <button disabled ={this.state.page+1 > Math.ceil(this.state.totalResults/9)} onClick={this.nextPage} type="button" className="btn btn-dark my-3">Next &rarr;</button>
        </div>
           
      </div>
      
    )
  }
}

export default News
