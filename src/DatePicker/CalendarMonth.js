import React from 'react';
import {isBetweenDates, isEqualDate, getWeekArray} from './dateUtils';
import DayButton from './DayButton';
import ClearFix from '../internal/ClearFix';

class CalendarMonth extends React.Component {
  static propTypes = {
    autoOk: React.PropTypes.bool,
    displayDate: React.PropTypes.object.isRequired,
    firstDayOfWeek: React.PropTypes.number,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    shouldDisableDate: React.PropTypes.func,
  };

  isSelectedDateDisabled() {
    return this._selectedDateDisabled;
  }

  _getWeekElements() {
    const weekArray = getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

    return weekArray.map((week, i) => {
      return (
        <ClearFix key={i}>
          {this._getDayElements(week, i)}
        </ClearFix>
      );
    }, this);
  }

  _getDayElements(week, i) {
    return week.map((day, j) => {
      const isSameDate = isEqualDate(this.props.selectedDate, day);
      const disabled = this._shouldDisableDate(day);
      const selected = !disabled && isSameDate;

      if (isSameDate) {
        if (disabled) {
          this._selectedDateDisabled = true;
        } else {
          this._selectedDateDisabled = false;
        }
      }

      return (
        <DayButton
          key={`db${(i + j)}`}
          date={day}
          onTouchTap={this.handleTouchTap}
          selected={selected}
          disabled={disabled}
        />
      );
    }, this);
  }

  handleTouchTap = (event, date) => {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(event, date);
  };

  _shouldDisableDate(day) {
    if (day === null) return false;
    let disabled = !isBetweenDates(day, this.props.minDate, this.props.maxDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

    return disabled;
  }

  render() {
    const styles = {
      lineHeight: '32px',
      textAlign: 'center',
      padding: '16px 14px 0 14px',
    };

    return (
      <div style={styles}>
        {this._getWeekElements()}
      </div>
    );
  }
}

export default CalendarMonth;
