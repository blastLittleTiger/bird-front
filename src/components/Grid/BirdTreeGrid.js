import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import BirdGrid from './BirdGrid';
import BirdTree from './BirdTree';
import {util} from 'utils';

class BirdTreeGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      treeOption: this.props.treeOption,
      itemHash: {},
      selectedKeys: [],
      expandedKeys: []
    }
  }

  //树节点点击事件，不支持点选多个节点
  itemClick(clickKey) {
    let {gridOption,treeOption} = this.props;
    if(util.string.isEmpty(treeOption.paramName)) return;

    let customRules = gridOption.customRules||[];
    let rule = customRules.find(p=>p.field === treeOption.paramName);
    if(rule){
      rule.value = clickKey
    }else{
      customRules.push({
        field: treeOption.paramName,
        value: clickKey
      })
    }
    
    this.refs.grid.setCustomData(customRules);
    treeOption.onSelect && treeOption.onSelect(clickKey);
  }

  getGrid() {
    return this.refs.grid;
  }

  render() {
    let self = this;
    let option = {
      ...self.state.treeOption,
      initFirstLeaf: true,
      onSelect: (key) => self.itemClick(key)
    };

    let gridOption = this.props.gridOption;
    gridOption.autoQuery = false;

    let treeSpan = this.props.treeOption.span || 4;

    return (<Row type="flex" justify="center">
      <Col span={treeSpan}>
        <Card title={self.props.treeOption.title}>
          <BirdTree treeOption={option} />
        </Card>
      </Col>
      <Col span={24 - treeSpan}>
        <BirdGrid gridOption={gridOption} ref="grid" />
      </Col>
    </Row>)
  }
}

BirdTreeGrid.propTypes = {
  treeOption: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    paramName: PropTypes.string.isRequired,//点击时关联的表格字段名
    textField: PropTypes.string,
    valueField: PropTypes.string,
    parentField: PropTypes.string,
    initialValue: PropTypes.string,
    span: PropTypes.number
  }),
  gridOption: PropTypes.object.isRequired
};

export default BirdTreeGrid;
