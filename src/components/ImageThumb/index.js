import React from 'react';
import { Image } from 'semantic-ui-react';
import './style.css';

const ImageThumb = ({ firstName, lastName, src, style, className }) => {

    const getInitials = () => {

        if (firstName && lastName) {
            return `${firstName[0]}${lastName[0]}`;
        }
        else {
            return "";
        }

    };

    return (
        <div>
            {src && (
                <Image circular style={style} src={src} />
            )}

            {!src && (
                <div style={style} className="thumbnail">
                    <span>
                        {getInitials()}
                    </span>

                </div>
            )}
        </div>
    );
}

export default ImageThumb;
