import React, { Component } from 'react';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactTags from 'react-tag-autocomplete'
import { HashLink as Link } from 'react-router-hash-link';
import './styles.css'
import Card from 'react-bootstrap/Card';

export default class TaggedItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
    this.reactTags = React.createRef();

  }
  getTagListData() {
    //assets/tags/taglist.json
    let tagsData = [];
    axios.get('http://localhost:4000/tags').then(response => {
      axios.get('http://localhost:4000/images').then(images => {
        let currentRid = this.props.selectedTag['@rid'];
        let tagged = images.data.filter(e => {
          if (e.tags && e.tags.indexOf(currentRid) > -1) return e
        });

        let currentImage = tagged[0] ? tagged[0] : [];
        let currentImageTagIds = currentImage.tags ? currentImage.tags : [];
        let currentImageTags = response.data.filter(e => {
          if (currentImageTagIds.indexOf(e['@rid']) > -1) return e
        });

        console.log('inTagList ::::', currentImage, currentImageTagIds, currentImageTags);


        this.setState({
          tagList: response.data, searchResult: response.data,
          suggestions: response.data, tags: currentImageTags, tagged: tagged,
          currentImage: currentImage, images: images.data
        })
      });
    })
  };
  //function which is called the first time the component loads
  componentDidMount() {
    this.getTagListData();
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
    // let selectedTag = this.state.tagList.filter(e => { if (e.id === currentRid) return e })[0];

  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }


  handleInputChange = () => {
    return '';
  }


  loadImageTags = (index, ele) => {
    console.log('this.state.tagged[index]', this.state.tagged[index]);
    let currentImage = this.state.tagged[index];
    // let imageTags = currentImage.tags ? currentImage.tags : [];
    let currentImageTagIds = currentImage.tags ? currentImage.tags : [];
    // console.log('imageTags', imageTags);

    let tags = this.state.suggestions; // all tags
    let currentImageTags = tags.filter(e => {
      if (currentImageTagIds.indexOf(e['@rid']) > -1) return e
    });
    console.log('Slected Image', currentImage, currentImageTagIds, currentImageTags)

    return this.setState({ tags: currentImageTags, currentImage: currentImage });
  }


  render() {
    if (!this.state.tagList || !this.state.images) return (<p>Loading Data</p>);

    let currentRid = this.props.selectedTag['@rid'];
    let selectedTag = this.props.selectedTag;


    let tags = this.state.suggestions;
    let images = this.state.images;

    // let currentRid = selectedTag; //this.props.selectedTag['@rid'];
    let tagged = images.filter(e => {
      if (e.tags && e.tags.indexOf(currentRid) > -1) return e
    });

    let currentImage = tagged[0] ? tagged[0] : [];
    let currentImageTagIds = currentImage.tags ? currentImage.tags : [];
    let currentImageTags = tags.filter(e => {
      if (currentImageTagIds.indexOf(e['@rid']) > -1) return e
    });

    //TODO:similar Tags
    // let similarImageIds = currentImage.in_Similar.delegate.entries ? currentImage.in_Similar.delegate.entries : []; //["#38:0", "#38:1", "#38:2"]
    // let similarImage = images.filter(e => {
    //   // console.log(similarImageIds, e['@rid'], e.name);
    //   if (similarImageIds.indexOf(e['@rid']) > -1) return e
    // });
    // let similarImageTags = this.state.similarImageTags ? this.state.image.similarImageTags :
    //   tags.filter(e => {
    //     if (similarImageIds.indexOf(e['@rid']) > -1) return e
    //   });

    console.log('From renderer selectedTag', selectedTag, currentImage, currentImageTags);
    return (
      <div>
        <div id="editTags">
          <Card className="centeralign">
            <Card.Header>
              <h3><center><b>Edit Tags</b></center></h3>
              <Card.Title><b>Tag Name:</b> <div className="badge primary">{selectedTag.name}&nbsp;</div>  <b>Description:</b>{selectedTag.description}</Card.Title>
              {/* <b>ParentTags:</b> {selectedTag.parentTags.map(tag => {
            return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
          })} */}
              {/* <b>ChildTags:</b> {selectedTag.childTags.map(tag => {
              return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
            })} */}
              <center>This Tag is taggged to below images, each image will have their own tag list, which can be added or removed.</center>
              {/* <Link to={{ pathname: "/taglist#preview", id: currentRid }} className="btn btn-primary">Preview</Link> */}
            </Card.Header>
            <Card.Body>
              <br />
              <Carousel onChange={(index, ele) => this.loadImageTags(index, ele)} dynamicHeight={true}>
                {tagged.map(img => {
                  return (<div key={img['@rid']}>
                    <form style={{ 'textAlign': 'left' }}>
                      <label>Title: </label><input className="form-control" name="title"
                        type="text"
                        value={img.title}
                        onChange={this.handleInputChange} />
                      <label>Description: </label><input className="form-control" name="description"
                        type="text"
                        value={img.description}
                        onChange={this.handleInputChange} />
                    </form>

                    File:{img.name}, Path: {img.path}, Title: {img.title}, Dimension:{img.width}x{img.height}
                    <img src={'./images/' + img.path} onError={(e) => {
                      e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..."
                    }} />
                    <br />

                  </div>);
                })}
              </Carousel>
              <ReactTags
                ref={this.reactTags}
                tags={this.state.tags}
                autoresize={false}
                suggestions={this.state.suggestions}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)}
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
              />
            </Card.Body>
          </Card>
        </div>

      </div >
    )
  }
}


