import React, { Component } from "react"
import Nav from "../components/Nav"
import DataTable from "../components/DataTable"
import API from "../utils/API"
import "../styles/DataArea.css"


export default class DataArea extends Component {
  state = {
    users: [{}],
    order: "descend",
    input: "",
    filteredUsers: [{}]
  }

  headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]

  handleSort = heading => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend"
      })
    } else {
      this.setState({
        order: "descend"
      })
    }

    const compareFnc = (a, b) => {
      if (this.state.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // else statement to handle if this.state.order === descend
      }

    }
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    this.setState({ filteredUsers: sortedUsers });
  }

  // Function to push value of input to state to be able to use for search query

  handleSearchChange = event => {
    let value = event.target.value
    this.setState({ input: value})
  }

  // Function to query search and get back assosicated user to push to state for filteredUsers

  handleSearchSubmit= event => {
    event.preventDefault()
    const filter = this.state.input
    const filteredList = this.state.users.filter(item => 
        (item.name.first + " " + item.name.last === filter)
      )

    if (filteredList.length===0) {
      alert("No results found. Please enter full name and try again")
      setTimeout (function () {window.location.reload(false)}, 1000);
    }  
    
    this.setState({ filteredUsers: filteredList });
  }

  componentDidMount() {
    API.getUsers().then(response => {
      this.setState({users: response.data.results, filteredUsers: response.data.results})

    });
  }

  render() {
      return (
        <>
          <Nav input={this.state.input} handleSearchSubmit={this.handleSearchSubmit} handleSearchChange={this.handleSearchChange} />
          <div className="data-area">
            <DataTable headings={this.headings} handleSort={this.handleSort} users={this.state.filteredUsers}
            // we will need to pass in props for headings, users, and handlesort here to DataTable
            />
          </div>
        </>
      );
  }
}