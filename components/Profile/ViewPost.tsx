import { IDatabasePostState } from 'constants/immediate-states/post.state'
import React from 'react'
import PostsView from './Posts/Posts'
const dummyPosts: IDatabasePostState[] = [
  {
    size: '500 sqft',
    rooms: '2 BHK',
    address: 'XYZ Street, New Delhi',
    monthlyRent: 5000,
    securitDeposit: 10000,
    uid: '',
  },
  {
    size: '500 sqft',
    rooms: '2 BHK',
    address: 'XYZ Street, New Delhi',
    monthlyRent: 5000,
    securitDeposit: 10000,
    uid: '',
  },
  {
    size: '500 sqft',
    rooms: '2 BHK',
    address: 'XYZ Street, New Delhi',
    monthlyRent: 5000,
    securitDeposit: 10000,
    uid: '',
  },
]

export default function ViewPost() {
  return <PostsView posts={dummyPosts} />
}
