import React from 'react';
import ReactDOM from 'react-dom';
import { Confirm, TransitionablePortal } from 'semantic-ui-react';

const UserLeaveConfirmation = (message, callback, confirmOpen, setConfirmOpen) => {
    console.log(message);

    const container = document.createElement("div");
    container.setAttribute("custom-confirm-view", "");

    const handleConfirm = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback(callbackState);
        setConfirmOpen(false);
    };

    const handleCancel = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback();
        setConfirmOpen(false);
    }

    document.body.appendChild(container);

    const { header, content } = JSON.parse(message);

    ReactDOM.render(
        <TransitionablePortal open={confirmOpen} onClose={handleCancel}>
            <Confirm
                centered={false}
                open={confirmOpen}
                header={header}
                content={content}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </TransitionablePortal>,
        container
    );

};

export default UserLeaveConfirmation;