import React, {Component} from 'react';
import {SEARCHHISTORY, CLEARALL} from '../Constants';

export class SearchAction extends Component {
  static SearchHistory(data) {
    return {type: SEARCHHISTORY, payload: data};
  }
  static ClearSearchHistory() {
    return {type: CLEARALL};
  }
}

export default SearchAction;
