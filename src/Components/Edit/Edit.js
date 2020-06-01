import React, {Component} from 'react';
import Modal from "../UI/Modal/Modal";
import axiosAPI from "../../axiosAPI";

class Edit extends Component {

    state = {
        edit: '',
        editMess: '',
        messages: {},
        modal: false,
    };

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    editHandler = async () => {
            const object = {
                author: this.state.edit,
                message: this.state.editMess,
            };
            await axiosAPI.put(this.props.match.params.id + '.json', object);
            this.setState({modal: false});
            this.props.history.push('/');
    };

    async componentDidMount() {
        const response = await axiosAPI.get(this.props.match.params.id + '.json');
        this.setState({messages: response.data});
    };

    modalHide = () => {
        this.setState({modal: false})
    };

    render() {
        return (
            <div>
                <input type="text" className="name" name="edit" onChange={this.inputValHandler} placeholder={this.state.messages.author}/>
                <input type="text" className="name" name="editMess" onChange={this.inputValHandler} placeholder={this.state.messages.message}/>
                <button onClick={this.editHandler}>edit</button>
                <Modal show={this.state.modal} close={this.modalHide}>
                    <span className="x" onClick={this.modalHide}>X</span>
                    <p className="editText">Edit Name</p>
                    <input className="editAuthor" type="text" name="edit" placeholder="Edit Name"
                           onChange={this.inputValHandler}/>
                    <p className="editMessText">Edit Message</p>
                    <input className="editMess" type="text" name="editMess" placeholder="Edit message"
                           onChange={this.inputValHandler}/>
                    <button onClick={this.editHandler}>edit</button>
                </Modal>
            </div>
        );
    }
}

export default Edit;