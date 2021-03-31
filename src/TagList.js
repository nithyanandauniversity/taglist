import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import TaggedItems from './TagedItems'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
import logo from './logo.svg';
import './styles.css'
import Preview from './Preview';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';



export default class TagsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [],
      searchResult: [],
      isLoading: true,
      showPreview: false
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
    axios.get('assets/tags/tags.json').then(response => {
      axios.get('assets/tags/images.json').then(images => {
        this.setState({
          tagList: response.data, searchResult: response.data,
          suggestions: response.data, images: images.data, selectedTag: response.data[5], tags: [response.data[5], response.data[6], response.data[7],],
          isLoading: false
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
    if (!this.state.tagList || this.state.isLoading)
      return (
        <>
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>{' '}
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
        Loading...
      </Button>
        </>);
    return (
      <div>
        <header className="App-header">
          <div>
            <ReactTags
              ref={this.reactTags}
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              onDelete={this.onDelete.bind(this)}
              onAddition={this.onAddition.bind(this)}
              autoresize={false}
              placeholderText={"« searchTags"}
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
          <div className="col-md-2 margin-top-0 parentDiv">
            <Badge><h3>Serach Results</h3></Badge>
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


                      <Button variant="info" block size="lg" onClick={() => {
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
            <Button variant="primary" block size="lg" onClick={() => {
              this.setState({ showPreview: !this.state.showPreview });

            }}>
              {this.state.showPreview ? "Hide Preview" : "Show Preview"}

            </Button>
            <Preview selectedTag={this.state.selectedTag} showPreview={this.state.showPreview} />
          </div>
          <div className="col-md-2 parentDiv">
            <Badge><h3>All Tags</h3></Badge>
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
                  <Button variant="info" block size="lg" onClick={() => {
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
