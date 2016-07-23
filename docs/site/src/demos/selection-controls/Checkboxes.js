// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import Checkbox from 'material-ui/Checkbox';

const styleSheet = createStyleSheet('Checkboxes', () => {
  return {
    checkbox: {},
  };
});

export default class Checkboxes extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    checkedA: true,
    checkedB: false,
    checkedC: false,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          className={classes.checkbox}
          onChange={(event, checked) => this.setState({ checkedA: checked })}
          aria-label="checkedA"
        />
        <Checkbox
          checked={this.state.checkedB}
          className={classes.checkbox}
          onChange={(event, checked) => this.setState({ checkedB: checked })}
          aria-label="checkedB"
        />
        <Checkbox
          className={classes.checkbox}
          aria-label="checkedC"
        />
      </div>
    );
  }
}

