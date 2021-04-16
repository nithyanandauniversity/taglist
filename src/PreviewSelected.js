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
import StarPicker from 'react-star-picker';


export default class PreviewSelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: props.location.search
    };

  }

  componentDidMount() {
    axios.get('/taglist/assets/tags/annadhan-updated.json').then(response => {
      let taggedImages = response.data;
      let selectedTag = {};
      selectedTag.name = 'Anna Daan';
      selectedTag.description = 'Consolidation of all images related to the keyword anna daan';
      console.log(taggedImages);
      this.setState({
        taggedImages, selectedTag,
      });
    });
  }

  //Todo: Load images mnannualy and verify
  //? 176 - 200, 372 - 378, 396 - 403, 631 - 730, 741 - 771, 809 - 814, 829 - 834, 983-994, 1007-1012
  //? 107-1083, 1201-1209, 1220-1348,1831-1853,1956-1967, 2000-2048,
  //? 2057- 2074

  render() {

    const handleSave = (value, props) => {
      let index = props.index;
      this.state.taggedImages[index].description = value.split('Anna Daan @ ')[1];
      this.setState({ taggedImages });
      console.log('update Value', value, props);
      console.log('update Value', this.state.taggedImages);
    }


    const starValueChange = (value, index) => {
      this.state.taggedImages[index].rating = value;
      this.setState({ taggedImages });
      console.log('update Value', value, index);
      console.log('update Value', this.state.taggedImages);
    }

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
      ...range(2231, 2239),
      ...range(2292, 2293),
      2421,
      ...range(2922, 2947),
      ...range(2992, 2995),
      ...range(3001, 3007),
      ...range(3139, 3164),
      ...range(3186, 3199),
      3355, 3356,
      ...range(3411, 3413),
      3533,
      ...range(3707, 3726),
      ...range(3809, 3812),
      ...range(3919, 3920), ...range(3959, 3966), ...range(3970, 3971), ...range(3981, 3984), 3993, 3944,
      ...range(3999, 4005)
    ]


    //?? 3358-3382 3554-3560,3813-3912
    if (this.state.taggedImages == null) return (<h3>Loading...</h3>);
    let taggedImages = this.state.taggedImages;
    let count = 0;
    // console.log('querry String', qs.parse(this.location.search));
    return (<div id="preview" className="customerdetails">
      {this.state.queryString ? this.state.queryString : ''}
      <Card className="centeralign">
        {/* <Card.Header>
          <center><Badge><h3><b>Preview</b></h3></Badge></center>
          <Card.Title ><b>Tag Name:</b> <div className="badge primary">{this.state.selectedTag.name}&nbsp;</div>  <b>Description:</b>{this.state.selectedTag.description}</Card.Title>
          <center>This is preview of images related to this tag</center>
        </Card.Header> */}
        {/* <Card.Body>        </Card.Body> */}
        {/* <br /> */}
        {taggedImages.map((img, index) => {
          if (index % 2 == 1) return;
          if (taggedImages.length - 1 == index) { taggedImages.push({ url: '', description: '' }) }
          if (selected.indexOf(index) > -1) {
            let img = taggedImages[index];
            let description1 = 'Date: ' + img.npediaURL.replace('https://nithyanandapedia.org/wiki/', '').replaceAll('_', ' ') + ' Anna Daan @ ' + img.description.replaceAll('[', '').replaceAll(']', '').replaceAll('Anna daan', '');
            let rating1 = img.rating = (img.rating == null) ? 0 : img.rating;
            // console.log(img.rating);
            img = taggedImages[index + 1];
            let description2 = 'Date: ' + img.npediaURL.replace('https://nithyanandapedia.org/wiki/', '').replaceAll('_', ' ') + ' Anna Daan @ ' + img.description.replaceAll('[', '').replaceAll(']', '').replaceAll('Anna daan', '');
            let rating2 = img.rating = (img.rating == null) ? 0 : img.rating;
            // console.log(img.rating);
            return (
              <div className='imagesblock'>
                <div className='imagebox'>
                  <div style={{ width: '45%' }}>
                    <center><img src={taggedImages[index].url} style={{ width: '100%' }} />
                      <EdiText type="text" tabIndex={++count} startEditingOnEnter cancelOnEscape submitOnEnter submitOnUnfocus showButtonsOnHover value={description1} onSave={handleSave} inputProps={{ index: index }} />
                      <a href={taggedImages[index].npediaURL}>src-{count}</a></center>
                    <StarPicker size={25} onChange={starValueChange} value={rating1} halfStars name={index} name={index + 1} />
                  </div>
                  <div style={{ width: '45%' }}>
                    <center><img src={taggedImages[index + 1].url} style={{ width: '100%' }} />
                      <EdiText type="text" tabIndex={++count} startEditingOnEnter cancelOnEscape submitOnEnter submitOnUnfocus showButtonsOnHover value={description2} onSave={handleSave} inputProps={{ index: index + 1 }} />
                      <StarPicker size={25} onChange={starValueChange} value={rating2} halfStars name={index + 1} />
                      <a href={taggedImages[index + 1].npediaURL}>src-{count}</a></center>
                  </div>
                </div>
              </div>
              //<Card key={index} style={{ width: '10%', float: 'left' }}>
              //           {/* <img src={'./images/' + img.path} onError={(e) => {
              //   e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x200.png?text=..."
              // }} /> */}
              //           <Card.Img variant="top" alt={img.description} title={img.description} src={img.url} />
              //           <Card.Body>
              //             <Card.Text>{img.description.substring(0, 150)}</Card.Text>
              //             <a href={img.npediaURL}>..src-{++count}</a>
              //           </Card.Body>
              //</Card>
            );
          }
        })}
      </Card>
    </div >)

  }
}