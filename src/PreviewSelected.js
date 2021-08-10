import React, { Component } from 'react';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactTags from 'react-tag-autocomplete'
import './styles.css'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import range from 'lodash.range';
import EdiText from 'react-editext'
import StarPicker from 'react-star-picker';
import { sort as fuzzy } from 'fuzzyjs'
import places from './Town_Codes_India_2001.json';
import { Col, Container } from 'react-bootstrap';

export default class PreviewSelected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: props.location.search,
      edit: true,
      om: 'red'
    };
  }

  componentDidMount() {
    let filePath;
    let param = this.state.queryString;
    if (param === '?om=red' || param === '') {
      filePath = '/taglist/assets/tags/annadhan-updated.json';//path is wrong
      // the path is relative 
      // in local the path is 
      //localhost:port/assets/tags/etc...
      //in github the file is at
      //nugithub/taglist/assets/tags/etc..
      //but as per the code it is expecting it to be at
      //nugithub/assets/tag/etc....
      //yes correct it ad app names before the path in git, gennerally i used append appname while publish to git now i missed 
      this.state.om = 'red';
    }
    if (param === '?om=orange') {
      filePath = '/taglist/assets/tags/peace.json'
      this.state.om = 'orange';
    }

    let domain = 'http://taglist-mirror.herokuapp.com';
    // domain = 'http://localhost:4000'
    domain = '' // is this correct or we will have give full path ?

    let url = domain + '/images/' + this.state.om; //local dev
    // let url = 'https://anandan-mirror.herokuapp.com/images/' + this.state.om;
    axios.get(url, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    ).then(response => {
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
    let domain = 'http://taglist-mirror.herokuapp.com';
    // domain = 'http://localhost:4000'
    const updateRecord = (index) => {
      let url = domain + '/images';
      let data = {
        om: this.state.om,
        record: this.state.taggedImages[index],
        index: index
      }
      axios.put(url, data).then(response => {
        console.log(response);
      });
    }

    const handleSave = (value, props) => {
      let index = props.index;
      this.state.taggedImages[index].description = value;
      updateRecord(index);
      this.setState({ taggedImages });
      console.log('update Value', value, props);
      console.log('update Value', this.state.taggedImages);
    }


    const starValueChange = (value, index) => {
      this.state.taggedImages[index].rating = value;
      updateRecord(index);
      this.setState({ taggedImages });
      console.log('update Value', value, index);
      console.log('update Value', this.state.taggedImages);
    }


    const sort = () => {
      let taggedImages = this.state.taggedImages;
      taggedImages = taggedImages.sort(function (a, b) {
        // console.log(a.rating, b.rating);
        return (a.rating < b.rating)
      });
      this.setState({ taggedImages });
      console.log('Sorted images...as per rating', this.state.taggedImages);
    }

    const cleanTagDescription = (desc) => {
      let description = desc.replaceAll('[', '')
        .replaceAll(']', '')
        .replaceAll('Anna daan', '')
        .replaceAll('anna daan', '')
        .replaceAll('Annadaan', '')
        .replaceAll(',,', '');
      description = description[description.length - 1] == ',' ? description.substring(0, description.length - 2) : description;
      return description;
    }

    const getPlace = (desc) => {
      let descs = desc.split(',');
      descs.map(d => {
        console.log(places.filter(fuzzy(d, { sourceAccessor: place => place.city_town })));
      });
      return desc;
    }

    //?? 3358-3382 3554-3560,3813-3912
    if (this.state.taggedImages == null) return (<h3>Loading...</h3>);
    let taggedImages = this.state.taggedImages;

    let selected = [...range(0, 6000)];
    if (this.state.om === 'red') selected = [
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
    console.log(this.state.om, selected);

    let count = 0;
    // console.log('querry String', qs.parse(this.location.search));
    let imgs = [];
    if (this.state.edit == true)
      return (<div id="edit">
        {this.state.queryString ? this.state.queryString : ''}
        <Button onClick={() => this.setState({ edit: false })}>Preivew</Button>
        {taggedImages.map((img, index) => {
          if (index % 2 == 1) return;
          if (taggedImages.length - 1 == index) { taggedImages.push({ url: '', description: '' }) }
          // if (selected.indexOf(index) > -1) 
          {
            let img = taggedImages[index];

            let desc1 = {
              date: img.npediaURL.replace('https://nithyanandapedia.org/wiki/', '').replaceAll('_', ' '),
              desc: cleanTagDescription(img.description),
              place: '',  //getPlace(desc),
              rating: (img.rating == null) ? 0 : img.rating
            }
            img = taggedImages[index + 1];
            let desc2 = {
              date: img.npediaURL.replace('https://nithyanandapedia.org/wiki/', '').replaceAll('_', ' '),
              desc: cleanTagDescription(img.description),
              place: '', //getPlace(desc),
              rating: (img.rating == null) ? 0 : img.rating
            }

            return (
              <div className='imagesblock'>
                <div className='imagebox'>
                  <div style={{ width: '45%' }}>
                    <center><img src={taggedImages[index].url} style={{ width: '100%' }} />
                      <Row className='justify-content-md-left' ><Col md='auto'><div style={{ padding: '8px 0px 0px 0px', color: 'blue', fontWeight: 'bold' }}><b></b>{desc1.date}:</div></Col>
                        <Col md='auto'><EdiText type="text" tabIndex={++count} startEditingOnEnter cancelOnEscape submitOnEnter submitOnUnfocus showButtonsOnHover value={desc1.desc} onSave={handleSave} inputProps={{ index: index }} /></Col>
                        <Col md='auto'><div style={{ padding: '8px 0px 0px 0px' }}><a style={{ textDecoration: 'none', color: 'blue' }} href={taggedImages[index].npediaURL}>(see more)</a></div></Col>
                      </Row>
                      <StarPicker size={25} onChange={starValueChange} value={desc1.rating} halfStars name={index} /></center>
                  </div>
                  <div style={{ width: '45%' }}>
                    <center><img src={taggedImages[index + 1].url} style={{ width: '100%' }} />
                      <Row className='justify-content-md-left' ><Col md='auto'><div style={{ padding: '8px 0px 0px 0px', color: 'blue', fontWeight: 'bold' }}><b></b>{desc2.date}:</div></Col>
                        <Col md='auto'><EdiText type="text" tabIndex={++count} startEditingOnEnter cancelOnEscape submitOnEnter submitOnUnfocus showButtonsOnHover value={desc2.desc} onSave={handleSave} inputProps={{ index: index + 1 }} /></Col>
                        <Col md='auto'><div style={{ padding: '8px 0px 0px 0px' }}><a style={{ textDecoration: 'none', color: 'blue' }} href={taggedImages[index + 1].npediaURL}>(see more)</a></div></Col>
                      </Row>
                      <StarPicker size={25} onChange={starValueChange} value={desc2.rating} halfStars name={index + 1} /></center>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div >)
    else {
      sort();

      return (<div id="preview">
        {this.state.queryString ? this.state.queryString : ''}
        <Button onClick={() => this.setState({ edit: true })}>Edit</Button>
        {taggedImages.map((img, index) => {
          if (index % 2 == 1) return;
          if (taggedImages.length - 1 == index) { taggedImages.push({ url: '', description: '' }) }
          if (selected.indexOf(index) > -1) {
            let img = taggedImages[index];
            imgs.push(img);
            let desc1 = {
              date: img.npediaURL.replace('https://nithyanandapedia.org/wiki/', '').replaceAll('_', ' '),
              desc: cleanTagDescription(img.description),
              place: '',  //getPlace(desc),
              rating: (img.rating == null) ? 0 : img.rating
            }
            img = taggedImages[index + 1];
            let desc2 = {
              date: img.npediaURL.replace('https://nithyanandapedia.org/wiki/', '').replaceAll('_', ' '),
              desc: cleanTagDescription(img.description),
              place: '', //getPlace(desc),
              rating: (img.rating == null) ? 0 : img.rating
            }
            imgs.push(img);
            console.log('imags..', imgs);
            return (
              <div className='imagesblock'>
                <div className='imagebox'>
                  <div style={{ width: '45%' }}>
                    <center><img src={taggedImages[index].url} style={{ width: '100%' }} /></center>
                    <p><a href={taggedImages[index].npediaURL} style={{ textDecoration: 'none' }}  ><strong>{desc1.date}</strong>:</a> {desc1.desc} <a href={taggedImages[index].npediaURL} style={{ textDecoration: 'none' }}>(See more)</a></p>
                    {/* <Row className='justify-content-md-left' ><Col md='auto'><div style={{ padding: '8px 0px 0px 0px', color: 'blue', fontWeight: 'bold' }}><b></b>{desc1.date}:</div></Col>
                        <Col md='auto'><div style={{ padding: '8px 0px 0px 0px' }}>{desc1.desc} </div></Col>
                        <Col md='auto'><div style={{ padding: '8px 0px 0px 0px' }}><a style={{ textDecoration: 'none', color: 'blue' }} href={taggedImages[index].npediaURL}>(see more)</a></div></Col>
                      </Row> */}
                    {/* <StarPicker size={25} onChange={starValueChange} value={desc1.rating} halfStars name={index} name={index} /> */}

                  </div>
                  <div style={{ width: '45%' }}>
                    <center><img src={taggedImages[index + 1].url} style={{ width: '100%' }} /></center>
                    <p><a href={taggedImages[index + 1].npediaURL} style={{ textDecoration: 'none' }}><strong>{desc2.date}</strong>:</a> {desc2.desc} <a href={taggedImages[index + 1].npediaURL} style={{ textDecoration: 'none' }}>(See more)</a></p>

                    {/* <Container fluid className='p-0'> */}
                    {/* <Row className='justify-content-md-left p-0' ><Col md='auto'><div style={{ color: 'blue', fontWeight: 'bold' }}><b></b>{desc2.date}:</div></Col>
                          <Col md='auto'><div>{desc2.desc} </div></Col>
                          <Col md='auto'><div><a style={{ textDecoration: 'none', color: 'blue' }} href={taggedImages[index + 1].npediaURL}>(see more)</a></div></Col>
                        </Row> */}
                    {/* </Container> */}
                    {/* <StarPicker size={25} onChange={starValueChange} value={desc2.rating} halfStars name={index} name={index} /> */}

                  </div>
                </div>
              </div>
            );
          }
        })}
      </div >)
    }
  }
}