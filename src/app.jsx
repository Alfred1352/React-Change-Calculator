import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      changeDue: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
    };
    this.handleChangeDue = this.handleChangeDue.bind(this);
    this.handleChangeReceived = this.handleChangeReceived.bind(this);
    this.handleCalculation = this.handleCalculation.bind(this);
  }

  handleChangeDue(e) {
    this.setState({
      amountDue: e.target.value
    });
  }

  handleChangeReceived(e) {
    this.setState({
      amountReceived: e.target.value
    })
  }

  handleCalculation(e) {
    const { amountDue, amountReceived } = this.state;
    let change = amountReceived - amountDue;
    const originalChange = change;
    const denominations = [20, 10, 5, 1];
    const centsDenominations = [25, 10, 5, 1];

    const results = denominations.reduce((acc, denomination) => {
      const count = Math.floor(change / denomination);
      change %= denomination;
      acc.push(count || 0)
      return acc;
    }, []);

    console.log('Twenties:', results[0]);

    let cents = Math.round(change * 100);
    const centsResults = centsDenominations.reduce((acc, denomination) => {
      const count = Math.floor(cents / denomination);
      cents %= denomination;
      acc.push(count);
      return acc;
    }, []);

    change = originalChange;

    this.setState({
      twenties: results[0] || 0,
      tens: results[1] || 0,
      fives: results[2] || 0,
      ones: results[3] || 0,
      quarters: centsResults[0] || 0,
      dimes: centsResults[1] || 0,
      nickels: centsResults[2] || 0,
      pennies: centsResults[3] || 0,
      changeDue: `The total change due is $${change.toFixed(2)}`
    });  
  }

  render() {
    return (
      <div className='container'>
        <h1>Change Calculator</h1>
        <p>Enter the amount due and the amount received to calculate the change.</p>
        <hr />
        <div className='row'>
          <div className='col-sm-4'>
            <div className='panel panel-default'>
              <div className='panel panel-heading panel-title'>Enter Information</div>
              <div className='panel-body'>
                <strong>How much is due?</strong>
                <br />
                <input
                  type='number'
                  name='amountDue'
                  placeholder='$0.00 USD'
                  onChange={this.handleChangeDue}
                  value={this.state.amountDue} />
              </div>
              <div className='panel-body'>
                <strong>How much was received?</strong>
                <br />
                <input
                  type='number'
                  name='amountReceived'
                  placeholder='$0.00 USD'
                  onChange={this.handleChangeReceived}
                  value={this.state.amountReceived} />
              </div>
              <div className='panel panel-default'>
                <div className='panel panel-footer'>
                  <button type='button'
                    className='btn btn-primary'
                    onClick={this.handleCalculation}>Calculate</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='alert'>
              <div className='alert alert-success'>{this.state.changeDue}</div>
                <div className='container change-column'>
                  <div className='row'>
                    <div className='col-sm-3'>Twenties <br /><span className='change'>{this.state.twenties}</span></div>
                    <div className='col-sm-3'> Tens  <br /><span className='change'>{this.state.tens}</span></div>
                    <div className='col-sm-3'> Fives  <br /><span className='change'>{this.state.fives}</span></div>
                    <div className='col-sm-3'> Ones  <br /><span className='change'>{this.state.ones}</span></div>
                  </div>
                  <div className='row bottom'>
                    <div className='col-sm-3'> Quarters  <br /><span className='change'>{this.state.quarters}</span></div>
                    <div className='col-sm-3'> Dimes  <br /><span className='change'>{this.state.dimes}</span></div>
                    <div className='col-sm-3'> Nickels  <br /><span className='change'>{this.state.nickels}</span></div>
                    <div className='col-sm-3'> Pennies  <br /><span className='change'>{this.state.pennies}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
