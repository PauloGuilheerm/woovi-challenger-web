import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toastGenerator } from '../../utils/toastGenerator';
import { Account } from '../../../graphqlTypes';
import { CreateAccountMutation } from '../../service/mutation';
import client from '../../../apolloClient';
import { Button, Input, Label, Card, CardHeader, CardContent, CardFooter } from '../../components/ui';

type dataForm = {
  name: string;
  email: string;
  password: string;
};

const defaultData : dataForm = {
  name: '',
  email: '',
  password: ''
};

export default function SignUp () {
  const [data, setData] = useState<dataForm>(defaultData);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');

    if (data.name === '' || data.email === '' || data.password === '') {
      setError('Por favor, preencha todos os campos.');
      return;
    };
  
    const response : Account | null = await client.mutate({
      mutation: CreateAccountMutation,
      variables: data, 
    }).then((res) => {
      toastGenerator(res.data.createAccount.success ? 'success' : 'error', res.data.createAccount.message)
      return res.data.createAccount.success ? res.data.account : null;
    }).catch((err) => {
      toastGenerator('error', err.message);
      return null;
    });

    if(response !== null){
      navigate('/signin');
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
          <h2 className="text-center text-2xl font-bold">Create Account</h2>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                value={data.name}
                onChange={(e)=> handleChange('name', e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e)=> handleChange('email', e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e)=> handleChange('password', e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-start">
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Sign Up
          </Button>
          <p className="mt-4 text-start w-full">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
