import React, { Component, ChangeEvent } from 'react'
import axios from 'axios'
import { ViewportProps } from 'react-map-gl'

import Spinner from './Spinner'
import searchIcon from '../assets/search.svg'


interface IProps {
  setViewport: (viewport: ViewportProps) => void
}

type Sug = {
  name: string
  long: number
  lat: number
}

interface IState {
  searching: boolean
  found: {
    message?: string
    list: Sug[]
  }
}

export default class Search extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      searching: false,
      found: {
        list: []
      }
    }
  }

  findLocation = (e:ChangeEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value
    if (search !== "") {
      this.setState({ searching: true })
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=3.04197,36.7525&bbox=-1.6493083537856015,33.99304840532303,8.149238947687452,37.545748538885896&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
      .then(res => {
        const { data: { features } } = res

        console.log(res)
        if( features.length > 0 ) {
          const list = features.map((feature: any) => ({ 
                                      long: feature.center[0], 
                                      lat: feature.center[1], 
                                      name: feature.matching_place_name ? feature.matching_place_name : feature.place_name 
                                    })
                                  )

          this.setState({ found: { list } })
        } else  this.setState({ found: { message: `Could not find ${search}.`, list: []}})
      })
      .catch(err => {
        console.dir(err)
        if (err.response.status === 404 ) this.setState({ found: { message: `Could not find ${search}.`, list: []}})
        else this.setState({ found: { message: `There was an error while looking for ${search}`, list: []}})
      })
      .finally(() => this.setState({ searching: false }))
    } else {
      this.setState({ found: { message: "", list: []}})
    }
  }

  onChoosePlace = (index: number) => {
    const { setViewport } = this.props
    const { long, lat } = this.state.found.list[index]
    setViewport({ width: '100vw', height: '100vh', zoom: 14, longitude: long, latitude: lat })
    this.setState({found: { list: [] } })
  }

  render() {
    const { searching, found } = this.state
    return (
      <div className="search-container">
          <div className="search">
            <div className="icon">
              <img src={searchIcon} alt="search" />
            </div>
            <div className="input-field">
              <input onChange={this.findLocation} type="text" placeholder="Search for a place"/>
            </div>
            <Spinner width={20} height={20} searching={searching} borderColor={'#dcdcdc'} borderTopColor={'#CC0202'} />
          </div>
          {
            found.message ? 
              <div className="suggestions">
                <div className="sug">
                  <p>{found.message}</p>
                </div>
              </div>
              :
              found.list.length > 0 && <div className="suggestions">
                { found.list.map((sug: Sug, index: number) => (
                    <div key={index} onClick={() => this.onChoosePlace(index)} className="sug">
                      <p>{sug.name}</p>
                    </div>) 
                )}
              </div>
          }
          
      </div>
    )
  }
}