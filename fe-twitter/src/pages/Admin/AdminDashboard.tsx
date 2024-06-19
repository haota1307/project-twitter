import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const ChartItem = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 border border-slate-900 bg-blue-50 rounded-xl h-[90%] w-[90%] mt-10 ml-4'>
      <h3 className='text-2xl font-semibold text-black mb-4'>Chart in year</h3>
      {children}
    </div>
  )
}

export default function AdminDashboard() {
  const data = [
    {
      name: 'January',
      Users: 0,
      Tweets: 0,
      Conversation: 0
    },
    {
      name: 'February',
      Users: 0,
      Tweets: 0,
      Conversation: 0
    },
    {
      name: 'March',
      Users: 0,
      Tweets: 0,
      Conversation: 0
    },
    {
      name: 'April',
      Users: 0,
      Tweets: 0,
      Conversation: 0
    },
    {
      name: 'May',
      Users: 10,
      Tweets: 30,
      Conversation: 100
    },
    {
      name: 'June',
      Users: 100,
      Tweets: 200,
      Conversation: 1000
    },
    {
      name: 'July',
      Users: 100,
      Tweets: 200,
      Conversation: 1000
    },
    {
      name: 'August',
      Users: 100,
      Tweets: 200,
      Conversation: 1000
    }
  ]
  return (
    <ChartItem>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area type='monotone' dataKey='Users' stackId='1' stroke='#8884d8' fill='#8884d8' />
          <Area type='monotone' dataKey='Tweets' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
          <Area type='monotone' dataKey='Conversation' stackId='1' stroke='#ffc658' fill='#ffc658' />
        </AreaChart>
      </ResponsiveContainer>
    </ChartItem>
  )
}
