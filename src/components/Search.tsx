import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component<any, any> {

  findLocation = (e:any) => {
    const { setViewport } = this.props
    const search = e.currentTarget.value

    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=3.04197,36.7525&bbox=-1.6493083537856015,33.99304840532303,8.149238947687452,37.545748538885896&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
      .then(res => {

        if( res.data.features.length > 0 )
        setViewport({
          width: '100vw',
          height: '100vh',
          zoom: 12,
          longitude: res.data.features[0].center[0],
          latitude: res.data.features[0].center[1]
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="search-container">
         <input onChange={this.findLocation} type="text" name="" id=""/>
      </div>
    )
  }
}
