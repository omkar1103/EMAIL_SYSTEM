import { Button, Modal, Form } from "react-bootstrap";
import React, { useRef, useState } from "react";
import axios from "axios";

export const Main = () => {
    const mail_Id = useRef();
    const mail_Subject = useRef();
    const mail_Meassage = useRef();

    const [status, setStatus] = useState(false);

    const Sendemail = () => {
        setStatus(true);
    };

    const CloseMailmodal = () => {
        setStatus(false);
    };

    const submitmail = (e) => {
        e.preventDefault();

        const email = mail_Id.current.value;
        if (!email) {
            alert("Please enter your email");
            return;
        } else {
            var pattern = /\S+@\S+\.\S+/;
            if (!pattern.test(email)) {
                alert("Email is not in a valid format");
                return;
            }
        }

        var st = {
            "email_address": mail_Id.current.value,
            "subject": mail_Subject.current.value,
            "message_body": mail_Meassage.current.value,
        };

        axios({
            url: 'http://localhost:9090/api/sendemail',
            method: 'post',
            data: st,
        }).then(e => {
            alert("Mail Sent successfully");
        }).catch(error => {
            console.error("Error fetching data ", error);
        });
    };

    return (
        <>
            <br/>
            <br/>
            <div className="text-center">
            <Button size="lg" onClick={Sendemail}>Open Mail Modal</Button>
            </div>
            <Modal show={status} onHide={CloseMailmodal}>
                <Modal.Header closeButton>
                    <Modal.Title>Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitmail}>
                        <Form.Group className="mb-3">
                            <Form.Label><b>To</b></Form.Label>
                            <Form.Control placeholder="Recipients" ref={mail_Id}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Subject</b></Form.Label>
                            <Form.Control placeholder="subject" ref={mail_Subject}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Message</b></Form.Label>
                            <Form.Control as="textarea" style={{ width: "100%", height: "190px" }} placeholder="subject" ref={mail_Meassage}></Form.Control>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={CloseMailmodal}>Close</Button>
                            <Button variant="success" type="submit">SUBMIT</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
