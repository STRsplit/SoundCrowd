import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class AutoCompleteSearch extends Component {
  constructor(props){
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  handleUpdateInput(value) {
    console.log('handle update', value)
    this.props.handleInput(value);
  }


  handleClick(e) {
    console.log('djshfkjhadskjfhdaskjhfkjhadskjfh', e)
  }

  render() {

    let { stats, handleInput, handleSongAdd } = this.props
    let dataSource = stats.dataSource
    const dataSourceConfig = {
      text: 'name',
      value: 'name',
      ref: 'ref',
      onClick: this.handleClick
    };

    return (
        <AutoComplete
          onUpdateInput={(e) => this.handleUpdateInput(e)}
          listStyle={{ maxHeight: 200, overflow: 'auto' }}
          dataSource={dataSource}
          searchText={stats.search}
          fullWidth={true}
          // onNewRequest={(e) => this.handleClick(e)}
          dataSourceConfig={dataSourceConfig}
          filter={AutoComplete.noFilter}
        />
    )
  }
}
export default AutoCompleteSearch;