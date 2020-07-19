import React, { Component, ChangeEvent } from 'react'
import IAnimal from '../interfaces/IAnimal'

import noImage from '../assets/no-img-available.jpg'

interface IProps {
  animal: IAnimal
  toggleSide: (isSideOpen: false | IAnimal | 'add-animal') => void
  reportAnimal: (id: number, report: string) => void
}

interface IState {
  report: string
  isReporting: boolean
}

export default class DisplayAnimal extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      report: "",
      isReporting: false
    }
  }

  onReportTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const report = e.currentTarget.value
    this.setState({ report })
  }

  toggleReport = (isReporting: boolean) => this.setState({ isReporting })

  closeSlide = () => {
    const { toggleSide } = this.props
    this.setState({ report: "", isReporting: false }, () => toggleSide(false))
  }

  submitReport = () => {
    const { animal: { id }, reportAnimal } = this.props
    const { report } = this.state

    reportAnimal(id, report)
  }

  render() {
    const { animal: { type, picture, description } } = this.props
    const { report, isReporting } = this.state
    return (
      <div className="display-animal-container">
        <div className="animal-type">
          <h3>{type}</h3>
        </div>
        <div className="animal-picture">
          {
            picture ?
              <img src={picture} alt='animal' />
              : 
              <img src={noImage} alt='no animal' />
          }
        </div>
        <div className="animal-description">
          <h4>description: </h4>
          <p>{description}</p>
        </div>
        <div className="footer">
          <button className="close" onClick={this.closeSlide}>close</button>
          <button className="report" onClick={() => this.toggleReport(true)}>report</button>
        </div>
        <div className={`report-container ${isReporting ? 'active' : ''}`}>
          <h4 className="title">Your report: </h4>
          <textarea 
            value={report}
            name="report"
            placeholder='Please justify why are you reporting this.(at least 5 words)'
            onChange={this.onReportTextareaChange}
            ></textarea>

            <div className="report-buttons">
              <button className="submit" onClick={this.submitReport}>submit</button>
              <button className="cancel" onClick={() => this.toggleReport(false)}>cancel</button>
            </div>
        </div>
      </div>
    )
  }
}
