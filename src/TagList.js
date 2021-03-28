import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import TaggedItems from './TagedItems'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
import logo from './logo.svg';
import './styles.css'
import Output from './Output';
import Card from 'react-bootstrap/Card';

export default class TagsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      searchResult: []
    }
    this.reactTags = React.createRef()
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getTagListData();

  }

  //Function to get the tag Data from json
  getTagListData() {
    //assets/tags/taglist.json
    let tagsData = [];
    axios.get('http://localhost:4000/tags').then(response => {
      axios.get('http://localhost:4000/images').then(images => {
        this.setState({
          tagList: response.data, searchResult: response.data,
          suggestions: response.data, images: images.data, selectedTag: response.data[0], tags: [response.data[0], response.data[1], response.data[2]]
        })
      });

    })
  };

  onDelete(i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    let matching = [];
    tags.map(tag => {
      this.state.tagList.filter(e => { if (e === tag) matching.push(e) });
    });
    this.setState({ tags, searchResult: matching })
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag)
    let matching = [];
    tags.map(tag => {
      this.state.tagList.filter(e => { if (e === tag) matching.push(e) });
    });
    this.setState({ tags, searchResult: matching })
  }


  render() {
    if (!this.state.tagList)
      return (<p>Loading data</p>)
    return (
      <div>
        <header className="App-header">
          <div><h1>Search and Tag Images</h1>
            <ReactTags
              ref={this.reactTags}
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              onDelete={this.onDelete.bind(this)}
              onAddition={this.onAddition.bind(this)}
              autoresize={false}
              placeholderText={"Tag name to search..."}
              minQueryLength={1}
              classNames={{
                root: 'react-tags',
                rootFocused: 'is-focused',
                selected: 'react-tags__selected',
                selectedTag: 'react-tags__selected-tag',
                selectedTagName: 'react-tags__selected-tag-name',
                search: 'react-tags__search',
                searchWrapper: 'react-tags__search-wrapper',
                searchInput: 'react-tags__search-input',
                suggestions: 'react-tags__suggestions',
                suggestionActive: 'is-active',
                suggestionDisabled: 'is-disabled'
              }}
            /></div>
        </header>

        <div className="row addmargin">
          <div className="col-md-2 margin-top-0">
            <h3>Serach Results</h3>
            {
              this.state.searchResult.length === 0 ? "no tags to show" :
                //bsStyle="info"
                this.state.searchResult.filter(e => { if (this.state.tags.indexOf(e) > -1) return e }).
                  map(tag => <Card key={tag['@rid']} className="centeralign">
                    <Card.Header>
                      <Card.Title>{tag.name}</Card.Title>
                    </Card.Header>
                    <Card.Text>
                      {/* tag.parentTags === null ? "no parent tags" :
                      ParentTags {tag.parentTags.map(tag => {
                    return (tag === "" ? "" : <div className="badge primary">{tag}</div>);
                  })} <br /> */}
                      {/* 
                  tag.childTags === null ? "no child tags" :
                    ChildTags: {tag.childTags.map(tag => {
                    return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
                  })} <br /> */}


                      <Button onClick={() => {
                        console.log('Current:', tag['@rid']);
                        this.setState({ selectedTag: tag });
                      }}>
                        Click to View Details
              </Button>

                    </Card.Text>
                  </Card>)
            }
          </div>

          <div className="col-md-8">
            <TaggedItems selectedTag={this.state.selectedTag} />
            {/* <Output selectedTag={this.state.selectedTag} /> */}
          </div>
          <div className="col-md-2">
            <h3>All Tags</h3>
            {
              //bsStyle="info"
              this.state.tagList.map(tag => <Card key={tag['@rid']} className="centeralign">
                <Card.Header>
                  <Card.Title>{tag.name}</Card.Title>
                </Card.Header>
                <Card.Text>
                  {/* ParentTags: {tag.parenTagstHirearchy.map(tag => {
                  return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
                })}<br />
                    ChildTags: {tag.childTagsHirearchy.map(tag => {
                  return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
                })}<br /> */}
                  <Button onClick={() => {
                    console.log('CurrentTag:', tag['@rid']);
                    this.setState({ selectedTag: tag });
                  }}>
                    Click to View Details
              </Button>

                </Card.Text>
              </Card>)
            }
          </div>
        </div ></div >)
  }

}
