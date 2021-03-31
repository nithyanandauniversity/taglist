import React, { Image, Component } from 'react';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactTags from 'react-tag-autocomplete'
import { HashLink as Link } from 'react-router-hash-link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './styles.css'
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';

//This Component is a child Component of Customers Component
export default class Preview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  getTagListData() {
    //assets/tags/taglist.json
    let tagsData = [];
    axios.get('/assets/tags/tags.json').then(response => {
      axios.get('/assets/tags/images.json').then(images => {
        console.log('res', response.data, images.data);
        this.setState({
          tagList: response.data, searchResult: response.data,
          suggestions: response.data, images: images.data, isLoading: false
        })
      });

    })
  }

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

    if (!this.props.showPreview) return (<div></div>);
    if (this.state.isLoading == true) {
      return (<>
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
    let currentRid = this.props.selectedTag['@rid'];
    let images = this.state.images;

    if (!this.state.tagList) return (<p>Loading Data</p>);
    let selectedTag = this.props.selectedTag;

    let tagged = images.filter(e => {
      if (e.tags && e.tags.indexOf(currentRid) > -1) return e
    });

    return (<div id="preview" className="customerdetails">
      <Card bsStyle="info" className="centeralign">
        <Card.Header>
          <center><Badge><h3><b>Preview</b></h3></Badge></center>
          <Card.Title ><b>Tag Name:</b> <div className="badge primary">{selectedTag.name}&nbsp;</div>  <b>Description:</b>{selectedTag.description}</Card.Title>
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
          {tagged.map((img, index) => {
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
}