import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, props, useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ReactTags from 'react-tag-autocomplete'
import './styles.css'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Store, { Context } from './Store';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useState } from 'react';
import PreviewAll from './PreviewAll'
import PreviewSelected from './PreviewSelected'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: "/"
    }
  }

  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (
      <Store>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Switch>
              {<Route exact path="/" render={() => (<Redirect to="/output" />)} />}
              {/* <Route exact path='/taglist' component={TagList} /> */}
              <Route exact path='/outputall' component={PreviewAll} />
              <Route exact path='/output' component={PreviewSelected} />
            </Switch>
          </div>
        </Router>
      </Store>
    );
  }
}

const selectTag = (data) => ({ type: 'selectTag', data });
const setLoading = (data) => ({ type: 'isLoading', data });
// const selectImage = (data) => ({ type: 'selectImage' }, data);
// const addData = (data) => ({ type: 'addData' }, data);
// const modifySearchTags = (data) => ({ type: 'modifySearchTags', data });
// const modifyImageTags = (data) => ({ type: 'modifyImageTags', data });
// const modifyTitle = (data) => ({ type: 'modifyTitle', data });
// const modifyDescription = (data) => ({ type: 'modifyDescription', data });

const allTagsURL = 'http://localhost:4000/tags/';
const taggedImagesURL = 'http://localhost:4000/tagged/';

const TagList = (props) => {
  const [{ tags, tagList, isLoading, selectedTag, suggestions, searchResult }, dispatch] = useContext(Context);

  let reactTags = React.createRef();

  useEffect(() => {
    // dispatch(setLoading({ value: true }));
    axios.get(allTagsURL).then(response => {
      // let firstId = response.data[4]['@rid'].replace('#', '');
      // let taggedImages;
      // axios.get(taggedImagesURL + firstId).then(images => {
      // taggedImages = images.data;
      // let taggedImages = images.data.filter(e => {
      //   if (e.tags && e.tags.indexOf(response.data[10]['@rid']) > -1) return e
      // });

      // let selectedImageTagIDs = taggedImages[0].tags;
      // let imageTags = response.data.filter(t => {
      //   if (selectedImageTagIDs.indexOf(t['@rid']) > -1) return t
      // });

      let data = {};
      data.tagList = response.data;
      data.searchResult = response.data;
      data.suggestions = response.data;
      // data.taggedImages = taggedImages;

      data.selectedTag = response.data.filter(tag => { if (tag['@rid'] == '#25:57') return tag })[0];//response.data[4];
      data.tags = [response.data[5], response.data[6], response.data[7]];
      // data.selectedImageTags = imageTags;
      data.isLoading = false;
      dispatch({ type: 'addData', data });
      // dispatch(setLoading({ value: false }));

      // });
    })
  }, []);

  //gdriv, npedi, nithyanand.org

  //Function to get the tag Data from json
  function onDelete(i) {
    const updatedTags = tags.slice(0)
    updatedTags.splice(i, 1)
    let matching = [];
    updatedTags.map(tag => {
      tagList.filter(e => { if (e === tag) matching.push(e) });
    });
    let data = { tags: updatedTags, searchResult: matching }
    dispatch({ type: 'modifySearchTags', data });
  }

  function onAddition(tag) {
    const updatedTags = [].concat(tags, tag);
    let matching = [];
    updatedTags.map(tag => {
      tagList.filter(e => { if (e === tag) matching.push(e) });
    });
    // this.setState({ tags, searchResult: matching })
    let data = { tags: updatedTags, searchResult: matching }
    dispatch({ type: 'modifySearchTags', data });
  }

  if (!tagList)
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

  // let tagged = images.filter(e => {
  //   if (e.tags && e.tags.indexOf(selectedTag['@rid']) > -1) return e
  // });
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
          <TaggedItems />
          <Preview />
        </div>
        <List name="All Tags" tags={tagList} />
      </div >
    </div >)
}

const List = (props) => {
  const [state, dispatch] = useContext(Context);
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
                    // dispatch(setLoading({ value: true }));
                    dispatch(selectTag(tag));
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

const Preview = (props) => {
  const [state, dispatch] = useContext(Context);
  if (state.taggedImages == null) return (<h3>Please select a Tag</h3>);
  return (<div id="preview" className="customerdetails">
    <Card bsStyle="info" className="centeralign">
      <Card.Header>
        <center><Badge><h3><b>Preview</b></h3></Badge></center>
        <Card.Title ><b>Tag Name:</b> <div className="badge primary">{state.selectedTag.name}&nbsp;</div>  <b>Description:</b>{state.selectedTag.description}</Card.Title>
        {/* <b>ParentTags:</b> {selectedTag.parenTagstHirearchy.map(tag => {
        return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
      })}
      <b>ChildTags:</b> {selectedTag.childTagsHirearchy.map(tag => {
        return (tag === "" ? "" : <div className="badge primary">{tag}&nbsp;</div>);
      })} */}
        <center>This is preview of images related to this tag</center>
        {/* <Link to={{ pathname: "/taglist#preview", id: this.props.currentId }} className="btn btn-primary">Preview</Link> */}
      </Card.Header>
      <Card.Body>
        <br />
        {state.taggedImages.map((img, index) => {
          return (
            <Card style={{ width: '50%', float: 'left' }}>
              {/* <img src={'./images/' + img.path} onError={(e) => {
              e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..."
            }} /> */}
              <Card.Img variant="top" src={"http://drive.google.com/thumbnail?id=" + img.id} />
              <Card.Body>
                <Card.Title>{img.title}</Card.Title>
                <Card.Text>{img.description}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Card.Body>
    </Card>
  </div >)
}

const TaggedItems = (props) => {
  const [state, dispatch] = useContext(Context);
  let reactTags = React.createRef();
  let isTaggedImageLoading = true;

  let title = state.title;
  let description = state.description;
  let selectedTag = state.selectedTag;
  let suggestions = state.suggestions;
  let tagged = null;
  let selectedImageTags = state.selectedImageTags;


  useEffect(() => {
    let id = state.selectedTag['@rid'].toString().replace('#', '');
    console.log('taggedimages getting tag for Tag id', id, state.selectedTag);
    axios.get('http://localhost:4000/tagged/' + id).then(taggedImages => {
      tagged = taggedImages.data;
      console.log('taggedImages data  :', tagged)
      let data = { taggedImages: taggedImages.data };
      dispatch({ type: 'addData', data });
    });
  }, [selectedTag]);

  // function useForceUpdate() {
  //   const [value, setValue] = useState(0); // integer state
  //   return () => setValue(value => value + 1); // update the state to force render
  // }

  console.log('tagged', tagged);
  // need to Reload the componet after Ajax call, that is not happening

  if (tagged == null) {
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
  }

  console.log('from taggedItems...', tagged);

  //Function to get the tag Data from json
  function onDelete(i) {
    const updatedTags = selectedImageTags.slice(0)
    updatedTags.splice(i, 1)
    let data = { selectedImageTags: updatedTags }
    dispatch({ type: 'modifyImageTags', data });
  }

  function onAddition(tag) {
    const updatedTags = [].concat(selectedImageTags, tag);
    let data = { selectedImageTags: updatedTags, }
    dispatch({ type: 'modifyImageTags', data });
  }

  function handleDescrptionChange(e) {
    let desc = e.target.value;
    dispatch({ type: 'modifyDescription', desc });
  }

  function handleTitleChange(e) {
    let title = e.target.value;
    dispatch({ type: 'modifyTitle', title })
  }

  function loadImageTags(index, ele) {
    let currentImage = tagged[index];
    let currentImageTagIds = currentImage.tags ? currentImage.tags : [];
    let currentImageTags = suggestions.filter(e => {
      if (currentImageTagIds.indexOf(e['@rid']) > -1) return e
    });
    console.log('Selected Image, tag Ids, tags', currentImage, currentImageTagIds, currentImageTags)
    dispatch("imageSelected", currentImage);
  }

  return (
    <div>
      <div id="editTags">
        <Card className="centeralign">
          <Card.Header>
            <center><Badge><h3><b>Edit Tags</b></h3></Badge></center>
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
            <ReactTags
              ref={reactTags}
              tags={selectedImageTags}
              autoresize={false}
              suggestions={suggestions}
              onDelete={onDelete.bind(this)}
              onAddition={onAddition.bind(this)}
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
        {console.log('Render in progress..')}
        <Carousel onChange={(index, ele) => loadImageTags(index, ele)} dynamicHeight={true} showIndicators={false}	>
          {tagged.map(img => {
            console.log('render in progress..')
            return (<div key={img['@rid']}>
              <form style={{ 'textAlign': 'left' }}>
                <label>Title: </label><input className="form-control" name="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange} />
                <label>Description: </label><input className="form-control" name="description"
                  type="text"
                  value={state.description}
                  onChange={handleDescrptionChange} />
              </form>
                    File:{img.name}, Path: {img.path}, Title: {img.title}, Dimension:{img.width}x{img.height}
              <img src={"http://drive.google.com/thumbnail?id=" + img.id} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..." }} />
              <br />
            </div>);
          })}
        </Carousel>

      </div>
    </div>
  )
}


const PreviewJSON1 = (props) => {
  // const [state, dispatch] = useContext(Context);

  let taggedImages;
  let selectedTag = {};
  const [images, setImages] = useState(0);
  useEffect(() => {
    axios.get('/assets/tags/annadhan.json').then(response => {
      taggedImages = response.data;
      selectedTag.name = 'Anna Daan';
      selectedTag.description = 'Consolidation of all images related to the keywor anna daan';
      console.log(taggedImages);
      setImages(1);
    });
  }, [taggedImages]);

  if (taggedImages == null) return (<h3>Please select a Tag</h3>);
  return (<div id="preview" className="customerdetails">
    <Card bsStyle="info" className="centeralign">
      <Card.Header>
        <center><Badge><h3><b>Preview</b></h3></Badge></center>
        <Card.Title ><b>Tag Name:</b> <div className="badge primary">{selectedTag.name}&nbsp;</div>  <b>Description:</b>{selectedTag.description}</Card.Title>
        <center>This is preview of images related to this tag</center>
      </Card.Header>
      <Card.Body>
        <br />
        {taggedImages.map((img, index) => {
          return (
            <Card style={{ width: '10%', float: 'left' }}>
              {/* <img src={'./images/' + img.path} onError={(e) => {
              e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..."
            }} /> */}
              <Card.Img variant="top" src={img.url} />
              <Card.Body>
                <Card.Title>{img.title}</Card.Title>
                <Card.Text>{img.description}</Card.Text>
                <a href={img.npediaURL}>src</a>
              </Card.Body>
            </Card>
          );
        })}
      </Card.Body>
    </Card>
  </div >)

}
export default App;