import React from 'react'

function Loading() {
    return (
        <div className="loading">
            <img src={require("../images/mondo.gif")} alt="Loading..." />
        </div>
    )
}

export default Loading
