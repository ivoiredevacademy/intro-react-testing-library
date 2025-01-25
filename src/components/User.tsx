import React, { useEffect } from 'react';

interface User {
  name: string;
  email: string;
}

const User: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    setUser(data);
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen  mx-auto bg-blue-100 overflow-hidden" data-testid="user">
      <div className="px-10 py-6 shadow-md  rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
        <p className="text-xl text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default User;