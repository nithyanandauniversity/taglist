import React, { Component } from 'react';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactTags from 'react-tag-autocomplete'
import { HashLink as Link } from 'react-router-hash-link';
import './styles.css'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import pako from 'pako';
import range from 'lodash.range';


export default class PreviewAll extends Component {
  // const [state, dispatch] = useContext(Context);

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/taglist/assets/tags/annadhan.json').then(response => {
      let taggedImages = response.data;
      let selectedTag = {};
      selectedTag.name = 'Anna Daan';
      selectedTag.description = 'Consolidation of all images related to the keywor anna daan';
      console.log(taggedImages);
      this.setState({ taggedImages, selectedTag });
    });
  }

  //? 176 - 200, 372 - 378, 396 - 403, 631 - 730, 741 - 771, 809 - 814, 829 - 834, 983-994, 1007-1012
  //? 107-1083, 1201-1209, 1220-1348,1831-1853,1956-1967, 2000-2048,

  // 2057- 2074
  // ];

  render() {
    let selected = [
      ...range(5, 22),
      ...range(229, 238),
      312, 314, 316, 317,
      ...range(319, 321),
      ...range(324, 327),
      ...range(329, 333), ...range(367, 369), 371,
      392, ...range(525, 545),
      ...range(572, 578),
      ...range(621, 630), ...range(736, 738),
      ...range(781, 784), 799, 800, 804, 806,
      ...range(919, 937), ...range(976, 982), 1002, 1005, 1006,
      ...range(1210, 1217),
      ...range(2051, 2056),
      ...range(2090, 2093), ...range(2183, 2185),
      ...range(2185, 12726),
    ]

    if (this.state.taggedImages == null) return (<h3>Loading</h3>);
    return (<div id="preview" className="customerdetails">
      <Card className="centeralign">
        <Card.Header>
          <center><Badge><h3><b>Preview</b></h3></Badge></center>
          <Card.Title ><b>Tag Name:</b> <div className="badge primary">{this.state.selectedTag.name}&nbsp;</div>  <b>Description:</b>{this.state.selectedTag.description}</Card.Title>
          <center>This is preview of images related to this tag</center>
        </Card.Header>
        <Card.Body>
          <br />
          {this.state.taggedImages.map((img, index) => {

            if (selected.indexOf(index) > -1)
              return (
                <Card key={index} style={{ width: '10%', float: 'left' }}>
                  {/* <img src={'./images/' + img.path} onError={(e) => {
              e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..."
            }} /> */}
                  <Card.Img variant="top" alt={img.description} title={img.description} src={img.url} />
                  <Card.Body>
                    <Card.Text>{img.description.substring(0, 150)}</Card.Text>
                    <a href={img.npediaURL}>src-{index}</a>
                  </Card.Body>
                </Card>
              );
          })}
        </Card.Body>
      </Card>
    </div >)

  }
}