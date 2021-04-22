import React, { Component } from 'react';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactTags from 'react-tag-autocomplete'
import './styles.css'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import range from 'lodash.range';
import EdiText from 'react-editext'

export default class PreviewAll extends Component {
  // const [state, dispatch] = useContext(Context);
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let domain = 'http://taglist-mirror.herokuapp.com';
    // domain = 'http://localhost:4000'
    axios.get(domain + 'taglist/assets/tags/annadhan-updated.json').then(response => {
      let taggedImages = response.data;
      let selectedTag = {};
      selectedTag.name = 'Anna Daan';
      selectedTag.description = 'Consolidation of all images related to the keywor anna daan';
      console.log(taggedImages);
      this.setState({ taggedImages, selectedTag });
    });
  }


  // 2057- 2074
  // ];

  render() {

    // const [value, setValue] = useState('');

    const handleSave = (val, index) => {
    }

    // enormity, swamy serving... al type of ppl, 
    // number of meals...
    // acroos regions...
    // 3..4, accros timeli

    //1) large cro,, accros time, location, typee, 3/4


    // let selected = [...range(0, 5000)];
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
      ...range(2090, 2093),
      ...range(2183, 2185),
      ...range(2231, 2239),
      ...range(2292, 2293),
      2421,
      ...range(2922, 2947),
      ...range(2992, 2995),
      ...range(3001, 3007),
      ...range(3139, 3164),
      ...range(3186, 3199),
      3355, 3356, ...range(3411, 3413),
      3533, ...range(3707, 3726),
      ...range(3809, 3812),
      ...range(3919, 3920), ...range(3959, 3966), ...range(3970, 3971), ...range(3981, 3984), 3993, 3944,
      ...range(3999, 4005),

      ...range(3186, 12726)
    ]


    //? 2629-2784
    //


    //96-98, 392-395, 418-426, 752-755,761,1549-1551


    if (this.state.taggedImages == null) return (<h3>Loading</h3>);
    let count = 0;
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
                  <Card.Img variant="top" alt={img.description} title={img.description.substring(0, 50)} src={img.url} />
                  <Card.Body>
                    <Card.Text>{img.description.substring(0, 50)}</Card.Text>
                    <a href={img.npediaURL}>src-{index},{++count}</a>
                  </Card.Body>
                </Card>
              );
          })}
        </Card.Body>
      </Card>
    </div >)

  }
}