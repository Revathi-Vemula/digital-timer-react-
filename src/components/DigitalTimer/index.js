import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    console.log(`${minutes}:${seconds}`)
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimerForEachSecond = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerForEachSecond, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
    })
  }

  onDecrementTimerInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimerInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const timerStatusImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const timerState = isTimerRunning ? 'Pause' : 'Start'
    const playPauseIconAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="play-pause-container">
        <button
          type="button"
          className="btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={timerStatusImgUrl}
            alt={playPauseIconAltText}
            className="play-pause-img"
          />
          <p className="control-name">{timerState}</p>
        </button>
        <button type="button" className="btn" onClick={this.onResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="play-pause-img"
          />
          <p className="control-name">Reset</p>
        </button>
      </div>
    )
  }

  renderTimerLimitControllers = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0
    return (
      <div className="timer-increase-decrease-container">
        <button
          type="button"
          className="increment-decrement-btn"
          disabled={isButtonsDisabled}
          onClick={this.onDecrementTimerInMinutes}
        >
          -
        </button>
        <p className="timer-limit">{timerLimitInMinutes}</p>
        <button
          type="button"
          className="increment-decrement-btn"
          disabled={isButtonsDisabled}
          onClick={this.onIncrementTimerInMinutes}
        >
          +
        </button>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state

    return (
      <div className="background-timer-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="elapsed-bg-container">
            <div className="timer-bg">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-controls-container">
            {this.renderTimerController()}
            <p className="instruction">set timer limit</p>
            {this.renderTimerLimitControllers()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
