import React, { Component, props, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
// import TaggedItems from './TagedItems'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
import logo from './logo.svg';
import './styles.css'
// import Preview from './Preview';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import pako from 'pako';

const initialState = {
  selectedTag: null,
  currentImage: null,
  taggedImages: null,
  tagList: null,
  searchResult: null,
  suggestions: null,
  images: null,
  tags: [],
  isLoading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "selectTag":
      return { selectedTag: action.tag };
    case "selectImage":
      return { selectedImage: action.image };
    case "addData":
      return { ...state, ...action.data };
    default:
      throw new Error();
  }
};

const selectTag = (tag) => ({ type: "selectTag", tag });
const selectImage = (image) => ({ type: "selectImage" }, image);

const TagList = (props) => {
  let tagJsonPath = '/assets/tags/tags.json';
  let imagesJsonPath = '/assets/tags/images.json';
  function getTagListData() {
    let images = null; //JSON.parse(localStorage.getItem('images'));
    let tags = null; //JSON.parse(localStorage.getItem('tags'));
    if (images && tags) {
      return ({
        tagList: tags, searchResult: tags,
        suggestions: tags, images: images, selectedTag: tags[0], tags: [tags[0], tags[1], tags[2]],
        isLoading: false
      })
    } else {
      axios.get(tagJsonPath).then(response => {
        axios.get(imagesJsonPath).then(images => {
          return (
            {
              tagList: response.data, searchResult: response.data,
              suggestions: response.data, taggedImages: images.data,
              selectedTag: response.data[0], tags: [response.data[5], response.data[6], response.data[7]],
              isLoading: false
            })
        });
      })
    }
  };

  const [{
    selectedTag,
    currentImage,
    taggedImages,
    tagList,
    searchResult,
    suggestions,
    images,
    tags,
    isLoading }, dispatch] = useReducer(reducer, initialState);

  let reactTags = React.createRef();

  useEffect(() => {
    let data = getTagListData();
    dispatch({ type: 'addData', data })
  }, []);


  //Function to get the tag Data from json
  function onDelete(i) {
    const tags = tags.slice(0)
    tags.splice(i, 1)
    let matching = [];
    tags.map(tag => {
      tagList.filter(e => { if (e === tag) matching.push(e) });
    });
    let data = { tags, searchResult: matching }
    dispatch({ type: 'modifySearchTags', data });
  }

  function onAddition(tag) {
    const tags = [].concat(tags, tag)
    let matching = [];
    tags.map(tag => {
      tagList.filter(e => { if (e === tag) matching.push(e) });
    });
    // this.setState({ tags, searchResult: matching })
    let data = { tags, searchResult: matching }
    dispatch({ type: 'modifySearchTags', data });
  }


  return ('Hello....');

  if (!tagList || isLoading)
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

  let tagged = images.filter(e => {
    if (e.tags && e.tags.indexOf(selectedTag['@rid']) > -1) return e
  });

  return (
    <div>
      <header className="App-header">
        <div>
          <ReactTags
            ref={reactTags}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDelete.bind(this)}
            onAddition={onAddition.bind(this)}
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
        <List name="Search Result" tags={searchResult} />
        <div className="col-md-8">
          {/* <TaggedItems selectedTag={this.state.selectedTag} /> */}
          {/* <Preview selectedTag={selectedTag} tagged={tagged} /> */}
        </div>
        <List name="All Tags" tags={tagList} />
      </div >
    </div >)
}

const List = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="col-md-2 margin-top-0 parentDiv">
      <Badge><h3>{props.name}</h3></Badge>
      {
        props.tags.length === 0 ? <Card.Title>Please try diffrent words </Card.Title> :
          //bsStyle="info"
          props.tags.filter(e => { if (props.tags.indexOf(e) > -1) return e }).
            map(tag => <Card key={tag['@rid']} className="centeralign">
              <Card.Header>
                <Card.Title>
                  <Button alt="Click for Details" variant="info" block size="lg" onClick={() => {
                    dispatch(selectTag(tag))
                  }}>
                    {tag.name}
                  </Button>
                </Card.Title>
              </Card.Header>
              <Card.Text>
                {/* //TODO:work on parent tags */}
                {/* tag.parentTags === null ? "no parent tags" :
                      ParentTags {tag.parentTags.map(tag => {
                    return (tag === "" ? "" : <div className="badge primary">{tag}</div>);
                  })} <br /> */}
                {/* 
                  tag.childTags === null ? "no child tags" :
                    ChildTags: {tag.childTags.map(tag => {
                    return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
                  })} <br /> */}
              </Card.Text>
            </Card>)
      }
    </div >
  )
}

// const Preview = (props) => {
//   const [state, dispatch] = useReducer(reducer, state);
//   // return (<h3>Please select a Tag</h3>);
//   return (<div id="preview" className="customerdetails">
//     <Card bsStyle="info" className="centeralign">
//       <Card.Header>
//         <center><Badge><h3><b>Preview</b></h3></Badge></center>

//         <Card.Title ><b>Tag Name:</b> <div className="badge primary">{state.selectedTag.name}&nbsp;</div>  <b>Description:</b>{selectedTag.description}</Card.Title>
//         {/* <b>ParentTags:</b> {selectedTag.parenTagstHirearchy.map(tag => {
//         return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
//       })}

//       <b>ChildTags:</b> {selectedTag.childTagsHirearchy.map(tag => {
//         return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
//       })} */}

//         <center>This is preview of images related to this tag</center>

//         {/* <Link to={{ pathname: "/taglist#preview", id: this.props.currentId }} className="btn btn-primary">Preview</Link> */}
//       </Card.Header>

//       <Card.Body>
//         <br />
//         {state.taggedImages.map((img, index) => {
//           return (
//             <Card style={{ width: '50%', float: 'left' }}>
//               {/* <img src={'./images/' + img.path} onError={(e) => {
//               e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..."
//             }} /> */}

//               <Card.Img variant="top" src={"http://drive.google.com/thumbnail?id=" + img.id} />
//               <Card.Body>
//                 <Card.Title>{img.title}</Card.Title>
//                 <Card.Text>{img.description}</Card.Text>
//               </Card.Body>
//             </Card>
//           );
//         })}
//       </Card.Body>
//     </Card>
//   </div >)
// }

