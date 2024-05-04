import Header from 'src/components/Header'
import MessageItem from '../../Component/MessageItem'

export default function Conversation() {
  const fakedata = {
    _id: '657c5db41d1c1f9d58527791',
    sender_id: '65842e67cbac563602cbd251',
    receiver_id: '657c5db41d1c1f9d58527796',
    content: 'T la hao sssss ssssssssssssssss sssss ssssssssssss'
  }
  const fakedata2 = {
    _id: '657c5db41d1c1f9d58527792',
    sender_id: '657c5db41d1c1f9d58527796',
    receiver_id: '65842e67cbac563602cbd251',
    content: 'string 2'
  }
  return (
    <div>
      <Header label={`Chat with @....`} showBackArrow />
      <MessageItem data={fakedata} />
      <MessageItem data={fakedata2} />
    </div>
  )
}
