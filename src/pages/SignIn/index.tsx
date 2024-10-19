import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { setAccount } from '../../redux/account/accountSlice';
import { toastGenerator } from '../../utils/toastGenerator';
import { Account } from '../../../graphqlTypes';
import { GetAccountQuery } from '../../service/queries';
import client from '../../../apolloClient';
import { Button, Input, Label, Card, CardHeader, CardContent, CardFooter } from '../../components/ui';
import { setLocalStore } from '../../utils/localStorage';

type dataForm = {
  accountowner: string;
};

const defaultData : dataForm = {
  accountowner: ''
};

export default function SigIn () {
  const [data, setData] = useState<dataForm>(defaultData);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (data.accountowner === '') {
      setError("Please fill in all the fields.");
      return;
    };
  
    const response : Account | null = await client.query({
      query: GetAccountQuery,
      variables: { accountowner: data.accountowner }
    }).then((res) => {
      if(!res.data.account.success){
        toastGenerator('error', res.data.account.message);
        return null;
      }
      toastGenerator('success', "Login successful! Welcome back!");
      return res.data.account;
    }).catch((err) => {
      console.log(err);
      toastGenerator('error', "There was an error trying to log in. Please try again.");
      return null;
    });

    if(response !== null){
      dispatch(setAccount(response));
      setLocalStore('account', JSON.stringify(response));
      navigate('/account');
    };

    setData(defaultData);
    setError('');
  };

  const handleChange = (prop: string, value: string) => {
    setData((prev) => ({...prev, [prop]: value}));
    setError('');
  };

  const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Log in</h2>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Account Owner </Label>
              <Input
                id="accountowner"
                type="accountowner"
                value={data.accountowner}
                onChange={(e)=> handleChange('accountowner', e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start">
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Sign In
          </Button>
          <p className="mt-4 text-start w-full">
            Don’t have an account? {' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
