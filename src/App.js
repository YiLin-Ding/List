import React from 'react';
import './App.css';
import { Button } from 'antd';
import { Input } from 'antd';
import { List, Typography, Divider } from 'antd';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[
        'learn react',
        'learn ES6',
        'finish list'
      ],
      inputValue:'',
      inputSearch:'',
      inputModify:[]
    }
  }

  handleInputAdd(e){
    this.setState({
      inputValue:e.target.value
    })
  }
  handleInputSearch(e){
    this.setState({
      inputSearch:e.target.value
    })
  }
  handleInputModify(e){
    let name = e.target.name
    const inputModify = [...this.state.inputModify]
    inputModify[name]=e.target.value
    this.setState({
      inputModify
    })
    console.log(this.state.inputModify)
  }
  handleSearchClick(){
    let flag=0;
    this.state.list.forEach((item,index)=>{
      if(this.state.inputSearch===item){
        alert('该计划已存在！')
        flag = 1;
        return 1;
      }
    })
    if(flag===0){
      alert('该计划不存在')
    }
    this.setState({
      inputSearch:''
    })
  }
  handleAddClick(){
    this.setState({
      list:[...this.state.list, this.state.inputValue],
      inputValue:''
    })
  }
  handleDeleteClick(index){
    const list = [...this.state.list]
    list.splice(index,1)
    this.setState({list})  
  }

  handleModifyClick(index){
    const list = [...this.state.list]
    const inputModify = [...this.state.inputModify]
    list[index] = inputModify[index]
    inputModify.splice(index,1,'')
    this.setState({
      list,
      inputModify
    })
    
  }

  render(){
    return(
      <div className="List">
        <Divider orientation="left">今日任务</Divider>
        <List
          header={<div>2020-4-22 丁怡霖</div>}
          bordered
          dataSource={this.state.list}
          renderItem={(item,index) => (
            <List.Item className="listItem">
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
              <div className="btn">
                <div style={{float:'left'}}>
                  <Input style={{float:'left',position:'relative',width:'300px'}} value={this.state.inputModify[index]} name={index} placeholder="Please enter the task to be modified" onChange={this.handleInputModify.bind(this)}/>
                  <Button style={{position:'absolute',left:'290px'}} type="primary" onClick={this.handleModifyClick.bind(this,index)}>modify</Button>
                </div>
                <Button style={{position:'absolute',left:'370px'}} type="primary" onClick={this.handleDeleteClick.bind(this,index)}>delete</Button>
              </div>
            </List.Item>
          )}
        />
        <div className="input-btn">
          <Input value={this.state.inputValue} placeholder="Please enter the task to be completed" onChange={this.handleInputAdd.bind(this)}/>
          <Button style={{position:'absolute',left:'350px'}} type="primary" onClick={this.handleAddClick.bind(this)}>add</Button>
        </div>
        <div className="input-btn change">
          <Input className="input-search" value={this.state.inputSearch} placeholder="Please enter the task to be searched" onChange={this.handleInputSearch.bind(this)}/>
          <Button style={{position:'absolute',left:'740px'}} type="primary" onClick={this.handleSearchClick.bind(this)}>search</Button>
        </div>
      </div>
    )
  }
}

export default App;