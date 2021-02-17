import React from 'react';
export class Track extends React.Component {

    renderAction() {
        if (isRemoval) {
            return '-';
        }else{
            return '+';
        }
    }

    render() {
        
        return (
            <div className='Track'>
                <div className="Track-information">
                   <h3>{/* TrackName */}</h3>
                   <p>{/* TrackArtist */} | {/* TrackAlbum */}</p>
                </div>
                <button className="Track-action">{isRemoval()}</button>
            </div>
        )
    }
}