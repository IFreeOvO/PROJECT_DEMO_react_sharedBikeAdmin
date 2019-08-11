import React from 'react'
import { Card, Row, Col, Modal } from 'antd'
import './ui.less'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImg: '',
      visible: false
    }
  }

  openGallery = imgSrc => {
    this.setState({
      currentImg: `/gallery/${imgSrc}`,
      visible: true
    })
  }

  render() {
    const imgs = []
    for (let i = 0; i < 5; i++) {
      let row = []
      for (let j = 1; j < 6; j++) {
        row.push(`${i * 5 + j}.png`)
      }
      imgs.push(row)
    }
    console.log(imgs)

    const imgList = imgs.map(list =>
      list.map(item => (
        <Card
          key={item}
          cover={<img src={`/gallery/${item}`} alt="图片" />}
          style={{ marginBottom: 10 }}
          onClick={() => this.openGallery(item)}
        >
          <Card.Meta title="React Admin" description={`I love imooc ${item}`} />
        </Card>
      ))
    )
    return (
      <div>
        <Card title="图片画廊" className="card-warp">
          <Row gutter={10}>
            <Col md={5}>{imgList[0]}</Col>

            <Col md={5}>{imgList[1]}</Col>

            <Col md={5}>{imgList[2]}</Col>

            <Col md={5}>{imgList[3]}</Col>

            <Col md={4}>{imgList[4]}</Col>
          </Row>

          <Modal
            visible={this.state.visible}
            title="图片画廊"
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
            footer={null}
          >
            <img
              src={this.state.currentImg}
              alt="图片"
              style={{ width: '100%' }}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}

export default Gallery
