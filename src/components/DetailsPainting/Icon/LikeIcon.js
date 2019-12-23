import React, { Component } from "react";
import { Link } from "react-router-dom";

import { filledStar, emptyStar } from "../../../lib/config/images";
import { handleLikeAndToggleImageSource } from "../../../lib/config/functions";

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersWhoLiked: this.props.usersWhoLiked,
      handleLikeAndToggleImageSourceBinded: handleLikeAndToggleImageSource.bind(
        this
      )
    };
  }

  render() {
    const { loggedIn, id, userId } = this.props;
    const { usersWhoLiked, handleLikeAndToggleImageSourceBinded } = this.state;
    return (
      <span>
        {!usersWhoLiked ? null : loggedIn ? (
          usersWhoLiked.includes(userId) ? (
            <div>
              <img
                className="details-filledStar"
                onClick={e => handleLikeAndToggleImageSourceBinded(e, userId)}
                src={filledStar}
                alt={id} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
              />
              <span id="likes-qty">{usersWhoLiked.length}</span>
            </div>
          ) : (
            <div>
              <img
                onClick={e => handleLikeAndToggleImageSourceBinded(e, userId)}
                className="details-emptyStar"
                src={emptyStar}
                alt={id} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
              />
              <span id="likes-qty">{usersWhoLiked.length}</span>
            </div>
          )
        ) : !usersWhoLiked ? null : (
          <div>
            <Link to="/login">
              <img src={emptyStar} alt="" />
            </Link>
            <span>{usersWhoLiked.length}</span>
          </div>
        )}
      </span>
    );
  }
}
