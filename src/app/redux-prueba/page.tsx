'use client'
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {decrement, increment} from "@/redux/features/counterSlice";
import {useGetUsersQuery} from "@/redux/services/userApi";

const HomePage: React.FC<{  }> = props => {
    const counter = useAppSelector(state => state.counterReducer.counter)
    const dispatch = useAppDispatch()
    const {data, error, isLoading, isFetching} = useGetUsersQuery(null)
    if(isLoading || isFetching) return (<p>Loading...</p>)
    if (error) return (<p>Some Error</p>)
  return (
      <>
        <h1 className={'text-center text-2x1'}>
            total: {counter}
        </h1>
        <div className={'flex justify-center gap-x-2'}>
              <button
                  className="bg-green-500 px-3 py-2 rounded-md"
                  onClick={()=>{
                      dispatch(increment())
                  }}
              >Increment</button>
              <br/>
              <button
                  className="bg-blue-700 px-3 py-2 rounded-md"
                  onClick={()=>{
                      dispatch(decrement())
                  }}
              >Decrement</button>
        </div>

        <div className={'grid grid-cols-3 mx-auto gap-3 m-2'}>
            {
                data?.map((user:any) => (
                    <div key={user.id} className={'bg-zinc-800 p-4 rounded-md'}>
                        <p>{user.name}</p>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                ))
            }
        </div>
      </>
  );
};
export default HomePage;