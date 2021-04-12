import React, { useRef } from 'react'
import { Placeholder, Icon, Message } from 'semantic-ui-react';
import ImageThumb from '../../../components/ImageThumb';
import './style.css';

const Favorites = ({ favorites, loading }) => {

    const showIcon = favorites.length > 2;

    const listRef = useRef();

    const scrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                top: 0,
                left: -500,
                behavior: "smooth"
            });
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                top: 0,
                left: 500,
                behavior: "smooth"
            });
        }
    };

    return (

        <div>
            { favorites.length === 0 && !loading && (
                <Message
                    icon='exclamation triangle'
                    header='No Contacts to Show'
                    style={{ color: "#0E6EB8" }}
                />

            )
            }

            <div className="slide-container" >
                {showIcon && (<Icon
                    className="icon-class"
                    name="caret left"
                    size="big"
                    onClick={scrollLeft}
                />)
                }
                {
                    favorites.length > 0 && (
                        <div className="items-container" ref={listRef}>
                            {Array.isArray(favorites) &&
                                favorites.map((item) => {
                                    return (
                                        <div key={item.id} className="single-item-container">
                                            <ImageThumb
                                                style={{ width: 75, height: 75 }}
                                                firstName={item.first_name}
                                                lastName={item.last_name}
                                                src={item.contact_picture}
                                            />
                                            <p className="name">
                                                {item.first_name} {item.last_name}
                                            </p>
                                        </div>
                                    )
                                })}
                        </div>
                    )
                }

                {loading && (
                    <>
                        {" "}
                        <Placeholder fluid>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                    </>
                )
                }

                {
                    showIcon && (<Icon
                        className="icon-class"
                        name="caret right"
                        size="big"
                        onClick={scrollRight}
                    />)
                }
            </div>

        </div>
    );
};

export default Favorites
