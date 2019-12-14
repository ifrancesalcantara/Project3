import React, { Component } from "react";
import "./ExploreBar.css";

export default class ExploreBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getFilteredPaintings = () => {
    const searchbar = document.querySelector(".explore-searchbar");
    this.props.getFilteredPaintings(`?title=${searchbar.value}`);
  };

  getSortedPaintings = () => {
    const e = document.querySelector(".explore-select");
    const value = e.options[e.selectedIndex].value;
    let queryStr;
    if (value === "Most liked") {
      queryStr = "?sort=most-liked";
    } else if (value === "Most seen") {
      queryStr = "?sort=most-seen";
    } else if (value === "Date (first: new)") {
      queryStr = "?sort=newest";
    } else if (value === "Date (first: old)") {
      queryStr = "?sort=oldest";
    }
    this.props.history.push(queryStr);
    setTimeout(() => this.props.getFilteredPaintings(), 50);
  };

  render() {
    return (
      <div className="exploreBar">
        <div>
          <span>Sort by:</span>
          <select
            name=""
            id=""
            className="explore-select"
            onClick={this.getSortedPaintings}
          >
            <option>Most popular</option>
            <option>Most seen</option>
            <option>Trending</option>
            <option>Date (first: new)</option>
            <option>Date (first: old)</option>
          </select>
        </div>
        <div>
          <input className="explore-searchbar" type="text" />
          <img
            onClick={this.getFilteredPaintings}
            src="https://img.icons8.com/ios-glyphs/60/000000/search.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}