import React, { Component, ChangeEvent } from 'react'
import axios from 'axios'
import { ViewportProps } from 'react-map-gl'

import Spinner from './Spinner'
import searchIcon from '../assets/search.svg'


interface IProps {
  setViewport: (viewport: ViewportProps) => void
}
 

interface IState {
  searching: boolean
  found: []
}

export default class Search extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      searching: false,
      found: []
    }
  }

  findLocation = (e:ChangeEvent<HTMLInputElement>) => {
    this.setState({ searching: true })
    const { setViewport } = this.props
    const search = e.currentTarget.value

    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=3.04197,36.7525&bbox=-1.6493083537856015,33.99304840532303,8.149238947687452,37.545748538885896&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
      .then(res => {
        const { data: { features } } = res

        if( features.length > 0 ) {

          const found = features.map((feature: any) => (
                  { longitude: feature.center[0], 
                    latitude: feature.center[1], 
                    name: feature.place_name }
                  )
                )
          this.setState({ found })
            
          setViewport({
            width: '100vw',
            height: '100vh',
            zoom: 12,
            longitude: features[0].center[0],
            latitude: features[0].center[1]
          })
        }
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ searching: false }))
  }

  render() {
    const { searching } = this.state
    return (
      <div className="search-container">
          <div className="search">
            <div className="icon">
              <img src={searchIcon} alt="search" />
            </div>
            <div className="input-field">
              <input onChange={this.findLocation} type="text" placeholder=""/>
            </div>
            <Spinner width={20} height={20} searching={searching} borderColor={'#dcdcdc'} borderTopColor={'#CC0202'} />
          </div>
      </div>
    )
  }
}
