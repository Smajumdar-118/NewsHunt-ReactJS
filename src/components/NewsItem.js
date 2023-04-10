import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,url,urlToImage,publishedAt,name} = this.props
    return (
        <div className="card" style={{margin : '1rem 0rem'}}>
  <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1'}}>
    {name}
    <span className="visually-hidden"></span>
  </span>
          
  <img src={urlToImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a rel="noreferrer" href={url} target='_blank' className="btn btn-primary">Read More</a>
    <p className="card-text"><small className="text-muted">updated on {new Date(publishedAt).toGMTString()}</small></p>
  </div>
</div>
     
    
    )
  }
}

export default NewsItem
