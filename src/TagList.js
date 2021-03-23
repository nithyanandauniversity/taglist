import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import TaggedItems from './TagedItems'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
import logo from './logo.svg';

export default class TagsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTag: "#1:0",
      tags: [
        { id: 1, name: "Program" },
        { id: 2, name: "Education" },
      ],
    }
    this.reactTags = React.createRef()
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getTagListData();

  }

  //Function to get the tag Data from json
  getTagListData() {
    axios.get('assets/tags/taglist.json').then(response => {
      this.setState({ tagList: response.data })

      this.setState({ suggestions: response.data })
    })
  };

  onDelete(i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }


  render() {
    if (!this.state.tagList)
      return (<p>Loading data</p>)
    return (
      <div>
        <header className="App-header">
          <div><img src={logo} className="App-logo" alt="logo" /><h1>Search and Tag Images</h1></div>

          <ReactTags
            ref={this.reactTags}
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            onDelete={this.onDelete.bind(this)}
            onAddition={this.onAddition.bind(this)}
            autoresize={false}
            placeholderText={"Tag name to search..."}
          />
        </header>

        <div className="row addmargin">
          <div className="col-md-3">
            {
              this.state.tagList.map(tag => <Panel bsStyle="info" key={tag.name} className="centeralign">
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{tag.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <p>
                    ParentTags: {tag.parenTagstHirearchy.map(tag => {
                    return (tag === "" ? "" : tag + '>');
                  })} </p>

                  <p>
                    ChildTags: {tag.childTagsHirearchy.map(tag => {
                    return (tag === "" ? "" : tag + '>');
                  })}
                  </p>

                  <Button bsStyle="info" onClick={() => {
                    console.log('Current:', tag.id);
                    this.setState({ selectedTag: tag.id });
                  }}>

                    Click to View Details

              </Button>

                </Panel.Body>
              </Panel>)
            }
          </div>
          <div className="col-md-6">
            <TaggedItems currentId={this.state.selectedTag} />
          </div>

        </div ></div>)
  }

}
