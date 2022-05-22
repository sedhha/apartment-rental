import { NAVIGATION_ROUTES } from 'constants/routes'
import Link from 'next/link'
import React from 'react'

const activeStyle = 'text-indigo-600 underline'

type Props = {
  postOpType: string
}

export default function Header(props: Props) {
  const { postOpType } = props
  return (
    <div className="flex flex-row justify-around w-full p-2">
      <Link href={NAVIGATION_ROUTES.PROFILE_VIEW_POST}>
        <a className={postOpType === 'view-post' ? activeStyle : ''}>
          View Post
        </a>
      </Link>
      <Link href={NAVIGATION_ROUTES.PROFILE_ADD_POST}>
        <a className={postOpType === 'add-post' ? activeStyle : ''}>Add Post</a>
      </Link>
    </div>
  )
}
