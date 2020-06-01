import React, {Component} from 'react';
import axiosAPI from '../axiosAPI';
import {nanoid} from "nanoid";
import img1 from '../icons8-редактировать.svg';
import img2 from '../icons8-email-send-48.png';
import './Chat.css';
import Spinner from '../Spinner/Spinner';
import Modal from "../Components/UI/Modal/Modal";

class Chat extends Component {

    state = {
        author: '',
        message: '',
        check:'',
        messages: [],
        modal: false,
        name: '',
    };

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    clickBtnHandler = async (e) => {
        e.preventDefault();
        const object = {
            author: this.state.author,
            message: this.state.message,
        };
        this.setState({spinner: true});
        await axiosAPI.post('.json', object);
        await this.getMessages();
        this.setState({spinner: false});
    };

    getMessages = async () => {
        const response = await axiosAPI.get('.json');
        this.setState({messages: response.data});
    };

    async componentDidMount(){
        await this.getMessages();
    }

    deleteMessage = async (id) => {
        this.setState({spinner: true});
        await axiosAPI.delete(id + '.json');
        await this.getMessages();
        this.setState({spinner: false});
    };

    showModal = (id, name) => {
        this.setState({modal: true, id, check: name});
    };

    closeModal = () => {
            this.setState({modal: false});
    };

    checkHandler = () => {
        if (this.state.check === this.state.name) {
            this.props.history.push(`edit/${this.state.id}`);
            this.setState({modal: false});
        }
    };

    render() {
        return (
            <div className="container">
                <div className="chat_block">
                    <Modal show={this.state.modal} close={this.closeModal}>
                        <input type="text" name="name" onChange={this.inputValHandler}/>
                        <button onClick={this.checkHandler}>check</button>
                    </Modal>
                    {this.state.spinner === true ? (
                        <Spinner/>
                    ) : (
                        <div className="messages_block">
                            {Object.keys(this.state.messages).map(mess => (
                                <div key={nanoid()} className="mess_block">
                                    <button className="btn_3" onClick={() => this.deleteMessage(mess)}>X</button>
                                    <p className="author">{this.state.messages[mess].author}:</p>
                                    <p className="mess">{this.state.messages[mess].message}</p>
                                    <button onClick={() => this.showModal(mess,this.state.messages[mess].author)} className="btn-1">
                                        <img src={img1} alt=""/></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                    <form className="input_btn" onSubmit={this.clickBtnHandler}>
                        <input className="in_2" onChange={this.inputValHandler} type="text" name="author"
                               placeholder="Your Name.."/>
                        <input className="in_1" onChange={this.inputValHandler} type="text" name="message"
                               placeholder="Enter your messages"/>
                        <button className="btn"><img src={img2} alt=""/></button>
                    </form>
            </div>
    )
    }
    }

    export default Chat;