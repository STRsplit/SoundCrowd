import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import style from '../styles/additionalStyles-css.js';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class AutoCompleteSearch extends Component {
  constructor(props){
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  };

  handleUpdateInput(value) {
    this.props.handleInput(value);
  }


  // handleClick(e) {
  //  
  // }

  render() {

    let { stats, handleInput, handleSongAdd } = this.props
    let dataSource = stats.dataSource
    const dataSourceConfig = {
      text: 'name',
      value: 'name'
    };

    return (
        <AutoComplete
          underlineFocusStyle={style.focusTextField}
          onUpdateInput={(e) => this.handleUpdateInput(e)}
          listStyle={{ maxHeight: 200, overflow: 'auto' }}
          dataSource={dataSource}
          searchText={stats.search}
          fullWidth={true}
          dataSourceConfig={dataSourceConfig}
          filter={AutoComplete.noFilter}
        />
    )
  }
}
export default AutoCompleteSearch;