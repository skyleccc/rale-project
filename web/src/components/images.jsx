import React from "react";

const Images = ({ list }) => {
    return (
        <div className="images-container">
            {list.map((announcement) => (
                <div className="contImage" key={announcement.id}>
                    <img className="image" src={announcement.imgUrl} alt={announcement.name} />
                </div>
            ))}
        </div>
    );
};

export default Images;
