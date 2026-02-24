
import React from 'react'
import DOMPurify from 'isomorphic-dompurify'

const HTMLContent = ({ content, className }) => {
    const sanitizedContent = DOMPurify.sanitize(content)

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    )
}

export default HTMLContent
