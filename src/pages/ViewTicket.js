/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useContext,useEffect} from "react";
import {json, useParams} from "react-router-dom";
import { BsPatchCheckFill } from 'react-icons/bs';
import {HiInformationCircle,HiTicket,HiChatAlt2} from 'react-icons/hi';
import Authcontext from "../store/Authcontext";
import { Button, Comment, Container, Divider, Form, Header,Label,Icon,TextArea, Input } from 'semantic-ui-react'
import { Alert,Tabs,FileInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import {IoDocumentAttachSharp} from 'react-icons/io5';
import moment from "moment";
import Popup from "reactjs-popup";
import axios from "axios";

const EditTicket = () => {
    const [newCommment, setNewComment] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage ] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [comments, setComments] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const authcontext = useContext(Authcontext);
    const token = localStorage.getItem('token') || authcontext.token;
    const params = useParams();
    const id = params.ticketId;
    const { register, handleSubmit, formState } = useForm();
    const userId = authcontext.userId || localStorage.getItem('userId');
    const [file, setFile] = useState(null);
    const [fileUpload, setFileUpload] = useState(false);
    const [ newCommmentVal, setnewCommmentVal ] = useState(false);

    const commentSubmitHandler = async (formData) => {
        formData.preventDefault();
        const {target} = formData;
        console.log('FormData', Object.fromEntries(new FormData(target)));
        try{
            const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/${id}/comment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(Object.fromEntries(new FormData(target)))
            });
            const responseData = await response.json();
            if(!response.ok){
                if(responseData.error){
                throw new Error(responseData.error);
                }else{
                throw new Error(responseData.message);
                }
            }
            setSuccessMessage(responseData.message);
            setNewComment(true);
        }catch (err) {
            setError(err.message);
        }
    }
    const deleteAttachmentHandler = async (event) => {
        console.log(JSON.stringify(event));
        try{
            const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/attachment/${event}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            const responseData = await response.json();
            if(!response.ok){
                if(responseData.error){
                throw new Error(responseData.error);
                }else{
                throw new Error(responseData.message);
                }
            }
            setSuccessMessage(responseData.message);
            setFileUpload(true);
        }catch (err) {
            setError(err.message);
        }
    }

    const FileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    const FileUploadHandler =  async () => {
        const formData = new FormData();
        formData.append('attachment', file);
        axios.post(`https://supsys.azurewebsites.net/api/ticket/${id}/attachment/`, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setSuccessMessage(response.message);
            setFileUpload(true);
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }

    useEffect(() => {
        const getTicket = async () => {
            try {
                const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/retrive/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    if(responseData.error){
                        throw new Error(responseData.error);
                    }else{
                        throw new Error(responseData.message);
                    }
                }
                setTicket(responseData.ticket);
            } catch (error) {
                setError(true);
            }
        };
        const getComments = async () => {
            try {
                const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/comments/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    if(responseData.error){
                        throw new Error(responseData.error);
                    }else{
                        throw new Error(responseData.message);
                    }
                }
                setComments(responseData.comments);
            } catch (error) {
                setError(true);
            }
        };
        const getAttachments = async () => {
            try {
                const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/${id}/attachments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    if(responseData.error){
                        throw new Error(responseData.error);
                    }else{
                        throw new Error(responseData.message);
                    }
                }
                setAttachments(responseData);
            } catch (error) {
                setError(true);
            }
        };
        getTicket();
        getComments();
        getAttachments();
    }, [newCommment,fileUpload]);

    return (
        <div className="container">
            {!error === false && (
                <Alert
                color="failure"
                icon={HiInformationCircle}
                className="mb-4"
                >
                {error}
                </Alert>
            )}
           {success && (
                <Alert
                color="success"
                icon={BsPatchCheckFill}
                className="bg-green-500 text-white"
                withBorderAccent={true}
                >
                {successMessage}
                </Alert>
            )}
            <div className="bg-white">
                <Tabs.Group>
                    <Tabs.Item title="Ticket" icon={HiTicket}>
                        <Header as='h3' style={{
                            paddingLeft: '60px'
                        }}>
                        {ticket.title}
                        <div  style={{
                            float: 'right'
                        }}>
                        {ticket.status === 'open' ? (<Label color='green' tag>{ticket.status}</Label>): (<Label color="red" tag>{ticket.status}</Label>)}
                        </div>
                        </Header>
                        <Divider />
                        <Container>
                            <p>
                            {ticket.body}
                            </p>
                        </Container>
                    </Tabs.Item>
                    <Tabs.Item title="Comments" icon={HiChatAlt2}>
                        <Header as='h3' dividing>
                        Comments
                        </Header>
                        {comments.map((comment) => (
                            <>
                            <Comment key={comment._id}>
                                <Comment.Content>
                                    <Comment.Author className="font-bold">{comment.Owner.name}</Comment.Author>
                                    {comment.Owner._id === userId && (
                                        <Icon.Group size='small' style={{
                                            float: 'right'
                                        }}>
                                        <Popup trigger={                                       
                                        <Label as='a' color='red'>
                                        <Icon name='delete' />
                                            Delete
                                        </Label>} modal nested>
                                        {close => (
                                                <div className="bg-white">
                                                    <button className="close" onClick={close} style={{
                                                        fill: 'white',
                                                        backgroundColor: 'white', 
                                                    }}>
                                                    &times;
                                                    </button>
                                                    <Container text className="bg-blue-500" style={{
                                                        padding: '30px',
                                                        borderRadius: '10px',
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontSize: '20px'
                                                        
                                                    }} textAlign="center">
                                                    <Header as='h3' textAlign="center" className="font-bold italic">
                                                    Are you sure you want to Delete the Comment?
                                                    </Header>

                                                    <Button color="red" style={{
                                                    }} onClick={async () => {
                                                        try{
                                                            const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/comment/${comment._id}`, {
                                                                method: 'DELETE',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Authorization': 'Bearer ' + token
                                                                }
                                                            });
                                                            const responseData = await response.json();
                                                            if(!response.ok){
                                                                if(responseData.error){
                                                                throw new Error(responseData.error);
                                                                }else{
                                                                throw new Error(responseData.message);
                                                                }
                                                            }
                                                            setSuccessMessage(responseData.message);
                                                            setNewComment(true);
                                                        }catch (err) {
                                                            setError(err.message);
                                                        }
                                                    }}>
                                                        Delete
                                                    </Button>
                                                    <Button color="blue" style={{
                                                    }} onClick={() => {
                                                        close();
                                                    }}>
                                                        Cancel
                                                    </Button>
                                                    </Container>

                                                </div>
                                                )}
                                        </Popup>
                                        <Popup trigger={                                       
                                        <Label as='a' color='blue' onClick={() => {
                                        }}>
                                        <Icon name='edit' />
                                            Edit
                                        </Label>} modal nested>
                                        {close => (
                                                <div className="bg-white">
                                                    <button className="close" onClick={close} style={{
                                                        fill: 'white',
                                                        backgroundColor: 'white', 
                                                    }}>
                                                    &times;
                                                    </button>
                                                    <Container text className="bg-blue-500" style={{
                                                        padding: '30px',
                                                        borderRadius: '10px',
                                                        color: 'white',
                                                        textAlign: 'left',
                                                        fontSize: '20px'
                                                    }} textAlign="left">
                                                    <Header as='h3' className="font-bold italic">
                                                    Submit new comment
                                                    </Header>
                                                    <TextArea   
                                                        placeholder='Comment'
                                                        defaultValue={comment.comment}
                                                        onChange={(e) => {
                                                            setnewCommmentVal(e.target.value);
                                                        }}
                                                        className="text-black w-full"
                                                    />
                                                    <div>
                                                    <Button content='Edit comment' labelPosition='left' icon='edit' primary onClick={async () => {
                                                        try{
                                                            const response = await fetch(`https://supsys.azurewebsites.net/api/ticket/comment/${comment._id}`, {
                                                                method: 'PUT',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Authorization': 'Bearer ' + token
                                                                },
                                                                body: JSON.stringify({
                                                                    newMessage: newCommmentVal
                                                                })
                                                            });
                                                            const responseData = await response.json();
                                                            if(!response.ok){
                                                                if(responseData.error){
                                                                throw new Error(responseData.error);
                                                                }else{
                                                                throw new Error(responseData.message);
                                                                }
                                                            }
                                                            setSuccessMessage(responseData.message);
                                                            close();
                                                            setNewComment(true);
                                                        }catch (err) {
                                                            setError(err.message);
                                                        }
                                                    }} />
                                                    <Button color="blue" float='right' style={{
                                                    }} onClick={() => {
                                                        close();
                                                    }}>
                                                        Cancel
                                                    </Button>
                                                    </div>
                                                    </Container>
                                                </div>
                                                )}
                                        </Popup>
                                        </Icon.Group>
                                        )}
                                    <Comment.Metadata className="italic">
                                            {moment(comment.creationDate).format('YYYY-MM-DD')}
                                    </Comment.Metadata>
                                    <Divider />
                                    <Comment.Text>{comment.comment}</Comment.Text>
                                </Comment.Content>
                                </Comment>
                                <Divider />
                            </>
                            ))}
                            <Form reply onSubmit={commentSubmitHandler}>
                                    <Form.TextArea 
                                    name="comment" 
                                    placeholder="Submit new comment.."
                                    />
                                    <Button content='Add Comment' labelPosition='left' icon='comment' primary />
                            </Form>
                            </Tabs.Item><Tabs.Item title="Attachments" icon={IoDocumentAttachSharp}>
                            <Header as='h3' dividing>
                            Attachments
                            </Header>
                            {attachments.map((attachment) => (
                                <div key={attachment._id} className="mb-3">
                                    <a href={"https://supsys.azurewebsites.net/"+attachment.url} target="_blank" rel="noopener noreferrer">
                                        <Icon name="file" />
                                        {attachment.name.split('.')[0]}
                                    </a>
                                </div>
                            ))}
                            <Divider horizontal>Upload attachment</Divider>
                                <input type="file" name="attachment" onChange={FileSelectedHandler} />
                                <Button type="submit" color="blue" onClick={FileUploadHandler}>Upload</Button>
                            </Tabs.Item>
                </Tabs.Group>
            </div>
        </div>
    );
};

export default EditTicket;