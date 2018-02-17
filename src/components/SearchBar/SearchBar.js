import React from "react";
import "./SearchBar.css";

let searchOptions = {
  All: "",
  Album: "album",
  Artist: "artist",
  Name: "track"
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      filter: ""
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.changeSearchOptions = this.changeSearchOptions.bind(this);
  }

  searchSpotify() {
    if (!this.state.term) {
      return;
    }
    let x = this.state.term;
    if (this.state.filter) {
      x = `${this.state.filter}:${this.state.term}`;
    }
    console.log(x);
    this.props.onSearch(x);
  }

  handleTermChange(event) {
    let x = event.target.value.replace(" ", "%20");
    this.setState({ term: x });
  }

  renderSearchOptions() {
    const options = Object.keys(searchOptions);
    return options.map(x => {
      return (
        <li key={x}>
          <input
            type="radio"
            name="search"
            value={x}
            defaultChecked={x === "All" ? 1 : 0}
            onChange={this.changeSearchOptions}
          />
          {x}
        </li>
      );
    });
  }

  changeSearchOptions(event) {
    let x = event.target.value;
    x = searchOptions[x];
    this.setState({ filter: x });
  }

  render() {
    return (
      <div className="SearchBar">
        <ul className="SearchList"> {this.renderSearchOptions()} </ul>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <a onClick={this.searchSpotify}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
