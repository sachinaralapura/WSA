import React from 'react'

const defaultNoticeText = "0 2025 WSA. All right reserved";

export default function Copyright({ notice = defaultNoticeText }) {
    return (
        <p className='getting-started-copyright-text'>
            {notice}
        </p>
    )
}
