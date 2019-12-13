import React, { Component } from "react";

import Navbar from "../components/Navbar/Navbar";
import EditDiv from "../components/EditPainting/EditForm";
import PaintingDetails from "../components/DetailsPainting/DetailsPainting";
import paintingService from "../lib/services/painting-service";
import { withAuth } from "../lib/AuthProvider";


class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {
        paintingDetails: null,
        newPainting: null
    };
  }


  componentDidMount=async()=>{
      const { paintingId } = this.props.match.params 
      const imgData = await paintingService.getDetails(paintingId);
      this.setState({ paintingDetails: imgData, newPainting: imgData });
  }

  handleChange = (event)=>{
      const { name, value } = event.target
      const newPaintingCopy = {...this.state.newPainting}
      newPaintingCopy[name]=value
    this.setState({ newPainting: newPaintingCopy });
    console.log(this.state.newPainting)
  }

  handleSubmit = async (e)=>{
      e.preventDefault();
      const updatedPainting = await paintingService.updatePaintingByPut(this.state.newPainting)
      if(updatedPainting.title){
          this.props.history.push(`/painting/${this.props.match.params.paintingId}`)
      }
}

  render() {
    return (
      <div>
        <Navbar  {...this.props}/>
        <EditDiv painting={this.state.newPainting} 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default withAuth(Painting);
