import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactTags from 'react-tag-autocomplete'
import { Left } from 'react-bootstrap/lib/Media';


//This Component is a child Component of Customers Component
export default class TaggedItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [
        { id: 1, name: "Program-French" },
        { id: 2, name: "ArSP" },
      ],

    }
  }

  getTagListData() {
    axios.get('assets/tags/taglist.json').then(response => {
      this.setState({ tagList: response.data })
      this.setState({ suggestions: response.data })
    })
  };

  //function which is called the first time the component loads
  componentDidMount() {
    this.getTagListData();
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getTagDetails(this.props.val)
    }
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  //Function to Load the customerdetails data from json.
  // getTagDetails(id) {
  //   axios.get('assets/tags/tag' + id + '.json').then(response => {
  //     this.setState({ customerDetails: response })
  //   })
  // };

  handleInputChange = (img) => {

  }
  render() {
    if (!this.state.tagList) return (<p>Loading Data</p>);
    let selectedTag = this.state.tagList.filter(e => { if (e.id === this.props.currentId) return e })[0];
    console.log('selected Tag', selectedTag, this.props.currentId);
    return (<div className="customerdetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3"><p><b>Tag Name:</b> {selectedTag.name} ,  <b>Description:</b> {selectedTag.description}</p></Panel.Title>
          <br />

          <p>
            <b>ParentTags:</b> {selectedTag.parenTagstHirearchy.map(tag => {
              return (tag === "" ? "" : tag + '>');
            })} </p>

          <p>
            <b>ChildTags:</b> {selectedTag.childTagsHirearchy.map(tag => {
              return (tag === "" ? "" : tag + '>');
            })}
          </p>
          <br />
          "{selectedTag.name}" Tag is taggged to below images, each image will have their own tag list, which can be added or removed.
        </Panel.Heading>
        <Panel.Body>
          <ReactTags
            ref={this.reactTags}
            tags={this.state.tags}
            autoresize={false}
            suggestions={this.state.suggestions}
            onDelete={this.onDelete.bind(this)}
            onAddition={this.onAddition.bind(this)}
            classNames={{ root: 'react-tags' }}
          />
          <br />
          <Carousel>
            {selectedTag.tagged.map(img => {
              return (<div><img src={'/images/' + img.src} /><p><b> File:{img.src},&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{img.title}</b></p>
                <form style={{ 'textAlign': 'left' }}>
                  <label>
                    Title: </label>
                  <input name="title"
                    type="text"
                    value={img.title}
                    onChange={this.handleInputChange} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>
                    Description: </label>
                  <input name="description"
                    type="text"
                    value={img.description}
                    onChange={this.handleInputChange} />

                </form>
              </div>);
            })}
          </Carousel>


        </Panel.Body>
      </Panel>
    </div >)
  }
}