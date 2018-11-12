import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import peopleData from './peopleData/people.json';
import Modal from 'react-responsive-modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peoplesDatas : [],
      deleteParticularPeopleDetails : [],
      formName : '',
      formId : '',
      formDescription : '',
      open: false,
      modalName : '',
      modalId : '',
      modalDescription : '',
        name :'',
        id : '',
        Description : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.addUserDetails = this.addUserDetails.bind(this);
    this.deletePeopleDetails = this.deletePeopleDetails.bind(this);
  }
  componentDidMount() {
    this.setState({
      peoplesDatas : peopleData.People
    });
  }
  displayEachPostDetails(postId){
    var itemFound = this.state.peoplesDatas.find((element) => {
      return element.id === postId;
    })
    this.setState({
      formName : itemFound.name,
      formId : itemFound.id,
      formDescription : itemFound.Description,
    })
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  addUserDetails(){
    if(this.state.modalName != "" && this.state.modalId != "" && this.state.modalDescription != ""){
      var peopleList = this.state.peoplesDatas.concat({name : this.state.modalName, id : this.state.modalId, Description : this.state.modalDescription});
      this.setState({ peoplesDatas: peopleList })
      this.onCloseModal();
    }
    else {
      alert("Please Enter All Field Data...");
    }

  }

  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value);
  }

  handleCheckbox(e) {
    if(e.target.checked){
      var addIdValue = e.target.id.split("_");
      this.state.deleteParticularPeopleDetails.push(addIdValue[1])
      console.log(this.state.deleteParticularPeopleDetails);
    } else{
      var deleteIdValue = e.target.id.split("_");
      var indexValue = this.state.deleteParticularPeopleDetails.indexOf(deleteIdValue[1]);
      if(indexValue != -1){
        this.state.deleteParticularPeopleDetails.splice(indexValue, 1);
      }
      console.log(this.state.deleteParticularPeopleDetails);
    }
  }

  deletePeopleDetails(){
    for(var i = 0; i<this.state.peoplesDatas.length; i++){
      for(var j = 0; j<this.state.deleteParticularPeopleDetails.length;j++){
        if(this.state.deleteParticularPeopleDetails[j] == this.state.peoplesDatas[i].id){
          this.state.peoplesDatas.splice(i,1);
        } else{
          continue;
        }
      }
    }
    this.setState({
      peoplesDatas : this.state.peoplesDatas
    });
  }
  render() {
    const { open } = this.state;
    const postItems = this.state.peoplesDatas.map(post => (
      <div className="panel panel-default" key={post.id} id={post.id}>
        <div className="panel-body">
          <div className="col-lg-12" style = {{padding: '0px'}}>
            <div className="col-lg-3">
              <div className="checkbox" style={{margin: '0px'}}>
                <input type="checkbox" id = {`#checkbox_${post.id}`} onChange={this.handleCheckbox}/>
              </div>
            </div>
            <div className="col-lg-9" style = {{padding: '0px'}} onClick={()=>{this.displayEachPostDetails(post.id)}}>
              <label>{post.name}</label>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="App">
        <div className="col-lg-12">
          <div className="col-lg-12">
            <i className="fa fa-user-plus" aria-hidden="true" style={{float:'right',fontSize:'24px', color:'blue', padding: '15px'}} onClick={this.onOpenModal}></i>
          </div>
        </div>
        <div className="col-lg-12">

          <div className="col-lg-3">

              <div className="panel panel-default">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="checkbox" >
                      <label style={{float:'left'}}><input type="checkbox" value=""/>People</label>
                      <i className="fa fa-trash" aria-hidden="true" style={{float:'right'}} onClick={this.deletePeopleDetails}></i>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  {postItems}
                </div>

              </div>

          </div>

          <div className="col-lg-9">
            <div className="panel panel-default">
              <div className="panel-body">
                <form>
                  <div className="col-lg-12">
                    <div className="col-lg-3">
                      <label htmlFor="formName">Name :</label><br/><br/>
                      <label htmlFor="formId">Id :</label><br/><br/>
                      <label htmlFor="formDescription">Description:</label>
                    </div>
                    <div className="col-lg-6">
                      <input type="text" name="formName" id="formName" style={{float:'left',width:'100%'}} value={this.state.formName}/><br/><br/>
                      <input type="text" name="formId" id="formId" style={{float:'left',width:'100%'}} value={this.state.formId}/><br/><br/>
                      <textarea rows="5" cols="50" name="formDescription" id="formDescription" style={{float:'left',width:'100%'}} value={this.state.formDescription}></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>

        <div>
          <Modal open={open} onClose={this.onCloseModal} center>
            <form>

              <div className = "col-lg-12">

                <div className="col-lg-12">
                  <div className = "col-lg-12" style={{padding:'10px'}}>
                    <i className="fa fa-user-circle" aria-hidden="true" style={{float:'left',fontSize : '36px'}}></i>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="col-lg-3">
                    <label htmlFor="modalName">Name :</label><br/><br/>
                    <label htmlFor="modalId">Id :</label><br/><br/>
                    <label htmlFor="modalDescription">Description:</label>
                  </div>
                  <div className="col-lg-6">
                    <input type="text" name="modalName" id="modalName" style={{float:'left',width:'100%'}} value={this.state.modalName} onChange={this.handleChange}/><br/><br/>
                    <input type="text" name="modalId" id="modalId" style={{float:'left',width:'100%'}} value={this.state.modalId} onChange={this.handleChange}/><br/><br/>
                    <textarea rows="5" cols="50" name="modalDescription" id="modalDescription" style={{float:'left',width:'100%'}} value={this.state.modalDescription} onChange={this.handleChange}></textarea><br/><br/>
                    <button type="button" className="btn btn-primary pull-right" onClick={this.addUserDetails} style={{padding:'10px', margin:'10px'}}>Add User</button>
                    <button type="button" className="btn btn-light pull-right" onClick={this.onCloseModal} style={{padding:'10px', margin:'10px'}}>Cancel</button>
                  </div>
                </div>

              </div>

            </form>
          </Modal>
        </div>

      </div>
    );
  }
}
export default App;
