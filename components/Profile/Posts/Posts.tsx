import { IDatabasePostState } from 'constants/immediate-states/post.state'
import React from 'react'
import Post from './Post'

const Posts = (props: { posts: IDatabasePostState[] }) => {
  const { posts } = props
  return (
    <React.Fragment>
      {posts.map((element, index) => (
        <Post key={index} post={element} />
      ))}
    </React.Fragment>
  )
}

export default Posts
